// src/manager/dto/profile.dto.ts

import { IsString, IsEmail } from 'class-validator';

export class ProfileDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  // Add any additional fields as necessary
}
