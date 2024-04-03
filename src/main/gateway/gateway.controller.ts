import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { Response } from "@utilities/helper-type.util";

@Controller()
export class GatewayController {
  constructor(private readonly gateway: GatewayService) {}

  @Get(":serviceKey/*")
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
  async sendStaticAPI(@Param() params: string, @Res() res: Response, @Body() body: any) {
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
