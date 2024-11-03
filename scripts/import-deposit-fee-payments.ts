import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DepositFeePaymentService } from '../src/depositFeePayment/depositFeePayment.service';
import { CreateDepositFeePaymentDto } from '../src/depositFeePayment/dto/create-depositFeePayment.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const depositFeePaymentService = app.get(DepositFeePaymentService);

  const results: CreateDepositFeePaymentDto[] = [];

  // Lecture du fichier CSV
  fs.createReadStream('data/deposit_fee_payments.csv')
    .pipe(csv())
    .on('data', (data) => {
      const depositFeePayment: CreateDepositFeePaymentDto = {
        sellerId: data.sellerId,
        sessionId: data.sessionId,
        managerId: data.managerId,
        depositFeePayed: parseFloat(data.depositFeePayed),
        depositDate: new Date(data.depositDate),
      };
      results.push(depositFeePayment);
    })
    .on('end', async () => {
      for (const payment of results) {
        try {
          await depositFeePaymentService.create(payment, payment.managerId.toString());
          console.log(`Added Deposit Fee Payment for seller: ${payment.sellerId}`);
        } catch (error) {
          console.error(`Failed to add Deposit Fee Payment for seller: ${payment.sellerId}`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
