import * as fs from 'fs';
import * as csv from 'csv-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { GameDescriptionService } from '../src/gameDescription/gameDescription.service';
import { CreateGameDescriptionDto, AgeRange } from '../src/gameDescription/dto/create-gameDescription.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const gameDescriptionService = app.get(GameDescriptionService);
  
  const results: CreateGameDescriptionDto[] = [];

  fs.createReadStream('data/games_catalog.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (!data.photoURL.match(/\.(jpg|png)$/)) {
        console.error(`Invalid image format for ${data.name}. Only .jpg and .png are allowed.`);
        return;
      }
      
      const ageRangeValue = data.ageRange.trim();
      if (!Object.values(AgeRange).includes(ageRangeValue as AgeRange)) {
        console.error(`Invalid age range for ${data.name}: ${data.ageRange}`);
        return;
      }

      const gameDescription: CreateGameDescriptionDto = {
        name: data.name,
        publisher: data.publisher,
        description: data.description,
        photoURL: data.photoURL,
        minPlayers: parseInt(data.minPlayers, 10),
        maxPlayers: parseInt(data.maxPlayers, 10),
        ageRange: ageRangeValue,
      };
      results.push(gameDescription);
    })
    .on('end', async () => {
      for (const gameDescription of results) {
        try {
          await gameDescriptionService.create(gameDescription);
          console.log(`Added: ${gameDescription.name}`);
        } catch (error) {
          console.error(`Failed to add ${gameDescription.name}:`, error.message);
        }
      }
      await app.close();
    });
}

bootstrap();
