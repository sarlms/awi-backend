import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { Item, ItemSchema } from './item/item.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [AppController, ItemController],
  providers: [AppService, ItemService],
})
export class AppModule {}
