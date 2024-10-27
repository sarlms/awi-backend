import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDepositFeePaymentDto {
  @IsNotEmpty()
  sellerId: Types.ObjectId;

  @IsNotEmpty()
  sessionId: Types.ObjectId;

  @IsNotEmpty()
  managerId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  depositFeePayed: number;

  @IsDate()
  @IsNotEmpty()
  depositDate: Date;
}
