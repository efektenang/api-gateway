import { RouteModule } from "@main/manage-routes/route.module";

export const RouteHandler: FX_ROUTERS.TRouterConfigs = {
  path: "route",
  module: RouteModule,
  checks: {
    GET: [
      {
        suffix: "route-list/:serviceKey",
        code: "GET-ROUTE",
        name: "Get data routes",
        auth: true,
      },
      {
        suffix: "endpoint/logs",
        code: "GET-ROUTE",
        name: "Get data routes",
        auth: true,
      },
    ],
    POST: [
      {
        suffix: "generate-route",
        code: "POST-ROUTE",
        name: "Generate data routes",
        auth: true,
      },
      {
        suffix: "delete/:routeId",
        code: "POST-DELETE",
        name: "Delete data routes",
        auth: true,
      },
    ],
    PUT: [
      {
        suffix: ":routeId",
        code: "PUT-UPDATE",
        name: "Update data routes",
        auth: true,
      },
    ],
  },
};
