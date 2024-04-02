import { ServicesModule } from "@main/manage-services/manage-services.module";


export const RouteServices: FX_ROUTERS.TRouterConfigs = {
  path: "services",
  module: ServicesModule,
  checks: {
    GET: [
      {
        code: "GET-REG",
        name: "Get list gateway services",
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
    ]
  },
};
