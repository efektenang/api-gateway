import { Module } from "@nestjs/common";
import { GatewayServices } from "./gateway.service";
import { PrismaService } from "src/prisma.service";
import { GatewayController } from "./gateway.controller";

@Module({
    controllers: [GatewayController],
    providers: [GatewayServices, PrismaService]
})
export class GatewayModule {}