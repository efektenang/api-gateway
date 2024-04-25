import { ServicesModule } from "@main/manage-services/manage-services.module";


export const RouteServices: FX_ROUTERS.TRouterConfigs = {
  path: "services",
  module: ServicesModule,
  checks: {
    GET: [
      {
        code: "GET-SERVICE",
        name: "Get list gateway services",
        auth: true,
      },
    ],
    POST: [
      {
        suffix: "generate-services",
        code: "POST-SERVICE",
        name: "Generate new services gateway",
        auth: true,
      },
      {
        suffix: "add/filter-address",
        code: "POST-SERVICE",
        name: "Add IP address to whitelist gateway",
        auth: true,
      },
    ],
    PUT: [
      {
        suffix: ":serviceKey",
        code: "PUT-SERVICE",
        name: "Update current info Gateway Service",
        auth: true,
      },
      {
        suffix: ":workspaceId/filter-address/:addressId",
        code: "PUT-SERVICE",
        name: "Update  whitelist address.",
        auth: true,
      },
    ],
    DELETE: [
      {
        suffix: ":serviceKey",
        code: "DELETE-SERVICE",
        name: "Delete Gateway Service",
        auth: true,
      },
    ]
  },
};
