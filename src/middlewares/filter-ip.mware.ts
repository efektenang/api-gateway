import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "@utilities/helper-type.util";
import { NextFunction } from "express";
import * as IP from 'ip'

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const param = req.params[0].split("/");
    // const clientIP = req.client_informations.ip_addr;
    const clientIP = IP.address()

    if (param[0] === "gateway") {
      const serviceKey = param[2];

      const ipFilter = await this.prisma.whitelist_address.findFirst({
        where: {
          address: clientIP,
        },
      });

      if (ipFilter) {
        if (ipFilter.type === null) {
          next();
        } else if (ipFilter.type === "whitelist" && ipFilter.service_id === serviceKey) {
          next()
        } else {
          res.asJson(HttpStatus.FORBIDDEN, {
            message: "Access Forbidden.",
          });
        }
      } else {
        res.asJson(HttpStatus.FORBIDDEN, {
          message: "Access Forbidden.",
        });
      }
    } else {
      next();
    }
  }
}
