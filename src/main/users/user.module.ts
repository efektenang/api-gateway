import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IsEmailUserAlreadyExistConstraint } from "@utilities/email-exists.validator";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSchema } from "@schemas/users.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "cl_users", schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, IsEmailUserAlreadyExistConstraint],
})
export class UserModule {}
