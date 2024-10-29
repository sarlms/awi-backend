import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { ManagerModule } from '../manager/manager.module';

@Module({
  imports: [
    // Configure JwtModule to enable JWT-based authentication
    JwtModule.register({
      secret: 'JWT_SECRET',  // Secret key used to sign tokens. Replace this with an environment variable for security
      signOptions: { expiresIn: '3000s' },  // Token expiration time set to 3000 seconds (or 50 minutes)
    }),
    
    // Import ManagerModule with forwardRef to handle circular dependencies
    forwardRef(() => ManagerModule),
    
    // Enable PassportModule to support different authentication strategies
    PassportModule,
  ],
  
  // AuthController handles authentication routes, such as login
  controllers: [AuthController],
  
  // Providers include AuthService and authentication strategies
  providers: [
    AuthService,   // AuthService contains logic for authenticating users and generating tokens
    JwtStrategy,   // JwtStrategy validates JWT tokens for secured routes
    LocalStrategy, // LocalStrategy validates user credentials during login
  ],
  
  // Exports AuthService to make authentication utilities available to other modules
  exports: [AuthService],
})
export class AuthModule {}
