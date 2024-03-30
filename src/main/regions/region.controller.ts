import { Controller, Get, Query, Res } from "@nestjs/common";
import { RegionServices } from "./region.service";
import { Response } from "@utilities/helper-type.util";

@Controller()
export class RegionControllers {
  constructor(private regionService: RegionServices) {}

  @Get()
  async getListRegions(
    @Res() res: Response
  ) {
    return this.regionService
      .getSomeDataRegions()
      .then((result) =>
        res.asJson(200, {
          message: "OK",
          data: result,
        })
      )
      .catch((er) =>
        res.asJson(
          400,
          {
            message: "[REG-01] failed to load data region",
          },
          { message: er.message }
        )
      );
  }
}
