import { GatewayModule } from "@main/gateway/gateway.module";

export const RouteGateway: FX_ROUTERS.TRouterConfigs = {
  path: "gateway",
  module: GatewayModule,
  checks: {
    GET: [
      {
        suffix: "services",
        code: "GET-REG",
        name: "Get list gateway services",
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
        auth: true,
      },
      {
        suffix: "update-services/:serviceKey",
        code: "POST-SERVE",
        name: "Update information of services gateway",
        auth: true,
      },
      {
        suffix: "generate-routes",
        code: "POST-ROUTE",
        name: "Update information of services gateway",
        auth: true,
      },
    ]
  },
};
