import { PartialType } from "@nestjs/mapped-types";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

enum Protocol {
  HTTP = "http",
  HTTPS = "https",
}

export class CreateServicesDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Protocol)
  @IsNotEmpty()
  protocol: string;

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  @IsNotEmpty()
  port: number;
}

export class UpdateServiceDTO extends PartialType(CreateServicesDTO) {}
