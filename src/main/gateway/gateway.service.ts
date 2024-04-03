import { HttpService } from "@nestjs/axios";
import { BadGatewayException, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GatewayService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService
  ) {}

  async getServices(serviceKey: string) {
    const service = await this.prisma.service.findUnique({
      where: {
        service_id: serviceKey,
      },
    });

    if (!service) throw new BadGatewayException("Services key is invalid");

    return service;
  }

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

  async dynamicHitAPI(params: any) {
    const services = await this.getServices(params.serviceKey);
    const uri = `${services.protocol}://${services.host}:${services.port}/${params[0]}`;
    const response = await firstValueFrom(this.http.get(uri));
    return response.data;
  }

  async staticHitAPI(params: any, data: any) {
    const services = await this.getServices(params.serviceKey);
    const route = await this.getRoutes(parseInt(params.routeKey));
    const endpoint = await this.getEndpoint(params[0]);
    const uri = `${services.protocol}://${services.host}:${services.port}/${endpoint.path}`;
    const response = await firstValueFrom(
      this.http.post(uri, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    return response.data;
  }
}
