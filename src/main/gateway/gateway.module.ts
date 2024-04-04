import { Module } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { PrismaService } from "src/prisma.service";
import { GatewayController } from "./gateway.controller";
import { HttpModule } from "@nestjs/axios";
import { RateLimiterModule } from "nestjs-rate-limiter";

@Module({
  imports: [
    RateLimiterModule.register({
      type: "Memory",
      points: 50,
      duration: 60,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, PrismaService],
})
export class GatewayModule {}
