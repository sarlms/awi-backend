import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;
  // la date est de type Date, format ISO : YYYY-MM-DDTHH:MM:SSZ
  //Exemple : 2024-10-24T14:30:00Z (24 octobre 2024 à 14h30 UTC)
  //T sert de séparateur entre la date et l'heure
  //Z signifie qu'on est bien en UTC (universal time convention)


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
