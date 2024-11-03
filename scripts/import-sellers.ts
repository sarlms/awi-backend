import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SellerService } from '../src/seller/seller.service';
import { CreateSellerDto } from '../src/seller/dto/create-seller.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sellerService = app.get(SellerService);

  const results: CreateSellerDto[] = [];

  // Lecture du fichier CSV
  fs.createReadStream('data/sellers_catalog.csv')
    .pipe(csv())
    .on('data', (data) => {
      const seller: CreateSellerDto = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        amountOwed: parseFloat(data.amountOwed) || 0, // Par défaut, `amountOwed` est zéro
      };
      results.push(seller);
    })
    .on('end', async () => {
      for (const seller of results) {
        try {
          await sellerService.create(seller);
          console.log(`Added: ${seller.name}`);
        } catch (error) {
          console.error(`Failed to add ${seller.name}:`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
