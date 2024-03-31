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
    POST: [
      {
        suffix: "generate-services",
        code: "POST-SERVE",
        name: "Generate new services gateway",
        auth: false,
      },
    ]
  },
};
