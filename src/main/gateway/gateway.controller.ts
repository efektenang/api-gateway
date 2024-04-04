import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { Response } from "@utilities/helper-type.util";
import { RateLimiterGuard } from "nestjs-rate-limiter";

@Controller()
export class GatewayController {
  constructor(private readonly gateway: GatewayService) {}

  @Get(":serviceKey/*")
  @UseGuards(RateLimiterGuard)
  async getHitAPI(@Param() params: string, @Res() res: Response) {
    return this.gateway
      .dynamicHitAPI(params)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }

  @Post(":serviceKey/:routeKey/*")
  @UseGuards(RateLimiterGuard)
  async sendStaticAPI(
    @Param() params: string,
    @Res() res: Response,
    @Body() body: any
  ) {
    return this.gateway
      .staticHitAPI(params, body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }
}
