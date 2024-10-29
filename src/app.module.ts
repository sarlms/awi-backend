import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerController } from './manager/manager.controller';
import { ManagerService } from './manager/manager.service';
import { Manager, ManagerSchema } from './schemas/manager.schema';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
    AuthModule,
    ManagerModule,

  ],
  controllers: [
    ManagerController,
    AppController,
  ],
  providers: [
    ManagerService,
    AppService
  ],
})
export class AppModule {}
