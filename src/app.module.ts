import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
  AuthMiddleware,
  InitMiddleware,
  ProtectMiddleware,
  RequestBodyMiddleware,
  ResponseMiddleware,
} from "@middlewares";
import { FX_PUB, FxRouterModules } from "@fx-routers";
import { MongooseModule } from "@nestjs/mongoose";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { WhitelistMiddleware } from "./middlewares/filter-ip.mware";
import { CheckWorkspaceMember } from "./middlewares/workspace.mware";

// init base director
global.__basedir = __dirname;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NEST_ENV}`],
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASSWORD,
      ttl: 60,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      dbName: process.env.DB_NAME,
    }),
    ...FxRouterModules.register(),
  ],
  controllers: [],
  providers: [FX_PUB],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        InitMiddleware,
        ResponseMiddleware,
        RequestBodyMiddleware,
        AuthMiddleware,
        ProtectMiddleware,
        WhitelistMiddleware,
        CheckWorkspaceMember
      )
      .forRoutes("*");
  }
}
