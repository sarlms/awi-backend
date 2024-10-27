import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { SessionModule } from './session/session.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase'),
    ClientModule,
    SessionModule,
    SellerModule,
  ],
})
export class AppModule {}
