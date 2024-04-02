import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ManageServicesController } from "./manage-services.controller";
import { ManageServices } from "./manage-services.service";

@Module({
  controllers: [ManageServicesController],
  providers: [ManageServices, PrismaService],
})
export class ServicesModule {}
