import { RoutesModule } from "@main/manage-routes/routes.module";

export const RouteHandler: FX_ROUTERS.TRouterConfigs = {
  path: "route",
  module: RoutesModule,
  checks: {
    POST: [
      {
        suffix: "generate-routes",
        code: "GET-REG",
        name: "Get data region",
        auth: true,
      },
      {
        suffix: "generate-endpoint",
        code: "GET-REG",
        name: "Get data region",
        auth: true,
      },
    ],
  },
};
