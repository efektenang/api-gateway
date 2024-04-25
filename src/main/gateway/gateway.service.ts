import { SaveLogsDTO } from "@dtos/logs.dto";
import { IServicesData } from "@interfaces/gateway.interface";
import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadGatewayException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Logs } from "@schemas/logs.schema";
import getCacheToken from "@utilities/cache-token";
import { AxiosError } from "axios";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { catchError, firstValueFrom } from "rxjs";
import { PrismaService } from "src/prisma.service";
import { UAParser } from "ua-parser-js";

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel("logs_endpoint") private logsModel: Model<Logs>,
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getRoutes(routeKey: number) {
    const route = await this.prisma.routes.findUnique({
      where: {
        route_id: routeKey,
      },
    });

    if (!route) throw new BadGatewayException("Route key is invalid");

    return route;
  }

  async getEndpointMethods(routeKey: number): Promise<string> {
    const routes = await this.prisma.$queryRawUnsafe(
      "select routes.route_id as route_id, routes.name as name, routes.description as description, routes.valid_header as valid_header, routes.path as path, routes.created_by as created_by, endpoint_methods.method as method from routes left join endpoint_methods on routes.route_id = endpoint_methods.method_route_id where routes.route_id = $1",
      routeKey
    );

    if (routes[0] === null) throw new BadGatewayException("Route key is invalid");

    return routes[0].method;
  }

  async getGatewayCache(data: {
    serviceId: string;
    routeKey: number;
    path?: string;
    method?: string;
  }) {
    const { serviceId, routeKey, path, method } = data;
    const serviceKey = getCacheToken<"gateway">("gateway", {
      SERVICE_ID: serviceId,
      ROUTE_ID: routeKey,
      PATH: path,
      METHOD: method
    });
    const gatewayCache = await this.cacheManager.get(serviceKey);

    if (gatewayCache === null) {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: serviceId,
        },
      });

      if (!service) throw new BadGatewayException("Services key is invalid");
      const route = await this.getRoutes(routeKey);
      const endpointMethod = await this.getEndpointMethods(routeKey);
      if (path !== route.path && route.valid_header === "static") throw new BadGatewayException();

      const data: IServicesData = {
        service_id: service.service_id,
        protocol: service.protocol,
        host: service.host,
        port: service.port,
        valid_header: route.valid_header,
        route: route.route_id,
        path: path,
        method: endpointMethod,
      };

      const stringData = JSON.stringify(data);
      await this.cacheManager.set(serviceKey, stringData);
      return stringData;
    }

    return gatewayCache;
  }

  async saveLogs(data: SaveLogsDTO, userAgent: any) {
    try {
      const logsData = new this.logsModel({
        ...data,
        time: new Date(),
        user_agent: userAgent,
      });

      return logsData.save();
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async dynamicMethodGateway(data: {
    params: any;
    req: any;
    uaHeader: string;
    header?: any;
    body?: any;
  }) {
    try {
      const service: any = await this.getGatewayCache({
        serviceId: data.params.serviceKey,
        routeKey: parseInt(data.params.routeKey),
        path: data.params[0],
        method: data.req.method
      });
      const services = JSON.parse(service);
      const parser = new UAParser(data.uaHeader);
      const uaResult = parser.getResult();
      const endpointMethod = await this.getEndpointMethods(
        parseInt(data.params.routeKey)
      );

      if (data.params[0] !== services.path)
        throw new BadGatewayException("Path is not match.");

      if ( data.req.method !== endpointMethod && services.valid_header === "static" )
        throw new BadGatewayException("Method is not match.");

      const uri = `${services.protocol}://${services.host}:${services.port}/${data.params[0]}`;

      const response = await firstValueFrom(
        this.http
          .request({
            method: endpointMethod === null ? data.req.method : endpointMethod,
            url: uri,
            data: data.body,
            headers: data.header,
          })
          .pipe(
            catchError((err: AxiosError) => {
              throw new BadGatewayException(err.message);
            })
          )
      );
      await this.saveLogs(data.req, uaResult);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
