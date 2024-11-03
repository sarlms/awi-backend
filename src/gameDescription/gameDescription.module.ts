import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameDescriptionService } from './gameDescription.service';
import { GameDescriptionController } from './gameDescription.controller';
import { GameDescription, GameDescriptionSchema } from '../schemas/gameDescription.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: GameDescription.name, schema: GameDescriptionSchema }])],
  controllers: [GameDescriptionController],
  providers: [GameDescriptionService],
  exports: [MongooseModule],
})
export class GameDescriptionModule {}
