import { IsString, IsUrl, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

//il faudra en ajouter d'autres !!
export enum AgeRange {
  VeryYoung = "0-5",
  Child = "5-10",
  Preteen = "8-12",
  Teen = "12-18",
  Adult = "18+"
}

export class CreateGameDescriptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  photoURL: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfPlayers: number;

  @IsEnum(AgeRange)
  @IsNotEmpty()
  ageRange: AgeRange;
}
