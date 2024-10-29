import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Spécifiez le champ `email` comme nom d'utilisateur
    this.logger = new Logger(LocalStrategy.name);
  }

  async validate(email: string, password: string): Promise<any> {
    const manager = await this.authService.validateManager(email, password);
    if (!manager) {
      this.logger.error(`Invalid credentials for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }
    this.logger.log('Manager logged in successfully:', email);
    return manager; // Le manager authentifié est renvoyé ici
  }
}
