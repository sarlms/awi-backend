import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })  // Clé étrangère vers Session
  sessionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seller', required: true })  // Clé étrangère vers Seller
  sellerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'GameDescription', required: true })  // Clé étrangère vers GameDescription
  gameDescriptionId: Types.ObjectId;
}

export const DepositedGameSchema = SchemaFactory.createForClass(DepositedGame);

// Middleware to ensure `forSale` and `pickedUp` cannot be true at the same time
DepositedGameSchema.pre('save', function (next) {
  const game = this as DepositedGame;
  if (game.forSale && game.pickedUp) {
    return next(new Error("A game cannot be 'forSale' and 'pickedUp' at the same time"));
  }
  next();
});
