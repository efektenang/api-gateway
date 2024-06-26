import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "@utilities/helper-type.util";
import {
  CreateServicesDTO,
  UpdateServiceDTO,
  WhitelistAddressDTO,
} from "@dtos/services.dto";
import { ManageServices } from "./manage-services.service";
import { RolesGuard } from "@main/users/roles/roles.guard";
import { Role, Roles } from "@main/users/roles/roles.decorator";

@Controller()
export class ManageServicesController {
  constructor(private readonly services: ManageServices) {}

  @Get()
  async getServices(@Res() res: Response, @Query() query) {
    return this.services
      .getListServices(parseInt(query.workspaceId))
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("generate-services")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async saveServices(
    @Body() body: CreateServicesDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Query() query: any
  ) {
    return this.services
      .createServices(
        {
          userID: req.user_auth.user_id,
          workspace: parseInt(query.workspaceId),
        },
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, {
          message: "OK",
          data: result,
        })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Put(":serviceKey")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async updateServices(
    @Body() body: UpdateServiceDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: any,
    @Query() query: any
  ) {
    return this.services
      .updateServiceInfo(
        {
          userID: req.user_auth.user_id,
          workspace: parseInt(query.workspaceId),
        },
        body,
        params.serviceKey
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("add/filter-address")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async addWhitelists(@Body() body: WhitelistAddressDTO, @Res() res: Response) {
    return this.services
      .addWhitelistAddress(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Put("filter-address/:addressId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async updateWhitelist(
    @Body() body: WhitelistAddressDTO,
    @Res() res: Response,
    @Param() params: any
  ) {
    return this.services
      .updateFilterAddress(body, parseInt(params.addressId))
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Delete(":serviceKey")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async deletedServices(
    @Res() res: Response,
    @Param("serviceKey") params: string
  ) {
    return this.services
      .deleteServices(params)
      .then((result) => res.asJson(HttpStatus.OK, { message: "OK" }))
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
