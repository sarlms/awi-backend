import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SessionService } from '../src/session/session.service';
import { CreateSessionDto } from '../src/session/dto/create-session.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sessionService = app.get(SessionService);

  const results: CreateSessionDto[] = [];

  // Lecture du fichier CSV
  fs.createReadStream('data/sessions_catalog.csv')
    .pipe(csv())
    .on('data', (data) => {
      const session: CreateSessionDto = {
        name: data.name,
        location: data.location,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        depositFee: parseFloat(data.depositFee),
        depositFeeLimitBeforeDiscount: parseFloat(data.depositFeeLimitBeforeDiscount),
        depositFeeDiscount: parseFloat(data.depositFeeDiscount),
        saleComission: parseFloat(data.saleComission),
        managerId: data.managerId,
      };
      results.push(session);
    })
    .on('end', async () => {
      for (const session of results) {
        try {
          await sessionService.create(session);
          console.log(`Added: ${session.name}`);
        } catch (error) {
          console.error(`Failed to add ${session.name}:`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
