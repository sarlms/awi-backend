import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importation des modules et schémas
import { ManagerModule } from './manager/manager.module';
import { SessionModule } from './session/session.module';
import { SellerModule } from './seller/seller.module';
import { GameDescriptionModule } from './gameDescription/gameDescription.module';
import { DepositedGameModule } from './depositedGame/depositedGame.module';
import { TransactionModule } from './transaction/transaction.module';
import { ClientModule } from './client/client.module';
import { RefundModule } from './refund/refund.module';
import { DepositFeePaymentModule } from './depositFeePayment/depositFeePayment.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    // Connexion à MongoDB
    MongooseModule.forRoot(process.env.MONGODB_URI),
    
    // Import des modules
    ManagerModule,
    SessionModule,
    SellerModule,
    GameDescriptionModule,
    DepositedGameModule,
    TransactionModule,
    ClientModule,
    RefundModule,
    DepositFeePaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
