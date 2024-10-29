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

  @UseGuards(LocalAuthGuard) // Protects the 'login' route with LocalAuthGuard, which checks the user's credentials
  @Post('login') // Defines the route as a POST request at '/auth/login'
  async login(@Body() loginDto: LoginDto) {
    // This method expects a LoginDto object from the request body, which contains login credentials

    // Calls the generateJwtToken method in AuthService to create a JWT token for the user based on their credentials
    return this.authService.generateJwtToken(loginDto);
  }
}
