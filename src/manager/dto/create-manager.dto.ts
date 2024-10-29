// dto/create-manager.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;  // Mot de passe obligatoire

  @IsBoolean()
  admin: boolean = false;
}
