import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)  // Keeping the LocalAuthGuard intact
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.generateJwtToken(loginDto);
  }
}
