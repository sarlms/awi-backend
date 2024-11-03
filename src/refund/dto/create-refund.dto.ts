import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRefundDto {
  @IsNotEmpty()
  sellerId: string | Types.ObjectId;

  @IsNotEmpty()
  sessionId: string | Types.ObjectId;

  @IsNotEmpty()
  managerId: string | Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  refundAmount: number;

  @IsDate()
  @IsNotEmpty()
  refundDate: Date;
}
