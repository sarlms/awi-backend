// src/manager/dto/profile.dto.ts

import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class ProfileDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean() // Changement ici
  admin?: boolean;

  // Add any additional fields as necessary
}
