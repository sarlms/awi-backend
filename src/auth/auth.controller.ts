import { Body, Controller, Post, UseGuards, Get, Req, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guards';
import { JwtAuthGuard } from './jwt-auth.guards';
import { ManagerService } from '../manager/manager.service';
import { Request } from 'express';

@Controller('auth') // Specifies that all routes in this controller will be prefixed with '/auth'
export class AuthController {
  // Injecting the AuthService and ManagerService into the controller
  constructor(
    private readonly authService: AuthService, // AuthService handles authentication logic like token generation
    private readonly managerService: ManagerService, // ManagerService handles operations related to the Manager entity, such as finding or creating a manager
  ) {}

  // Dans votre AuthController
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.generateJwtToken(loginDto);
    return { token }; // Renvoie un objet contenant le token
  }
}
