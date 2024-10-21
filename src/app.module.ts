import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGODB_URI);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // autres modules ici...
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}