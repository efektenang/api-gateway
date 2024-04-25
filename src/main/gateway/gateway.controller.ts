import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { Request, Response } from "@utilities/helper-type.util";
import { RateLimiterGuard } from "nestjs-rate-limiter";
import * as IP from "ip";

@Controller()
export class GatewayController {
  constructor(private readonly gateway: GatewayService) {}

  @Get(":serviceKey/:routeKey/*")
  @UseGuards(RateLimiterGuard)
  async sendGetMethod(
    @Param() params: string,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any
  ) {
    const { id, method, url } = req;

    const logs = {
      host: header["host"],
      log_id: id,
      path: url,
      method: method,
      ip: IP.address(),
    };
    return this.gateway
      .dynamicMethodGateway({
        params,
        req: logs,
        uaHeader: header["user-agent"],
      })
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }

  @Post(":serviceKey/:routeKey/*")
  @UseGuards(RateLimiterGuard)
  async sendPostMethod(
    @Param() params: string,
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: any,
    @Headers() header: any
  ) {
    const { id, method, url, } = req;

    const logs = {
      host: header["host"],
      log_id: id,
      path: url,
      method: method,
      ip: IP.address(),
    };

    return this.gateway
      .dynamicMethodGateway({
        params,
        body,
        req: logs,
        uaHeader: header["user-agent"],
      })
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }

  @Put(":serviceKey/:routeKey/*")
  @UseGuards(RateLimiterGuard)
  async updatePutMethod(
    @Param() params: string,
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: any,
    @Headers() header: any
  ) {
    const { id, method, url, } = req;

    const logs = {
      host: header["host"],
      log_id: id,
      path: url,
      method: method,
      ip: IP.address(),
    };

    return this.gateway
      .dynamicMethodGateway({
        params,
        body,
        req: logs,
        uaHeader: header["user-agent"],
      })
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }

  @Delete(":serviceKey/:routeKey/*")
  @UseGuards(RateLimiterGuard)
  async hitDeleteMethod(
    @Param() params: string,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any
  ) {
    const { id, method, url, } = req;

    const logs = {
      host: header["host"],
      log_id: id,
      path: url,
      method: method,
      ip: IP.address(),
    };
    return this.gateway
      .dynamicMethodGateway({
        params,
        req: logs,
        uaHeader: header["user-agent"],
      })
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_GATEWAY, { message: err.message })
      );
  }
}
