import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRefundDto {
  @IsNotEmpty()
  sellerId: Types.ObjectId;

  @IsNotEmpty()
  sessionId: Types.ObjectId;

  @IsNotEmpty()
  managerId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  refundAmount: number;

  @IsDate()
  @IsNotEmpty()
  refundDate: Date;
}
