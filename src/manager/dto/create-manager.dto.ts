import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  @IsNotEmpty()
  admin: boolean = false;
}
