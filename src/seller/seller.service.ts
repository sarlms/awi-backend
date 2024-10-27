import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from '../schemas/seller.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(@InjectModel(Seller.name) private sellerModel: Model<Seller>) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const createdSeller = new this.sellerModel(createSellerDto);
    return createdSeller.save();
  }

  async findOne(id: string): Promise<Seller> {
    return this.sellerModel.findById(id).exec();
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    return this.sellerModel.findByIdAndUpdate(id, updateSellerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Seller> {
    return this.sellerModel.findByIdAndDelete(id).exec();
  }
}
