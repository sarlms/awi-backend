import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop({ required: true, unique: true })
  sellerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 0 })
  amountOwed: number;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
