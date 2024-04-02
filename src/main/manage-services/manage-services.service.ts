import { Injectable } from "@nestjs/common";
import ShortUniqueId from "short-unique-id";
import { PrismaService } from "src/prisma.service";
import { CreateServicesDTO } from "@dtos/services.dto";

@Injectable()
export class ManageServices {
  constructor(private readonly prisma: PrismaService) {}

  async getServices() {
    const services = await this.prisma.service.findMany({
      select: {
        service_id: true,
        name: true,
        description: true,
        protocol: true,
        host: true,
        port: true,
        status: true,
      },
    });

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
}
