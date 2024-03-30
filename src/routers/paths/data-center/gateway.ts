import { GatewayModule } from "@main/gateway/gateway.module";

export const RouteGateway: FX_ROUTERS.TRouterConfigs = {
  path: "gateway",
  module: GatewayModule,
  checks: {
    GET: [
      {
        suffix: "services",
        code: "GET-REG",
        name: "Get data region",
        auth: false,
      },
      {
        suffix: ":serviceId/:routeId/:endpoint",
        code: "GET-REG",
        name: "Get data region",
        auth: false,
      },
    ],
  },
};
