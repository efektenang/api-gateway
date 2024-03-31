import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { GatewayServices } from "./gateway.service";
import { Request } from "express";
import { Response } from "@utilities/helper-type.util";

@Controller()
export class GatewayController {
  constructor(private readonly gateway: GatewayServices) {}

  @Get("services")
  async getAllServices(@Res() res) {
    return this.gateway.getServices().then((result) =>
      res.json({
        message: "OK",
        data: result,
      })
    );
  }

  @Get(":serviceId/:routeId/:endpoint")
  async getGateway(@Res() res, @Req() req: Request) {
    return this.gateway
      .getGateway({ protocol: req.protocol, host: req.get("host") }, req.route)
      .then((result) =>
        res.json({
          message: "OK",
          data: result,
        })
      )
      .catch((err: any) => res.json({ message: err.message }));
  }

  @Post("generate-services")
  async saveServices(@Body() body: any, @Res() res: Response) {
    return this.gateway.createServices(body).then((result) =>
      res.asJson(HttpStatus.OK, {
        message: "OK",
        data: result,
      })
    );
  }
}
