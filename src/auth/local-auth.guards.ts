import { Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, manager: any, info: any, context: any, status: any) {
    if (err || !manager) {
      throw new HttpException(err.message, err.status);
    }
    return manager;
  }
}
