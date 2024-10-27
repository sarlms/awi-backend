import { IsNotEmpty, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTransactionDto {
  @IsNotEmpty()
  labelId: Types.ObjectId;

  @IsNotEmpty()
  sessionId: Types.ObjectId;

  @IsNotEmpty()
  sellerId: Types.ObjectId;

  @IsNotEmpty()
  clientId: Types.ObjectId;

  @IsNotEmpty()
  managerId: Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  transactionDate: Date;
}
