import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GatewayServices {
  constructor(private readonly prisma: PrismaService) {}

  async getServices() {
    const services = await this.prisma.service.findMany();

    return services;
  }

  // async getGateway(url: { protocol: string; host: string }, params: any) {
  //   const hit = `${url.protocol}://${url.host}/${params.serviceId}/${params.routeId}/${params.endpoint}`;
  //   return hit;
  // }

  async getGateway(url: { protocol: string; host: string }, params: any) {
    const hit = `${url.protocol}://${url.host}${params}`;
    return params;
  }
}
