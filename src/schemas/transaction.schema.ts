import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'DepositedGame', required: true })
  labelId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })
  sessionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Manager', required: true })
  managerId: Types.ObjectId;

  @Prop({ required: true })
  transactionDate: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
