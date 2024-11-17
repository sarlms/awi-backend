import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositedGameService } from './depositedGame.service';
import { DepositedGameController } from './depositedGame.controller';
import { DepositedGame, DepositedGameSchema } from '../schemas/depositedGame.schema';
import { SessionModule } from '../session/session.module';  // Importe le module des sessions
import { SellerModule } from '../seller/seller.module';
import { GameDescriptionModule } from '../gameDescription/gameDescription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DepositedGame.name, schema: DepositedGameSchema }]),
    SessionModule,  // Ajout de SessionModule pour les dépendances
    SellerModule,
    GameDescriptionModule,
  ],
  controllers: [DepositedGameController],
  providers: [DepositedGameService],
  exports: [MongooseModule],
})
export class DepositedGameModule {}
