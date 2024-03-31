import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { WorkspaceServices } from "./workspace.service";
import { Request, Response } from "@utilities/helper-type.util";
import { CreateWorkspaceDTO } from "@dtos/workspace.dto";

@Controller()
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceServices) {}

  @Get()
  async getWorkspaces(@Res() res: Response) {
    return this.workspaceService
      .getAllWorkspaces()
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("create")
  async createWorkspaces(
    @Body() body: CreateWorkspaceDTO,
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.workspaceService
      .createWorkspace(req.user_auth.user_name, body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
