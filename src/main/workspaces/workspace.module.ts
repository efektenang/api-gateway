import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { WorkspaceServices } from "./workspace.service";
import { WorkspaceController } from "./workspace.controller";

@Module({
    controllers: [WorkspaceController],
    providers: [WorkspaceServices, PrismaService]
})
export class WorkspaceModule {}