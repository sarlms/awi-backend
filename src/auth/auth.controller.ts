import { Body, Controller, Post, UseGuards, Get, Req, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guards';
import { JwtAuthGuard } from './jwt-auth.guards';
import { ManagerService } from '../manager/manager.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly managerService: ManagerService, // Injectez le ManagerService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.generateJwtToken(loginDto);
  }

}
