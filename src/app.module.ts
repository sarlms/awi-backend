import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerController } from './manager/manager.controller';
import { ManagerService } from './manager/manager.service';
import { Manager, ManagerSchema } from './schemas/manager.schema';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),

  ],
  controllers: [
    ManagerController,

  ],
  providers: [
    ManagerService,
  ],
})
export class AppModule {}
