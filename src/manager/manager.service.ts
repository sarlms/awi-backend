import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager, ManagerDocument } from './manager.schema';

@Injectable()
export class ManagerService {
  constructor(@InjectModel(Manager.name) private managerModel: Model<ManagerDocument>) {}

  async create(createManagerDto: any): Promise<Manager> {
    const createdManager = new this.managerModel(createManagerDto);
    return createdManager.save();
  }

  async findAll(): Promise<Manager[]> {
    return this.managerModel.find().exec();
  }

  async findById(id: string): Promise<Manager> {
    return this.managerModel.findById(id).exec();
  }

  async update(id: string, updateManagerDto: any): Promise<Manager> {
    return this.managerModel.findByIdAndUpdate(id, updateManagerDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.managerModel.findByIdAndDelete(id).exec();
  }
}
