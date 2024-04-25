import {
  ConfigEndpointsDTO,
  CreateRoutesDTO,
  UpdateRouteDTO,
} from "@dtos/route.dto";
import {
  Body,
  Controller,
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
import { RouteService } from "./route.service";
import { RolesGuard } from "@main/users/roles/roles.guard";
import { Role, Roles } from "@main/users/roles/roles.decorator";

@Controller()
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get("route-list/:serviceKey")
  async getRoute(@Res() res: Response, @Param("serviceKey") params: string) {
    return this.routeService
      .getRouteList(params)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Get("endpoint/logs")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async getAllLogs(@Res() res: Response, @Query() query) {
    return this.routeService
      .getEndpointLogs(query)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("split-endpoint")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async configSplitEndpoint(
    @Body() body: ConfigEndpointsDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.routeService
      .configEndpoints(
        req.user_auth.user_id,
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("generate-routes")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async createStaticRoute(
    @Body() body: CreateRoutesDTO,
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.routeService
      .generateRoutes(
        req.user_auth.user_id,
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Put(":routeId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async updateStaticRoute(
    @Body() body: UpdateRouteDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: any
  ) {
    return this.routeService
      .updateRoutesGateway(
        req.user_auth.user_id,
        body,
        parseInt(params.routeId)
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("delete/:routeId")
  @UseGuards(RolesGuard)
  @Roles(Role.Server)
  async deleteRoute(
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: any
  ) {
    return this.routeService
      .deleteSpecificRoute(
        parseInt(params.routeId)
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
