import { IsEmailUserAlreadyExist } from "@utilities/email-exists.validator";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

enum Status {
  ACTIVE = "active",
  DISABLED = "disabled",
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,32}$/g,
    {
      message:
        "Password must contains at least 1 lowercase, uppercase, number and special characters, with the length password in 8-32 characters.",
    }
  )
  newPassword: string;
}

export class UpdateBasicInfoDTO {
  @IsString()
  @IsOptional()
  user_name?: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  country_code?: string;

  @IsEnum(Status)
  @IsOptional()
  status?: string;
}

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  country_code?: string;

  @IsEmail()
  @IsEmailUserAlreadyExist({
    message: "Email is already exists. Use another email to register.",
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,32}$/g,
    {
      message:
        "Password must contains at least 1 lowercase, uppercase, number and special characters, with the length password in 8-32 characters.",
    }
  )
  password: string;

  @IsEnum(Status)
  @IsOptional()
  status?: string;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  created_by?: string;

  @IsOptional()
  updated_by?: string;

  @IsOptional()
  updated_at?: Date;

  @IsOptional()
  deleted_by?: string;

  @IsOptional()
  deleted_at?: Date;
}
