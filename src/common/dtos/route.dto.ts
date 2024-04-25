import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

enum Header {
  STATIC = "static",
  DYNAMIC = "dynamic",
}

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export class CreateRoutesDTO {
  @IsString()
  @IsNotEmpty()
  service_id: string;

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

export class UpdateRouteDTO {
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Header)
  valid_header?: string;

  @IsString()
  @IsOptional()
  path?: string;
}

export class ConfigEndpointsDTO {
  @IsNumber()
  @IsNotEmpty()
  method_route_id: number;

  @IsEnum(Methods)
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsOptional()
  description?: string;
}
