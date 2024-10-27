import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Refund extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })
  sessionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Manager', required: true })
  managerId: Types.ObjectId;

  @Prop({ required: true })
  refund: number;

  @Prop({ required: true })
  refundDate: Date;
}

export const RefundSchema = SchemaFactory.createForClass(Refund);
