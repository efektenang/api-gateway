import { WorkspaceModule } from "@main/workspaces/workspace.module";


export const RouteWorkspace: FX_ROUTERS.TRouterConfigs = {
  path: "workspace",
  module: WorkspaceModule,
  checks: {
    GET: [
      {
        code: "GET-WORKSPACE",
        name: "Get data region",
        auth: false,
      },
    ],
    POST: [
      {
        suffix: "create",
        code: "POST-WORKSPACE",
        name: "Generate new services gateway",
        auth: true,
      },
    ]
  },
};
