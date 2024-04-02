import { Body, Controller, Headers, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { RoutesService } from "./routes.service";
import { CreateRoutesDTO } from "@dtos/services.dto";
import { Request, Response } from "@utilities/helper-type.util";

@Controller()
export class RoutesController {
  constructor(private readonly routeService: RoutesService) {}

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
}
