import { CreateRoutesDTO } from "@dtos/services.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import * as encryptions from "@utilities/encryption.util";

@Injectable()
export class RoutesService {
  constructor(private readonly prisma: PrismaService) {}

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
}
