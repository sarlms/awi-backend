import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Manager {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ lowercase: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: false })
  admin: boolean;
}

export type ManagerDocument = Manager & Document;

export const ManagerSchema = SchemaFactory.createForClass(Manager);
