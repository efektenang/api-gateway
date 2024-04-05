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

enum Header {
  STATIC = "static",
  DYNAMIC = "dynamic",
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

export class CreateRoutesDTO {
  @IsString()
  @IsNotEmpty()
  serviceService_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Header)
  @IsNotEmpty()
  valid_header: string;

  @IsString()
  @IsOptional()
  path?: string;
}
