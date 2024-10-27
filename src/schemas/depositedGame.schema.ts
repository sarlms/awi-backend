import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DepositedGame extends Document {
  @Prop({ required: true })
  salePrice: number;

  @Prop({ required: true, default: false })
  sold: boolean;

  @Prop({ required: true, default: false })
  forSale: boolean;

  @Prop({ required: true, default: false })
  pickedUp: boolean;
}

export const DepositedGameSchema = SchemaFactory.createForClass(DepositedGame);
