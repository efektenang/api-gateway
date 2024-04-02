import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IsEmailUserAlreadyExistConstraint } from "@utilities/email-exists.validator";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSchema } from "@schemas/users.schema";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "cl_users", schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, IsEmailUserAlreadyExistConstraint],
})
export class UserModule {}
