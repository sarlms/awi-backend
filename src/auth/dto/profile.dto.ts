import { IsEmail, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
