import { RouteGateway } from "./paths/data-center/gateway";
import { RouteRegion } from "./paths/data-center/region";
import { RouteUser } from "./paths/data-center/user";
import { RouteWorkspace } from "./paths/data-center/workspace";

export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: "services",
    children: [
      // Data Center
      RouteRegion,
    ],
  },
  {
    path: "api/v1",
    children: [
      // Data Center
      RouteUser,
      RouteWorkspace,
      RouteGateway
    ],
  },
];
