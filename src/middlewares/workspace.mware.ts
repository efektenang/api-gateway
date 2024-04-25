import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "@utilities/helper-type.util";
import { NextFunction } from "express";

@Injectable()
export class CheckWorkspaceMember implements NestMiddleware {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const workspace = req.query.workspaceId as string;
    const param = req.params[0].split("/");
    const allowEndpoint = ["users", "workspace"];

    if (allowEndpoint.includes(param[2]) || param[0] === "gateway") {
      next();
    } else if (param[0] === "api" && workspace !== undefined) {
      if (Number.isNaN(parseInt(workspace))) {
        return res.asJson(HttpStatus.FORBIDDEN, {
          message: "Workspace id must be number.",
        });
      }
      const memberCheck = await this.prisma.workspace_member.findFirst({
        where: {
          member_user_id: req.user_auth.user_id,
          member_workspace_id: parseInt(workspace),
        },
      });

      if (memberCheck) {
        next();
      } else {
        res.asJson(HttpStatus.FORBIDDEN, {
          message: "You can't access in this workspace.",
        });
      }
    } else {
      return res.asJson(HttpStatus.FORBIDDEN, {
        message: "You can't access in this workspace.",
      });
    }
  }
}
