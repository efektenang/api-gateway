import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const mongoConfig: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URI'),
    }),
    inject: [ConfigService]
}