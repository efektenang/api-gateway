import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RoutesService } from "./routes.service";
import { RoutesController } from "./routes.controller";

@Module({
    controllers: [RoutesController],
    providers: [RoutesService, PrismaService]
})
export class RoutesModule {}