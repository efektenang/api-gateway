import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { IJwtCustom, JwtCustom } from "@utilities/token-generator.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ChangePasswordDto,
  LoginUserDto,
  RegisterUserDto,
  UpdateBasicInfoDTO,
} from "@dtos/user.dto";
import * as moment from "moment";
import * as encryptions from "@utilities/encryption.util";
import shortUniqueId from "short-unique-id";
import { IUsers } from "@interfaces/user.interface";
import { v4 as uuidv4 } from 'uuid';
import { User } from "@schemas/users.schema";

@Injectable()
@JwtCustom("jwtCustom")
export class UserService {
  constructor(@InjectModel("cl_users") private userModel: Model<User>) {}

  private jwtCustom: IJwtCustom;

  async findOneUsers(email: string): Promise<IUsers> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findUserIfExists(userName: string): Promise<IUsers> {
    try {
      const currentUser = await this.userModel.findOne({ user_name: userName });

      if (!currentUser) throw new NotFoundException("User not found!");
      else if (!currentUser.status) throw new Error("User has been disabled");

      return currentUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAllUsers() {
    const res = await this.userModel.find().select("-_id -password");
    if (res[0] === undefined) return null;

    return res;
  }

  async login(data: LoginUserDto) {
    try {
      const exists = await this.findOneUsers(data.email);

      if (!exists) {
        throw new Error("Wrong Password or Email");
      }

      const [_hash, _salt] = exists.password.split(" ");
      const newEnc = encryptions.hashing(data.password, _salt);

      if (newEnc.hash !== _hash)
        throw new UnauthorizedException("Wrong Password or Email");

      let license: any = new shortUniqueId({ length: 24 }).rnd();
      license = license.match(/.{2,6}/g).join("-");

      const token: string = await this.jwtCustom.generateToken({
        user_name: exists.user_name,
        type: "SERVER",
      });

      return { token };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async registerUser(data: RegisterUserDto) {
    try {
      const hashPassword = encryptions.encryptPassword(data.password);
      const saveUser = new this.userModel({
        ...data,
        user_id: uuidv4(),
        password: [hashPassword.hash, hashPassword.salt].join(" "),
        created_at: moment(),
      });

      return saveUser.save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async changePassword(userName: string, data: ChangePasswordDto) {
    try {
      const currentUser = await this.findUserIfExists(userName);

      const [_hash, _salt] = currentUser.password.split(" ");
      const encPassword = encryptions.encryptPassword(data.newPassword);
      const newEnc = encryptions.hashing(data.oldPassword, _salt);

      if (newEnc.hash !== _hash) throw new Error("Wrong old password!");

      await this.userModel.updateOne(
        { user_name: userName },
        {
          password: [encPassword.hash, encPassword.salt].join(" "),
          updated_by: userName,
          updated_at: moment(),
        }
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateBasicInfo(userName: string, data: UpdateBasicInfoDTO) {
    try {
      await this.findUserIfExists(userName);

      const updateUser = await this.userModel.updateOne(
        { user_name: userName },
        {
          ...data,
          updated_by: userName,
          updated_at: moment(),
        }
      );

      return updateUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
