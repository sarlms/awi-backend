import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DepositedGameService } from '../src/depositedGame/depositedGame.service';
import { CreateDepositedGameDto } from '../src/depositedGame/dto/create-depositedGame.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const depositedGameService = app.get(DepositedGameService);

  const results: CreateDepositedGameDto[] = [];

  // Lecture du fichier CSV
  fs.createReadStream('data/deposited_games_catalog.csv')
    .pipe(csv())
    .on('data', (data) => {
      const depositedGame: CreateDepositedGameDto = {
        salePrice: parseFloat(data.salePrice),
        sold: data.sold === 'true',
        forSale: data.forSale === 'true',
        pickedUp: data.pickedUp === 'true',
        sessionId: data.sessionId,
        sellerId: data.sellerId,
        gameDescriptionId: data.gameDescriptionId,
      };
      results.push(depositedGame);
    })
    .on('end', async () => {
      for (const depositedGame of results) {
        try {
          await depositedGameService.create(depositedGame);
          console.log(`Added Deposited Game: ${depositedGame.salePrice}`);
        } catch (error) {
          console.error(`Failed to add Deposited Game with price ${depositedGame.salePrice}:`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
