import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { RefundService } from '../src/refund/refund.service';
import { CreateRefundDto } from '../src/refund/dto/create-refund.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const refundService = app.get(RefundService);

  const results: CreateRefundDto[] = [];

  // Lecture du fichier CSV
  fs.createReadStream('data/refunds.csv')
    .pipe(csv())
    .on('data', (data) => {
      const refund: CreateRefundDto = {
        sellerId: data.sellerId,
        sessionId: data.sessionId,
        managerId: data.managerId,
        refundAmount: parseFloat(data.refundAmount),
        refundDate: new Date(data.refundDate),
      };
      results.push(refund);
    })
    .on('end', async () => {
      for (const refund of results) {
        try {
          await refundService.create(refund, refund.managerId.toString());
          console.log(`Added Refund for seller: ${refund.sellerId}`);
        } catch (error) {
          console.error(`Failed to add Refund for seller: ${refund.sellerId}`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
