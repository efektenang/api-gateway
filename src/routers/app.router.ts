import { RouteGateway } from "./paths/data-center/gateway";
import { RouteHandler } from "./paths/data-center/route";
import { RouteServices } from "./paths/data-center/services";
import { RouteUser } from "./paths/data-center/user";
import { RouteWorkspace } from "./paths/data-center/workspace";

export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: "gateway",
    children: [
      // Data Center
      RouteGateway,
    ],
  },
  {
    path: "api/v1",
    children: [
      // Data Center
      RouteUser,
      RouteServices,
      RouteHandler,
      RouteWorkspace,
    ],
  },
];
