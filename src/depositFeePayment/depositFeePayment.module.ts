import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositFeePaymentService } from './depositFeePayment.service';
import { DepositFeePaymentController } from './depositFeePayment.controller';
import { DepositFeePayment, DepositFeePaymentSchema } from '../schemas/depositFeePayment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DepositFeePayment.name, schema: DepositFeePaymentSchema }])],
  controllers: [DepositFeePaymentController],
  providers: [DepositFeePaymentService],
})
export class DepositFeePaymentModule {}
