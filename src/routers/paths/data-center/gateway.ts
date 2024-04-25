import { GatewayModule } from "@main/gateway/gateway.module";

export const RouteGateway: FX_ROUTERS.TRouterConfigs = {
  path: "services",
  module: GatewayModule,
  checks: {
    GET: [
      {
        suffix: "?/?/(.*)",
        code: "GET-GATEWAY",
        name: "Get method of API Gateway.",
        auth: false,
      },
    ],
    POST: [
      {
        suffix: "?/?/(.*)",
        code: "POST-GATEWAY",
        name: "POST method of API Gateway.",
        auth: false,
      },
    ],
    PUT: [
      {
        suffix: "?/?/(.*)",
        code: "PUT-GATEWAY",
        name: "PUT method of API Gateway.",
        auth: false,
      },
    ],
    DELETE: [
      {
        suffix: "?/?/(.*)",
        code: "DELETE-GATEWAY",
        name: "DELETE method of API Gateway.",
        auth: false,
      },
    ],
  },
};
