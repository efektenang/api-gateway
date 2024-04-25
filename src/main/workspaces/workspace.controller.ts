import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { WorkspaceServices } from "./workspace.service";
import { Request, Response } from "@utilities/helper-type.util";
import {
  AddWorkspaceMemberDTO,
  CreateWorkspaceDTO,
  UpdateRuleMemberDTO,
  UpdateWorkspaceDTO,
} from "@dtos/workspace.dto";
import { RolesGuard } from "@main/users/roles/roles.guard";
import { Role, Roles } from "@main/users/roles/roles.decorator";

@Controller()
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceServices) {}

  @Get()
  async getWorkspaces(@Res() res: Response, @Req() req: Request) {
    return this.workspaceService
      .getAllWorkspaces(req.user_auth.user_id)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async createWorkspaces(
    @Body() body: CreateWorkspaceDTO,
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.workspaceService
      .createWorkspace(req.user_auth.user_id, body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Put(":workspaceId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async updateWorkspaces(
    @Body() body: UpdateWorkspaceDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .updateWorkspace(req.user_auth.user_id, workspaceId, body)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("disable/:workspaceId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async disableWorkspaces(
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .disableWorkspace(req.user_auth.user_id, workspaceId)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("enable/:workspaceId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async enableWorkspaces(
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .enableWorkspace(req.user_auth.user_id, workspaceId)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Delete(":workspaceId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async deleteWorkspaces(
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .deleteWorkspace(req.user_auth.user_id, workspaceId)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Get("member/:workspaceId")
  async getMembers(
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .getWorkspaceMembers(workspaceId, req.user_auth.user_id)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post(":workspaceId/member/add")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async addNewMember(
    @Body() body: AddWorkspaceMemberDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: any
  ) {
    return this.workspaceService
      .addNewMemberToWorkspace(
        req.user_auth.user_id,
        parseInt(params.workspaceId),
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("member/kick")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async kickMembers(
    @Body() body: any,
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.workspaceService
      .kickMemberFromWorkspace(req.user_auth.user_id, body)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post(":workspaceId/member/leave")
  async leaveMember(
    @Res() res: Response,
    @Req() req: Request,
    @Param("workspaceId") workspaceId: number
  ) {
    return this.workspaceService
      .leaveFromWorkspace(workspaceId, req.user_auth.user_id)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Put("update/rule")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async updateRules(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: UpdateRuleMemberDTO
  ) {
    return this.workspaceService
      .updateRulesMember(req.user_auth.user_id, body)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
