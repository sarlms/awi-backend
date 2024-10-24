import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManagerDocument = Manager & Document;

@Schema()
export class Manager {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop({ default: false })
  admin: boolean;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
