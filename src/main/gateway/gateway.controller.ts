import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { GatewayServices } from "./gateway.service";
import { Request, Response } from "@utilities/helper-type.util";
import { CreateServicesDTO, UpdateServiceDTO } from "@dtos/services.dto";

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
  async saveServices(
    @Body() body: CreateServicesDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any
  ) {
    return this.gateway
      .createServices(
        {
          userID: req.user_auth.user_name,
          workspace: parseInt(header["x-workspace-id"]),
        },
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, {
          message: "OK",
          data: result,
        })
      );
  }

  @Post("update-services/:serviceKey")
  async updateServices(
    @Body() body: UpdateServiceDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any,
    @Param('serviceKey') params: string
  ) {
    return this.gateway
      .updateBasicInfoServices(
        {
          userID: req.user_auth.user_name,
          workspace: parseInt(header["x-workspace-id"]),
        },
        body,
        params
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
