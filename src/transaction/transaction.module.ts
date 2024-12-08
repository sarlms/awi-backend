import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';
import { SellerModule } from '../seller/seller.module';
import { SessionModule } from '../session/session.module';
import { ManagerModule } from '../manager/manager.module';
import { DepositedGameModule } from '../depositedGame/depositedGame.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    SellerModule,
    SessionModule,
    ManagerModule,
    DepositedGameModule, 
    ClientModule
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
