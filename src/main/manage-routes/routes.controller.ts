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
import { RoutesService } from "./routes.service";
import { CreateEndpointDTO, CreateRoutesDTO } from "@dtos/services.dto";
import { Request, Response } from "@utilities/helper-type.util";

@Controller()
export class RoutesController {
  constructor(private readonly routeService: RoutesService) {}

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


  @Get("endpoint/:routeID")
  async getEndpoints(@Res() res: Response, @Param("routeID") params: string) {
    return this.routeService
      .getEndpointList(parseInt(params))
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("generate-routes")
  async createStaticRoute(
    @Body() body: CreateRoutesDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any
  ) {
    return this.routeService
      .generateRoutes(
        {
          userID: req.user_auth.user_id,
          workspace: parseInt(header["x-workspace-id"]),
        },
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("generate-endpoint")
  async createEndpoint(
    @Body() body: CreateEndpointDTO,
    @Res() res: Response,
    @Req() req: Request,
    @Headers() header: any
  ) {
    return this.routeService
      .generateEndpoint(
        {
          userID: req.user_auth.user_id,
          workspace: parseInt(header["x-workspace-id"]),
        },
        body
      )
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
