import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DepositFeePayment } from '../schemas/depositFeePayment.schema';
import { CreateDepositFeePaymentDto } from './dto/create-depositFeePayment.dto';
import { UpdateDepositFeePaymentDto } from './dto/update-depositFeePayment.dto';

@Injectable()
export class DepositFeePaymentService {

  constructor(@InjectModel(DepositFeePayment.name) private depositFeePaymentModel: Model<DepositFeePayment>) {}

  async create(createDepositFeePaymentDto: CreateDepositFeePaymentDto, managerId: string): Promise<DepositFeePayment> {
    return this.depositFeePaymentModel.create({
      ...createDepositFeePaymentDto,
      managerId: new Types.ObjectId(managerId), // Conversion en ObjectId
    });
  }

  async findBySellerId(sellerId: string): Promise<DepositFeePayment[]> {
    return this.depositFeePaymentModel.find({ sellerId }).exec();
  }

  async findBySellerAndSession(sellerId: string, sessionId: string): Promise<DepositFeePayment[]> {
    return this.depositFeePaymentModel.find({ sellerId, sessionId }).exec();
  }

  async findOne(id: string): Promise<DepositFeePayment> {
    const payment = await this.depositFeePaymentModel.findById(id).exec();
    if (!payment) {
      throw new NotFoundException('DepositFeePayment not found');
    }
    return payment;
  }

  //SARAH : il me manquait des attributs pour récup nom du vendeur etc
  async findAll(): Promise<DepositFeePayment[]> {
    return this.depositFeePaymentModel
    .find()
    .populate([
      { path: 'sellerId', select: 'sellerId name email' },
      { path: 'sessionId', select: 'sessionId name email' },
      { path: 'managerId', select: 'managerId email' },
    ])
    .exec();
  }

  async update(id: string, updateDepositFeePaymentDto: UpdateDepositFeePaymentDto): Promise<DepositFeePayment> {
    const updatedPayment = await this.depositFeePaymentModel.findByIdAndUpdate(id, updateDepositFeePaymentDto, { new: true }).exec();
    if (!updatedPayment) {
      throw new NotFoundException('DepositFeePayment not found');
    }
    return updatedPayment;
  }

  async remove(id: string): Promise<DepositFeePayment> {
    const payment = await this.depositFeePaymentModel.findByIdAndDelete(id).exec();
    if (!payment) {
      throw new NotFoundException('DepositFeePayment not found');
    }
    return payment;
  }
}
