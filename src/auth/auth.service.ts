import {Injectable,forwardRef,Inject,UnauthorizedException,NotFoundException,} from '@nestjs/common';
import * as bcrypt from 'bcrypt';  // Import bcrypt for password hashing and comparison
import { JwtService } from '@nestjs/jwt';  // Import JwtService to handle JWT token generation
import { ManagerService } from '../manager/manager.service';  // Import ManagerService to interact with manager data
import { LoginDto } from './dto/login.dto';  // Import LoginDto to structure login data

@Injectable()
export class AuthService {
  constructor(
    // Inject ManagerService with forwardRef to prevent circular dependencies
    @Inject(forwardRef(() => ManagerService))
    private managerService: ManagerService,

    // Inject JwtService for generating and verifying JWT tokens
    private jwtService: JwtService,
  ) {}

  // Method to validate manager's credentials during login
  async validateManager(email: string, pass: string): Promise<any> {
    // Fetch the manager by email
    const manager = await this.managerService.findOne({ email });
    
    // If no manager is found, throw a NotFoundException
    if (!manager) throw new NotFoundException('Email does not exist');
    
    // Compare provided password with stored hashed password
    const isMatched = await this.comparePasswords(pass, manager.password);
    
    // If password doesn't match, throw an UnauthorizedException
    if (!isMatched) throw new UnauthorizedException('Invalid password');
    
    // If validation is successful, return the manager data
    return manager;
  }

// Method to generate a JWT token using the manager's email and ID
async generateJwtToken(loginDto: LoginDto): Promise<string> {
  // Check that email is provided; if not, throw an error
  if (!loginDto.email) {
    throw new Error("Email is missing from the login payload");
  }

  // Find the manager based on email to retrieve the ID
  const manager = await this.managerService.findOne({ email: loginDto.email });
  if (!manager) {
    throw new Error("Manager not found");
  }

  // Generate and return a JWT token containing both email and ID in the payload
  return this.jwtService.sign({ id: manager._id, email: manager.email });
}

 // Nouvelle méthode pour récupérer le profil du manager par ID
 async getManagerProfileById(managerId: string): Promise<any> {
  const manager = await this.managerService.findOne({ _id: managerId });
  if (!manager) throw new NotFoundException('Manager not found');
  const { password, ...safeData } = manager.toObject();
  return safeData;
}

  // Method to hash a plain-text password for secure storage
  async getHashedPassword(password: string): Promise<any> {
    // Use bcrypt to hash the password with a salt of 10 rounds
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);  // If hashing fails, reject with an error
        }
        resolve(hash);  // Resolve with the hashed password
      });
    });
  }

  // Method to compare a plain-text password with a hashed password
  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<any> {
    // Use bcrypt to compare the passwords
    return bcrypt
      .compare(password, hashedPassword)
      .then((isMatch) => {
        return isMatch;  // Return true if passwords match, false otherwise
      })
      .catch((err) => err);  // Handle any errors that occur during comparison
  }
}

