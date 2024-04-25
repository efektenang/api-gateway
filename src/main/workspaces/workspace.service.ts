import {
  AddWorkspaceMemberDTO,
  CreateWorkspaceDTO,
  UpdateRuleMemberDTO,
  UpdateWorkspaceDTO,
} from "@dtos/workspace.dto";
import { IWorkspaces } from "@interfaces/workspace.interface";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class WorkspaceServices {
  constructor(private readonly prisma: PrismaService) {}

  async getAllWorkspaces(ownerId: string): Promise<IWorkspaces[]> {
    const workspaces = await this.prisma.workspace.findMany({
      where: {
        owner_id: ownerId,
      },
    });

    return workspaces;
  }

  async getCurrentWorkspace(workspaceId: number): Promise<IWorkspaces> {
    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: {
          workspace_id: workspaceId,
        },
      });

      if (!workspace) throw new NotFoundException("workspace is invalid!");

      return workspace;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getUserActive(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!user) throw new NotFoundException("User not found!");

      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async createWorkspace(user_id: string, data: CreateWorkspaceDTO) {
    const saveData = await this.prisma.workspace.create({
      data: {
        ...data,
        owner_id: user_id,
        created_by: user_id,
      },
    });

    await this.prisma.workspace_member.create({
      data: {
        member_user_id: user_id,
        rule: "SERVER",
        created_by: user_id,
        created_at: new Date(),
        member_workspace_id: saveData.workspace_id,
      },
    });

    return saveData;
  }

  async updateWorkspace(
    ownerId: string,
    workspaceId: number,
    data: UpdateWorkspaceDTO
  ) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("workspace id must be number");

      const workspace = await this.getCurrentWorkspace(workspaceId);

      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspace.");

      const updateWorkspace = await this.prisma.workspace.update({
        where: {
          workspace_id: workspaceId,
        },
        data: {
          ...data,
          updated_by: ownerId,
          updated_at: new Date(),
        },
      });

      return updateWorkspace;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async disableWorkspace(ownerId: string, workspaceId: number) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("Workspace is must be number.");

      const workspace = await this.getCurrentWorkspace(workspaceId);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const disableWorkspace = await this.prisma.workspace.update({
        where: {
          workspace_id: workspaceId,
        },
        data: {
          deleted_by: ownerId,
          deleted_at: new Date(),
        },
      });

      return disableWorkspace;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async enableWorkspace(ownerId: string, workspaceId: number) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("Workspace is must be number.");

      const workspace = await this.getCurrentWorkspace(workspaceId);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const enableWorkspace = await this.prisma.workspace.update({
        where: {
          workspace_id: workspaceId,
        },
        data: {
          deleted_by: null,
          deleted_at: null,
        },
      });

      return enableWorkspace;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteWorkspace(ownerId: string, workspaceId: number) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("Workspace is must be number.");

      const workspace = await this.getCurrentWorkspace(workspaceId);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const deleteWorkspace = await this.prisma.workspace.delete({
        where: {
          workspace_id: workspaceId,
        },
      });

      return deleteWorkspace;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getCurrentMemberInWorkspace(workspaceId: number, userId: string) {
    try {
      const member = await this.prisma.workspace_member.findFirst({
        where: {
          member_user_id: userId,
          member_workspace_id: workspaceId,
        },
      });

      if (!member)
        throw new Error("The user does not exist in this workspace.");

      return member;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getWorkspaceMembers(workspaceId: number, userId: string) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("Workspace is must be number.");

      const memberCheck = await this.prisma.workspace_member.findFirst({
        where: {
          member_user_id: userId,
          member_workspace_id: workspaceId
        },
      });

      if (!memberCheck) throw new Error("Your are not member in this workspace.")

      const getMember = await this.prisma.workspace_member.findMany({
        where: {
          member_workspace_id: workspaceId,
        },
      });

      return getMember;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async addNewMemberToWorkspace(
    ownerId: string,
    workspaceId: number,
    data: AddWorkspaceMemberDTO
  ) {
    try {
      if (Number.isNaN(workspaceId))
        throw new Error("Workspace is must be number.");

      const workspace = await this.getCurrentWorkspace(workspaceId);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const user = await this.getUserActive(data.member_user_id);
      const member = await this.prisma.workspace_member.findFirst({
        where: {
          member_user_id: user.user_id,
          member_workspace_id: workspaceId,
        },
      });

      if (member)
        throw new ConflictException(
          "The user is already registered in this workspace."
        );

      const addMember = await this.prisma.workspace_member.create({
        data: {
          ...data,
          created_by: ownerId,
          created_at: new Date(),
          member_workspace_id: workspaceId,
        },
      });

      return addMember;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async kickMemberFromWorkspace(
    ownerId: string,
    data: { workspaceId: number; userId: string }
  ) {
    try {
      const workspace = await this.getCurrentWorkspace(data.workspaceId);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const member = await this.getCurrentMemberInWorkspace(
        data.workspaceId,
        data.userId
      );

      const kickMember = await this.prisma.workspace_member.delete({
        where: {
          member_id: member.member_id,
        },
      });

      return kickMember;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async leaveFromWorkspace(workspaceId: number, userId: string) {
    try {
      const member = await this.getCurrentMemberInWorkspace(
        workspaceId,
        userId
      );

      const leave = await this.prisma.workspace_member.delete({
        where: {
          member_id: member.member_id,
        },
      });

      return leave;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateRulesMember(ownerId: string, data: UpdateRuleMemberDTO) {
    try {
      const workspace = await this.getCurrentWorkspace(data.workspace_id);
      if (workspace.owner_id !== ownerId)
        throw new Error("You are not owner in this workspaces");

      const member = await this.getCurrentMemberInWorkspace(
        data.workspace_id,
        data.user_id
      );

      const updateRule = await this.prisma.workspace_member.update({
        where: {
          member_id: member.member_id,
        },
        data: {
          rule: data.rule,
        },
      });

      return updateRule;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
