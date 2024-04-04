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
      {
        suffix: "endpoint/:routeID",
        code: "GET-ENDPOINT",
        name: "Get data enpoints",
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
      {
        suffix: "generate-endpoint",
        code: "POST-ENDPOINT",
        name: "Generate data endpoints",
        auth: true,
      },
    ],
  },
};
