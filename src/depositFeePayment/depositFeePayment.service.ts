import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositFeePayment } from '../schemas/depositFeePayment.schema';
import { CreateDepositFeePaymentDto } from './dto/create-depositFeePayment.dto';
import { UpdateDepositFeePaymentDto } from './dto/update-depositFeePayment.dto';

@Injectable()
export class DepositFeePaymentService {
  constructor(@InjectModel(DepositFeePayment.name) private depositFeePaymentModel: Model<DepositFeePayment>) {}

  async create(createDepositFeePaymentDto: CreateDepositFeePaymentDto): Promise<DepositFeePayment> {
    const createdPayment = new this.depositFeePaymentModel(createDepositFeePaymentDto);
    return createdPayment.save();
  }

  async findOne(id: string): Promise<DepositFeePayment> {
    return this.depositFeePaymentModel.findById(id).exec();
  }

  async update(id: string, updateDepositFeePaymentDto: UpdateDepositFeePaymentDto): Promise<DepositFeePayment> {
    return this.depositFeePaymentModel.findByIdAndUpdate(id, updateDepositFeePaymentDto, { new: true }).exec();
  }

  async remove(id: string): Promise<DepositFeePayment> {
    return this.depositFeePaymentModel.findByIdAndDelete(id).exec();
  }
}
