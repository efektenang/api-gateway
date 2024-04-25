import { Module } from "@nestjs/common";
import { RouteService } from "./route.service";
import { PrismaService } from "src/prisma.service";
import { RouteController } from "./route.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { LogsShcema } from "@schemas/logs.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: 'logs_endpoint',
              schema: LogsShcema,
            },
          ]),
    ],
    controllers: [RouteController],
    providers: [RouteService, PrismaService]
})
export class RouteModule {}