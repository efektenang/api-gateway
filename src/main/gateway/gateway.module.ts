import { Module } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { PrismaService } from "src/prisma.service";
import { GatewayController } from "./gateway.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
    controllers: [GatewayController],
    providers: [GatewayService, PrismaService]
})
export class GatewayModule {}