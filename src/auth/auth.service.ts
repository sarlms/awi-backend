import {
    Injectable,
    forwardRef,
    Inject,
    UnauthorizedException,
    NotFoundException,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { ManagerService } from '../manager/manager.service';
  import { LoginDto } from './dto/login.dto';

  
  @Injectable()
  export class AuthService {
    constructor(
      @Inject(forwardRef(() => ManagerService))
      private managerService: ManagerService,
      private jwtService: JwtService,
    ) {}
  
    async validateManager(email: string, pass: string): Promise<any> {
      const manager = await this.managerService.findOne({ email });
      if (!manager) throw new NotFoundException('Email does not exist');
      
      const isMatched = await this.comparePasswords(pass, manager.password);
      if (!isMatched) throw new UnauthorizedException('Invalid password');
      
      return manager;
    }
  
    async generateJwtToken(userDto: LoginDto): Promise<string> {
        if (!userDto.email) {
          throw new Error("Email is missing from the login payload");
        }
        // Implement JWT generation logic here, for example:
        return this.jwtService.sign({ email: userDto.email });
    }

    async getHashedPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              reject(err);
            }
            resolve(hash);
          });
        });
    }
  
    async comparePasswords(
        password: string,
        hashedPassword: string
      ): Promise<any> {
        return bcrypt
          .compare(password, hashedPassword)
          .then((isMatch) => {
            if (isMatch) return true;
            return false;
          })
          .catch((err) => err);
    }
  }
  