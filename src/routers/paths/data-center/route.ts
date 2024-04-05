import { RoutesModule } from "@main/manage-routes/routes.module";

export const RouteHandler: FX_ROUTERS.TRouterConfigs = {
  path: "route",
  module: RoutesModule,
  checks: {
    GET: [
      {
        suffix: "route-list/:serviceKey",
        code: "GET-ROUTE",
        name: "Get data routes",
        auth: true,
      },
    ],
    POST: [
      {
        suffix: "generate-routes",
        code: "POST-ROUTE",
        name: "Generate data routes",
        auth: true,
      },
    ],
  },
};
