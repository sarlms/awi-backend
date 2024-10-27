import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class DepositFeePayment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })
  sessionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Manager', required: true })
  managerId: Types.ObjectId;

  @Prop({ required: true })
  depositFeePayed: number;

  @Prop({ required: true })
  depositDate: Date;
}

export const DepositFeePaymentSchema = SchemaFactory.createForClass(DepositFeePayment);
