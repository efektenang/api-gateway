import { Injectable } from "@nestjs/common";
import ShortUniqueId from "short-unique-id";
import { PrismaService } from "src/prisma.service";
import * as encryptions from "@utilities/encryption.util";
import {
  CreateRoutesDTO,
  CreateServicesDTO,
  UpdateServiceDTO,
} from "@dtos/services.dto";

@Injectable()
export class GatewayServices {
  constructor(private readonly prisma: PrismaService) {}

  async getServices() {
    const services = await this.prisma.service.findMany();

    return services;
  }

  async findServicesKey(serviceKey: string) {
    try {
      const service = await this.prisma.service.findUnique({
        where: { service_id: serviceKey },
      });

      if (!service) throw new Error("Service not found");

      return service;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async createServices(
    owner: { userID: string; workspace: number },
    serviceData: CreateServicesDTO
  ) {
    try {
      let serviceId: any = new ShortUniqueId({ length: 24 }).rnd();
      serviceId = serviceId.match(/.{2,6}/g).join("-");

      const saveServices = await this.prisma.service.create({
        data: {
          ...serviceData,
          service_id: serviceId,
          workspaceWorkspace_id: owner.workspace,
          created_by: owner.userID,
          status: "active",
        },
      });

      return saveServices;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateBasicInfoServices(
    owner: { userID: string; workspace: number },
    serviceData: UpdateServiceDTO,
    serviceKey: string
  ) {
    try {
      const service = await this.findServicesKey(serviceKey);

      if (service.created_by !== owner.userID)
        throw new Error("You are not workspace owner");

      const updateData = await this.prisma.service.update({
        where: {
          service_id: serviceKey,
          workspaceWorkspace_id: owner.workspace,
        },
        data: {
          ...serviceData,
          updated_by: owner.userID,
          updated_at: new Date(),
        },
      });

      return updateData;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteServices(
    owner: { userID: string; workspace: number },
    serviceKey: string
  ) {
    try {
      const service = await this.findServicesKey(serviceKey);

      if (service.created_by !== owner.userID)
        throw new Error("You are not workspace owner");

      const deleteData = await this.prisma.service.delete({
        where: { service_id: serviceKey },
      });

      return deleteData;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async generateRoutes(
    owner: { userID: string; workspace: number },
    data: CreateRoutesDTO
  ) {
    try {
      const service = await this.findServicesKey(data.serviceService_id);
      if (service.created_by !== owner.userID)
        throw new Error("You are not workspace owner");

      const routeID = encryptions.genRandomNumber(8);

      const generate = await this.prisma.routes.create({
        data: {
          ...data,
          route_id: routeID,
          created_by: owner.userID,
        },
      });

      return generate;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  // async getGateway(url: { protocol: string; host: string }, params: any) {
  //   const hit = `${url.protocol}://${url.host}/${params.serviceId}/${params.routeId}/${params.endpoint}`;
  //   return hit;
  // }

  async hitAPIGateway(serviceKey: string, routeId: number) {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: serviceKey,
        },
      });

      if (!service) throw new Error("Service is invalid!");

      const router = await this.prisma.routes.findUnique({
        where: {
          route_id: routeId,
        },
      });

      const api = `${service.protocol}://${service.host}:${service.port}/${router}`

      if (!router) throw new Error("Service is invalid!");

      return {service: service.name, route: router.name}
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}
