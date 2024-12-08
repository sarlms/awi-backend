//depositedGame.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositedGameService } from './depositedGame.service';
import { DepositedGameController } from './depositedGame.controller';
import { DepositedGame, DepositedGameSchema } from '../schemas/depositedGame.schema';
import { SessionModule } from '../session/session.module';
import { SellerModule } from '../seller/seller.module';
import { GameDescriptionModule } from '../gameDescription/gameDescription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DepositedGame.name, schema: DepositedGameSchema }]),
    forwardRef(() => SessionModule), // Evite les dépendances circulaires
    SellerModule,
    GameDescriptionModule,
  ],
  controllers: [DepositedGameController],
  providers: [DepositedGameService],
  exports: [DepositedGameService, MongooseModule],
})
export class DepositedGameModule {}
