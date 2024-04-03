import { GatewayModule } from "@main/gateway/gateway.module";

export const RouteGateway: FX_ROUTERS.TRouterConfigs = {
  path: "services",
  module: GatewayModule,
  checks: {
    GET: [
      {
        code: "GET-REG",
        name: "Get data region",
        auth: false,
      },
    ],
    POST: [
      {
        code: "POST-REG",
        name: "Get data region",
        auth: false,
      },
    ],
  },
};