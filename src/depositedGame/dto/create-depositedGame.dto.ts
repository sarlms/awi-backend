import { IsBoolean, IsNumber, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateDepositedGameDto {
  @IsNumber()
  @IsNotEmpty()
  salePrice: number;

  @IsBoolean()
  @IsNotEmpty()
  sold: boolean;

  @IsBoolean()
  @IsNotEmpty()
  forSale: boolean;

  @IsBoolean()
  @IsNotEmpty()
  pickedUp: boolean;

  @IsMongoId()
  @IsNotEmpty()
  sessionId: string;

  @IsMongoId()
  @IsNotEmpty()
  sellerId: string;

  @IsMongoId()
  @IsNotEmpty()
  gameDescriptionId: string;
}
