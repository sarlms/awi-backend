import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { Seller, SellerSchema } from '../schemas/seller.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }])],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [MongooseModule],
})
export class SellerModule {}
