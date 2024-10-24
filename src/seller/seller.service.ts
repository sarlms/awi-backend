import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from './seller.schema';

@Injectable()
export class SellerService {
  constructor(@InjectModel(Seller.name) private sellerModel: Model<SellerDocument>) {}

  async create(createSellerDto: any): Promise<Seller> {
    const createdSeller = new this.sellerModel(createSellerDto);
    return createdSeller.save();
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  async findById(id: string): Promise<Seller> {
    return this.sellerModel.findById(id).exec();
  }

  async update(id: string, updateSellerDto: any): Promise<Seller> {
    return this.sellerModel.findByIdAndUpdate(id, updateSellerDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.sellerModel.findByIdAndDelete(id).exec();
  }
}
