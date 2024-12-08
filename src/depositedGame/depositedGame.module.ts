import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositedGameService } from './depositedGame.service';
import { DepositedGameController } from './depositedGame.controller';
import { DepositedGame, DepositedGameSchema } from '../schemas/depositedGame.schema';
import { SessionModule } from '../session/session.module';
import { Seller, SellerSchema } from '../schemas/seller.schema';
import { GameDescription, GameDescriptionSchema } from '../schemas/gameDescription.schema';
import { SessionService } from 'src/session/session.service';
import { SellerModule } from 'src/seller/seller.module';
import { GameDescriptionModule } from 'src/gameDescription/gameDescription.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DepositedGame.name, schema: DepositedGameSchema },
      { name: Seller.name, schema: SellerSchema },
      { name: GameDescription.name, schema: GameDescriptionSchema },
    ]),
    forwardRef(() => SessionModule),
    SellerModule,  
    GameDescriptionModule,
  ],
  controllers: [DepositedGameController],
  providers: [DepositedGameService, SessionService],
  exports: [DepositedGameService, MongooseModule], // Export si utilisé ailleurs
})
export class DepositedGameModule {}
