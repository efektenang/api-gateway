import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
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
import { mongoConfig } from "@utilities/database/mongo.config";

// init base director
global.__basedir = __dirname;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NEST_ENV}`],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongoConfig),
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
        ProtectMiddleware
      )
      .forRoutes("*");
  }
}
