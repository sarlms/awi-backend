import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  [x: string]: any;
  @Prop({ required: true, unique: true })  // Unique session name
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  depositFee: number;

  @Prop({ default: 30 })
  depositFeeLimitBeforeDiscount: number;

  @Prop({ required: true })
  depositFeeDiscount: number;

  @Prop({ required: true })
  saleComission: number;

  @Prop({ type: Types.ObjectId, ref: 'Manager', required: true })
  managerId: Types.ObjectId;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

// Middleware to prevent overlapping sessions
SessionSchema.pre('save', async function (next) {
  const session = this as SessionDocument;

  // Utilisation de this.model pour accéder au modèle Mongoose
  const overlappingSession = await this.model('Session').findOne({
    $or: [
      { startDate: { $lt: session.endDate }, endDate: { $gt: session.startDate } }
    ],
  });

  if (overlappingSession) {
    const error = new Error('Session dates overlap with an existing session');
    return next(error);
  }
  next();
});