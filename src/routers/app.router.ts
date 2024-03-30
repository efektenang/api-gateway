import { RouteGateway } from "./paths/data-center/gateway";
import { RouteRegion } from "./paths/data-center/region";
import { RouteUser } from "./paths/data-center/user";

export const routes: FX_ROUTERS.TRouterConfigs[] = [
  {
    path: "services",
    children: [
      // Data Center
      RouteRegion,
      RouteGateway
    ],
  },
  {
    path: "gateway",
    children: [
      // Data Center
      RouteUser,
    ],
  },
];
