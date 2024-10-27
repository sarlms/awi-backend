import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Refund } from '../schemas/refund.schema';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';

@Injectable()
export class RefundService {
  constructor(@InjectModel(Refund.name) private refundModel: Model<Refund>) {}

  async create(createRefundDto: CreateRefundDto): Promise<Refund> {
    const createdRefund = new this.refundModel(createRefundDto);
    return createdRefund.save();
  }

  async findOne(id: string): Promise<Refund> {
    return this.refundModel.findById(id).exec();
  }

  async update(id: string, updateRefundDto: UpdateRefundDto): Promise<Refund> {
    return this.refundModel.findByIdAndUpdate(id, updateRefundDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Refund> {
    return this.refundModel.findByIdAndDelete(id).exec();
  }
}
