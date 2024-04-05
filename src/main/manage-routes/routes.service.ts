import { CreateRoutesDTO } from "@dtos/services.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as encryptions from "@utilities/encryption.util";

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

  async getRouteList(serviceKey: string) {
    try {
      const routes = await this.prisma.routes.findMany({
        where: {
          serviceService_id: serviceKey,
          deleted_by: null,
        },
      });

      return routes;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async generateRoutes(
    owner: { userID: string; workspace: number },
    data: CreateRoutesDTO
  ) {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: data.serviceService_id,
        },
      });
      if (service.created_by !== owner.userID)
        throw new Error("You are not workspace owner");

      if (data.valid_header === "static" && data.path === undefined)
        throw new Error("If route is static, please fill the paths value!");

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
}
