import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import ShortUniqueId from "short-unique-id";
import { PrismaService } from "src/prisma.service";
import {
  CreateServicesDTO,
  UpdateServiceDTO,
  WhitelistAddressDTO,
} from "@dtos/services.dto";

@Injectable()
export class ManageServices {
  constructor(private readonly prisma: PrismaService) {}

  async getListServices(workspaceId: number) {
    try {
      const services = await this.prisma.service.findMany({
        where: {
          workspace_id: workspaceId,
          deleted_by: null,
        },
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
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getServicesKey(serviceKey: string) {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: serviceKey,
        },
      });

      if (!service)
        throw new NotFoundException(
          "Service key is invalid or service not found."
        );

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
      const checkService = await this.prisma.service.findFirst({
        where: {
          host: serviceData.host,
          workspace_id: owner.workspace
        }
      })

      if (checkService) throw new ConflictException("Service host has registered.")

      let serviceId: any = new ShortUniqueId({ length: 24 }).rnd();
      serviceId = serviceId.match(/.{2,6}/g).join("-");

      const saveServices = await this.prisma.service.create({
        data: {
          ...serviceData,
          service_id: serviceId,
          workspace_id: owner.workspace,
          created_by: owner.userID,
          status: "active",
        },
      });

      return saveServices;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateServiceInfo(
    owner: { userID: string; workspace: number },
    serviceData: UpdateServiceDTO,
    serviceKey: string
  ) {
    try {
      const service = await this.getServicesKey(serviceKey);
      const updateService = await this.prisma.service.update({
        where: {
          service_id: serviceKey,
          workspace_id: owner.workspace,
        },
        data: {
          ...serviceData,
          updated_by: owner.userID,
          updated_at: new Date(),
        },
      });

      return updateService;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteServices(serviceKey: string) {
    try {
      await this.getServicesKey(serviceKey);
      const deleteService = await this.prisma.service.delete({
        where: {
          service_id: serviceKey,
        },
      });

      return deleteService;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async addWhitelistAddress(data: WhitelistAddressDTO) {
    try {
      const checkService = await this.getServicesKey(data.service_id)
      const check = await this.prisma.whitelist_address.findFirst({
        where: {
          address: data.address,
        },
      });

      if (check)
        throw new ConflictException("This address has registred in whitelist.");

      const addWhitelist = await this.prisma.whitelist_address.create({
        data: {
          ...data,
        },
      });

      return addWhitelist;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateFilterAddress(data: WhitelistAddressDTO, addressId: number) {
    try {
      const check = await this.prisma.whitelist_address.findFirst({
        where: {
          address: data.address,
        },
      });

      if (!check)
        throw new NotFoundException("This address not found in filter list");

      const checkService = await this.getServicesKey(data.service_id)
      const updateFilter = await this.prisma.whitelist_address.update({
        where: {
          id: addressId
        },
        data: {
          ...data,
        },
      });

      return updateFilter;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
