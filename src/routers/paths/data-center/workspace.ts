import { WorkspaceModule } from "@main/workspaces/workspace.module";


export const RouteWorkspace: FX_ROUTERS.TRouterConfigs = {
  path: "workspace",
  module: WorkspaceModule,
  checks: {
    GET: [
      {
        code: "GET-WORKSPACE",
        name: "Get workspace list data",
        auth: true,
      },
      {
        suffix: "member/:workspaceId",
        code: "GET-WORKSPACE",
        name: "Get workspace member list",
        auth: false,
      },
    ],
    POST: [
      {
        suffix: "create",
        code: "POST-WORKSPACE",
        name: "Generate new Workspace for API Gateway Management.",
        auth: true,
      },
      {
        suffix: "disable/:workspaceId",
        code: "POST-WORKSPACE",
        name: "Make workspace disable.",
        auth: true,
      },
      {
        suffix: "enable/:workspaceId",
        code: "POST-WORKSPACE",
        name: "Make workspace enable.",
        auth: true,
      },
      {
        suffix: ":workspaceId/member/add",
        code: "POST-WORKSPACE",
        name: "Add new Member to workspace",
        auth: true,
      },
      {
        suffix: "member/kick",
        code: "POST-WORKSPACE",
        name: "Kick member from workspace",
        auth: true,
      },
      {
        suffix: ":workspaceId/member/leave",
        code: "POST-WORKSPACE",
        name: "Member leave from workspace",
        auth: true,
      },
    ],
    PUT: [
      {
        suffix: ":workspaceId",
        code: "PUT-WORKSPACE",
        name: "Update basic info Workspace for API Gateway Management.",
        auth: true,
      },
      {
        suffix: "update/rule",
        code: "PUT-WORKSPACE",
        name: "Update rule of Workspace member for API Gateway Management.",
        auth: true,
      },
    ],
    DELETE: [
      {
        suffix: ":workspaceId",
        code: "DELETE-WORKSPACE",
        name: "Delete permanently workspace.",
        auth: true,
      },
    ],
  },
};
