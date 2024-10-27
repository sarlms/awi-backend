import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

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
}
