import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Specify 'email' as the username field for authentication
    this.logger = new Logger(LocalStrategy.name);
  }

  async validate(email: string, password: string): Promise<any> {
    // Validate the manager's credentials using AuthService
    const manager = await this.authService.validateManager(email, password);

    // If the manager is not found or credentials are invalid, throw an UnauthorizedException
    if (!manager) {
      this.logger.error(`Invalid credentials for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    // Log successful login and return the authenticated manager
    this.logger.log(`Manager logged in successfully: ${email}`);
    return manager; // The authenticated manager is returned here
  }
  
}
