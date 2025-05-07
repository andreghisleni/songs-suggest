import { Controller, Req, Get, Post, Header, Redirect } from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';

import { Public } from '../auth/public.decorator';
import { CloudflareR2Service } from '../cloud-flare-r2/cloud-flare-r2.service';

@Controller('files')
export class FileController {
  constructor(private cloudFlareR2Service: CloudflareR2Service) { } // eslint-disable-line

  @Public()
  @Get('?')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Cross-Origin-Resource-Policy', 'cross-origin')
  @Redirect(undefined, 302)
  async getLinkedTicket(@Req() req: Request) {
    const { file } = z
      .object({
        file: z.string(),
      })
      .parse(req.query);

    const url = await this.cloudFlareR2Service.getFileUrl(file);

    return {
      url,
    };
  }

  @Public()
  @Post('?')
  async getUploadFile(@Req() req: Request) {
    const { file } = z
      .object({
        file: z.string(),
      })
      .parse(req.query);

    const url = await this.cloudFlareR2Service.getPutFileUrl(file);

    return {
      url,
      // file,
    };
  }
}
