import { Injectable } from "@nestjs/common";
import ShortUniqueId from "short-unique-id";
import { PrismaService } from "src/prisma.service";
import * as encryptions from "@utilities/encryption.util";

@Injectable()
export class GatewayServices {
  constructor(private readonly prisma: PrismaService) {}

  async getServices() {
    const services = await this.prisma.service.findMany();

    return services;
  }

  async createServices(data: any) {
    let serviceId: any = new ShortUniqueId({ length: 24 }).rnd();
    serviceId = serviceId.match(/.{2,6}/g).join("-");

    const serviceKey = encryptions.genRandomString(24);

    return serviceId;
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
