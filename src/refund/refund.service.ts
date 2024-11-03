import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Refund } from '../schemas/refund.schema';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { Seller } from '../schemas/seller.schema';
import { Session } from '../schemas/session.schema';
import { Manager } from '../schemas/manager.schema';


@Injectable()
export class RefundService {
  constructor(
    @InjectModel(Refund.name) private refundModel: Model<Refund>,
    @InjectModel(Seller.name) private sellerModel: Model<Seller>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Manager.name) private managerModel: Model<Manager>,
  ) {}

  private async validateForeignKeys(sellerId: Types.ObjectId | string, sessionId: Types.ObjectId | string, managerId: Types.ObjectId | string): Promise<void> {
    const sellerIdStr = typeof sellerId === 'string' ? sellerId : sellerId.toString();
    const sessionIdStr = typeof sessionId === 'string' ? sessionId : sessionId.toString();
    const managerIdStr = typeof managerId === 'string' ? managerId : managerId.toString();
  
    const seller = await this.sellerModel.findById(sellerIdStr).exec();
    if (!seller) throw new NotFoundException('Seller not found');
  
    const session = await this.sessionModel.findById(sessionIdStr).exec();
    if (!session) throw new NotFoundException('Session not found');
  
    const manager = await this.managerModel.findById(managerIdStr).exec();
    if (!manager) throw new NotFoundException('Manager not found');
  }

async create(createRefundDto: CreateRefundDto, managerId: string): Promise<Refund> {
    // Convertit les IDs en ObjectId si ce sont des chaînes de caractères
    const sellerId = typeof createRefundDto.sellerId === 'string' ? new Types.ObjectId(createRefundDto.sellerId) : createRefundDto.sellerId;
    const sessionId = typeof createRefundDto.sessionId === 'string' ? new Types.ObjectId(createRefundDto.sessionId) : createRefundDto.sessionId;
    const managerObjectId = typeof managerId === 'string' ? new Types.ObjectId(managerId) : managerId;

    // Crée le remboursement avec les ObjectId
    return this.refundModel.create({
      ...createRefundDto,
      sellerId,
      sessionId,
      managerId: managerObjectId,
    });
  }

  // Méthode de mise à jour avec validation des clés étrangères
  async update(id: string, updateRefundDto: UpdateRefundDto): Promise<Refund> {
    // Valide les clés étrangères uniquement si elles sont présentes dans la mise à jour
    if (updateRefundDto.sellerId || updateRefundDto.sessionId || updateRefundDto.managerId) {
      await this.validateForeignKeys(
        updateRefundDto.sellerId ?? id,
        updateRefundDto.sessionId ?? id,
        updateRefundDto.managerId ?? id,
      );
    }

    const updatedRefund = await this.refundModel.findByIdAndUpdate(id, updateRefundDto, { new: true }).exec();
    if (!updatedRefund) {
      throw new NotFoundException('Refund not found');
    }
    return updatedRefund;
  }

  async findAll(): Promise<Refund[]> {
    return this.refundModel.find().exec();
  }

  async findBySellerId(sellerId: string): Promise<Refund[]> {
    return this.refundModel.find({ sellerId }).exec();
  }

  async findBySellerAndSession(sellerId: string, sessionId: string): Promise<Refund[]> {
    return this.refundModel.find({ sellerId, sessionId }).exec();
  }

  async findOne(id: string): Promise<Refund> {
    const refund = await this.refundModel.findById(id).exec();
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }
    return refund;
  }

  async remove(id: string): Promise<Refund> {
    const refund = await this.refundModel.findByIdAndDelete(id).exec();
    if (!refund) {
      throw new NotFoundException('Refund not found');
    }
    return refund;
  }
}
