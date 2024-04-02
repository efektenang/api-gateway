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
import { Request, Response } from "@utilities/helper-type.util";
import {
  CreateServicesDTO,
} from "@dtos/services.dto";
import { ManageServices } from "./manage-services.service";

@Controller()
export class ManageServicesController {
  constructor(private readonly gateway: ManageServices) {}

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
          userID: req.user_auth.user_id,
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
}
