import { CreateWorkspaceDTO } from "@dtos/workspace.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class WorkspaceServices {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWorkspaces(): Promise<any[]> {
    const workspaces = await this.prisma.workspace.findMany();

    return workspaces;
  }

    async createWorkspace(userName: string, data: CreateWorkspaceDTO) {

    const saveData = await this.prisma.workspace.create({
      data: {
            ...data,
            user_id: userName,
            created_by: userName
      },
    });

    return saveData;
  }
}
