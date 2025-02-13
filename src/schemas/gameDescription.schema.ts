import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AgeRange } from '../gameDescription/dto/create-gameDescription.dto';

@Schema()
export class GameDescription extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({ required: true })
  minPlayers: number;

  @Prop({ required: true })
  maxPlayers: number;

  @Prop({ required: true, enum: AgeRange })
  ageRange: AgeRange;
}

export const GameDescriptionSchema = SchemaFactory.createForClass(GameDescription);
