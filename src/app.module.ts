import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { Item, ItemSchema } from './item/item.schema';
import { ManagerController } from './manager/manager.controller';
import { ManagerService } from './manager/manager.service';
import { Manager, ManagerSchema } from './manager/manager.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]), // Ajout du modèle Manager
  ],
  controllers: [AppController, ItemController, ManagerController], // Ajout du contrôleur Manager
  providers: [AppService, ItemService, ManagerService], // Ajout du service Manager
})
export class AppModule {}
