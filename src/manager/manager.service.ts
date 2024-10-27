import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from '../schemas/manager.schema';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(@InjectModel(Manager.name) private managerModel: Model<Manager>) {}

  async create(createManagerDto: CreateManagerDto): Promise<Manager> {
    const createdManager = new this.managerModel(createManagerDto);
    return createdManager.save();
  }

  async findOne(id: string): Promise<Manager> {
    return this.managerModel.findById(id).exec();
  }

  async update(id: string, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    return this.managerModel.findByIdAndUpdate(id, updateManagerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Manager> {
    return this.managerModel.findByIdAndDelete(id).exec();
  }
}
