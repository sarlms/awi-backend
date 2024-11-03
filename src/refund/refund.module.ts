import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { Refund, RefundSchema } from '../schemas/refund.schema';
import { SellerModule } from '../seller/seller.module';  // Importe SellerModule
import { SessionModule } from '../session/session.module';
import { ManagerModule } from '../manager/manager.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Refund.name, schema: RefundSchema }]),
    SellerModule,  
    SessionModule,
    ManagerModule,
  ],
  controllers: [RefundController],
  providers: [RefundService],
})
export class RefundModule {}
