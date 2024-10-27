import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { Refund, RefundSchema } from '../schemas/refund.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Refund.name, schema: RefundSchema }])],
  controllers: [RefundController],
  providers: [RefundService],
})
export class RefundModule {}
