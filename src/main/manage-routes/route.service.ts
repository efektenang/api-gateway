import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as encryptions from "@utilities/encryption.util";
import {
  ConfigEndpointsDTO,
  CreateRoutesDTO,
  UpdateRouteDTO,
} from "@dtos/route.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Logs } from "@schemas/logs.schema";

@Injectable()
export class RouteService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel("logs_endpoint") private logsModel: Model<Logs>
  ) {}

  async getRouteList(serviceKey: string) {
    try {
      const routes = await this.prisma.$queryRawUnsafe(
        "select routes.route_id as route_id, routes.name as name, routes.description as description, routes.valid_header as valid_header, routes.path as path, routes.created_by as created_by, endpoint_methods.method as method from routes left join endpoint_methods on routes.route_id = endpoint_methods.method_route_id where routes.service_id = $1",
        serviceKey
      );

      return routes;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getRouteExists(routeID: number) {
    const route = await this.prisma.routes.findUnique({
      where: {
        route_id: routeID,
      },
    });

    if (!route) throw new NotFoundException("Route key is invalid");

    return route;
  }

  async configEndpoints(userID: string, data: ConfigEndpointsDTO) {
    try {
      const route = await this.getRouteExists(data.method_route_id);

      if (route.valid_header === "dynamic") throw new Error("This route is dynamic mode.")
      const saveEndpoint = await this.prisma.endpoint_methods.create({
        data: {
          ...data,
          created_by: userID,
          created_at: new Date(),
        },
      });

      return saveEndpoint;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async generateRoutes(userID: string, data: CreateRoutesDTO) {
    try {
      const service = await this.prisma.service.findUnique({
        where: {
          service_id: data.service_id,
        },
      });

      if (!service) throw new NotFoundException("Service key is invalid.")

      if (data.valid_header === "static" && data.path === undefined)
        throw new Error("If route is static, please fill the paths value!");

      const routeID = encryptions.genRandomNumber(8);

      const generate = await this.prisma.routes.create({
        data: {
          ...data,
          route_id: routeID,
          created_by: userID,
        },
      });

      return generate;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateRoutesGateway(
    userID: string,
    data: UpdateRouteDTO,
    routeID: number
  ) {
    try {
      const route = await this.getRouteExists(routeID);

      const updateRoute = await this.prisma.routes.update({
        where: {
          route_id: routeID,
        },
        data: {
          ...data,
          updated_by: userID,
          updated_at: new Date(),
        },
      });

      return updateRoute;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteSpecificRoute(routeID: number) {
    try {
      const route = await this.getRouteExists(routeID);
      const deleteRoute = await this.prisma.routes.delete({
        where: {
          route_id: routeID,
        },
      });

      return deleteRoute;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getEndpointLogs(filters: any) {
    try {
      if (filters) {
        const match: any = {};

        if (filters.host) {
          match.host = filters.host;
        }
        if (filters.path) {
          match.path = filters.path;
        }
        if (filters.browser) {
          const filter = await this.logsModel.find({
            "user_agent.browser.name": filters.browser,
          });
          return filter;
        }

        return this.logsModel.aggregate([{ $match: match }]);
      }
      const endpointLogs = await this.logsModel.find();
      if (endpointLogs[0] === undefined) return [];

      return endpointLogs;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
