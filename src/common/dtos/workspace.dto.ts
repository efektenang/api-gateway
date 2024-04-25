import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

enum Rules {
  SERVER = "SERVER",
  CLIENT = "CLIENT",
}

export class CreateWorkspaceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
export class UpdateWorkspaceDTO {
  @IsString()
  @IsOptional()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class AddWorkspaceMemberDTO {
  @IsString()
  member_user_id: string;

  @IsEnum(Rules)
  rule: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  member_workspace_id?: number;
}

export class UpdateRuleMemberDTO {
  @IsNumber()
  workspace_id: number;

  @IsString()
  user_id: string;

  @IsEnum(Rules)
  rule: string;
}
