import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadGatewayException, Inject, Injectable } from "@nestjs/common";
import getCacheToken from "@utilities/cache-token";
import { AxiosError } from "axios";
import { Cache } from "cache-manager";
import { catchError, firstValueFrom } from "rxjs";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GatewayService {
  constructor(
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

  async getEndpoint(path: string) {
    const endpoint = await this.prisma.endpoints.findFirst({
      where: {
        path: path,
      },
    });

    if (!endpoint) throw new BadGatewayException("Enpoint is invalid");

    return endpoint;
  }

  async getGatewayCache(data: {
    serviceId: string;
    routeKey?: number;
    path?: string;
  }) {
    const { serviceId, routeKey, path } = data;
    const serviceKey = getCacheToken<"gateway">("gateway", {
      SERVICE_ID: serviceId,
    });
    const gatewayCache = await this.cacheManager.get(serviceKey);

    if (!gatewayCache) {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: serviceId,
        },
      });

      if (!service) throw new BadGatewayException("Services key is invalid");

      const route = await this.getRoutes(routeKey);
      const endpoint = await this.getEndpoint(path);

      const data = {
        service_id: service.service_id,
        protocol: service.protocol,
        host: service.host,
        port: service.port,
        workspace: service.workspaceWorkspace_id,
        route: route.route_id,
        path: endpoint.path,
      };

      const stringData = JSON.stringify(data);
      await this.cacheManager.set(serviceKey, stringData);

      return stringData;
    }

    return gatewayCache;
  }

  async dynamicHitAPI(params: any) {
    const service: any = await this.getGatewayCache({
      serviceId: params.serviceKey,
    });
    const services = JSON.parse(service);
    const uri = `${services.protocol}://${services.host}:${services.port}/${params[0]}`;
    const response = await firstValueFrom(
      this.http.get(uri).pipe(
        catchError((err: AxiosError) => {
          throw new BadGatewayException(err.message);
        })
      )
    );
    return response.data;
  }

  async staticHitAPI(params: any, data: any) {
    const service: any = await this.getGatewayCache({
      serviceId: params.serviceKey,
      routeKey: parseInt(params.routeKey),
      path: params[0],
    });
    const services = JSON.parse(service);
    const uri = `${services.protocol}://${services.host}:${services.port}/${services.path}`;
    const response = await firstValueFrom(
      this.http
        .post(uri, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .pipe(
          catchError((err: AxiosError) => {
            throw new BadGatewayException(err.message);
          })
        )
    );
    return response.data;
  }
}
