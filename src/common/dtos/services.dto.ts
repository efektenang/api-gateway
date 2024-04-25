import { PartialType } from "@nestjs/mapped-types";
import {
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

enum Statuses {
  ACTIVE = "active",
  DISABLED = "disabled"
}

enum TypeAddress {
  Whitelist = "whitelist",
  Blactlist = "blacklist"
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

export class UpdateServiceDTO {
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

  @IsEnum(Statuses)
  @IsOptional()
  status: string;
}

export class WhitelistAddressDTO {
  @IsString()
  @IsNotEmpty()
  service_id: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(TypeAddress)
  @IsOptional()
  type: string;
}
