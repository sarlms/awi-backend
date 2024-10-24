import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManagerDocument = Manager & Document;

@Schema()
export class Manager {
  @Prop({ required: true, unique: true })
  managerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({required: true, default: false })
  admin: boolean;
}

export const ManagerSchema = SchemaFactory.createForClass(Manager);
