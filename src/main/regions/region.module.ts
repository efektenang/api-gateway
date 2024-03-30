import { Module } from "@nestjs/common";
import { RegionControllers } from "./region.controller";
import { RegionServices } from "./region.service";

@Module({
  controllers: [RegionControllers],
  providers: [RegionServices],
})
export class RegionModules {}
