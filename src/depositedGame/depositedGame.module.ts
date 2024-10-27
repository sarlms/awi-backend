import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositedGameService } from './depositedGame.service';
import { DepositedGameController } from './depositedGame.controller';
import { DepositedGame, DepositedGameSchema } from '../schemas/depositedGame.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DepositedGame.name, schema: DepositedGameSchema }])],
  controllers: [DepositedGameController],
  providers: [DepositedGameService],
})
export class DepositedGameModule {}
