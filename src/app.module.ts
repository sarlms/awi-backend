import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { Item, ItemSchema } from './item/item.schema';
import { ManagerController } from './manager/manager.controller';
import { ManagerService } from './manager/manager.service';
import { Manager, ManagerSchema } from './manager/manager.schema';
import { SellerController } from './seller/seller.controller';
import { SellerService } from './seller/seller.service';
import { Seller, SellerSchema } from './seller/seller.schema';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { Client, ClientSchema } from './client/client.schema';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { Session, SessionSchema } from './session/session.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),  // Ajout du modèle Session
  ],
  controllers: [
    AppController,
    ItemController,
    ManagerController,
    SellerController,
    ClientController,
    SessionController,  // Ajout du contrôleur Session
  ],
  providers: [
    AppService,
    ItemService,
    ManagerService,
    SellerService,
    ClientService,
    SessionService,  // Ajout du service Session
  ],
})
export class AppModule {}
