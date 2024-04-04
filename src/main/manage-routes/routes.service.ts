import { CreateEndpointDTO, CreateRoutesDTO } from "@dtos/services.dto";
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

  async getEndpointList(routeID: number) {
    try {
      const endpoint = await this.prisma.endpoints.findMany({
        where: {
          routesRoute_id: routeID,
          deleted_by: null,
        },
      });

      return endpoint;
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

  async generateEndpoint(
    owner: { userID: string; workspace: number },
    data: CreateEndpointDTO
  ) {
    try {
      const route = await this.prisma.routes.findUnique({
        where: {
          route_id: data.route_id,
        },
      });
      if (route.created_by !== owner.userID)
        throw new Error("You are not workspace owner");

      const saveEndpoint = await this.prisma.endpoints.create({
        data: {
          ...data,
          created_by: owner.userID,
          created_at: new Date(),
          routesRoute_id: data.route_id,
        },
      });

      return saveEndpoint;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
