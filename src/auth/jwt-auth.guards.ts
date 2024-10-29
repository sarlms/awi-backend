import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard extends Passport's AuthGuard with the 'jwt' strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
