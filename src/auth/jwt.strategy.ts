import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ManagerService } from '../manager/manager.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;

  constructor(@Inject(forwardRef(() => ManagerService)) private readonly managerService: ManagerService) {
    // Configure the JWT strategy with options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT from Authorization header as a Bearer token
      ignoreExpiration: false,  // Ensures the token expiration is checked
      secretOrKey: 'JWT_SECRET', // Secret key used to verify the token signature
    });
    this.logger = new Logger(JwtStrategy.name); // Initialize a logger for tracking
  }

  // The validate method is called automatically by Passport to validate the JWT payload
  async validate(payload: any) {
    this.logger.log('Validating JWT payload:', payload); // Logs the JWT payload for debugging
    
    // Find the manager in the database based on the payload's id
    return { id: payload.id, email: payload.email };
    /* const manager = await this.managerService.findOne(payload.id);
    return manager; */
  }
}
