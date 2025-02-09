import { Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Customizes the handling of authentication requests
  handleRequest(err: any, payload: any, info: any, context: any, status: any) {
    // If there is an error or no manager object, throw an HttpException with the error message and status
    if (err || !payload) {
      throw new HttpException(err.message, err.status);
    }
    // If successful, return the manager object, making it available in the request
    return payload;
  }
}
