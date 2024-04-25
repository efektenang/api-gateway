import { Module } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { PrismaService } from "src/prisma.service";
import { GatewayController } from "./gateway.controller";
import { HttpModule } from "@nestjs/axios";
import { RateLimiterModule } from "nestjs-rate-limiter";
import { MongooseModule } from "@nestjs/mongoose";
import { LogsShcema } from "@schemas/logs.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    RateLimiterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        points: configService.get<number>('POINTS'),
        duration: configService.get<number>('DURATION')
      }),
      inject: [ConfigService]
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      {
        name: 'logs_endpoint',
        schema: LogsShcema,
      },
    ]),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, PrismaService],
})
export class GatewayModule {}
