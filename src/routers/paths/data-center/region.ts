import { RegionModules } from "@main/regions/region.module";

export const RouteRegion: FX_ROUTERS.TRouterConfigs = {
  path: "region",
  module: RegionModules,
  checks: {
    GET: [
      {
        code: "GET-REG",
        name: "Get data region",
        auth: false,
      },
    ],
  },
};
