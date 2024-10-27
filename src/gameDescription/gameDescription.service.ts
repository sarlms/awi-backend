import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDescription } from '../schemas/gameDescription.schema';
import { CreateGameDescriptionDto } from './dto/create-gameDescription.dto';
import { UpdateGameDescriptionDto } from './dto/update-gameDescription.dto';

@Injectable()
export class GameDescriptionService {
  constructor(@InjectModel(GameDescription.name) private gameDescriptionModel: Model<GameDescription>) {}

  async create(createGameDescriptionDto: CreateGameDescriptionDto): Promise<GameDescription> {
    const createdGameDescription = new this.gameDescriptionModel(createGameDescriptionDto);
    return createdGameDescription.save();
  }

  async findOne(id: string): Promise<GameDescription> {
    return this.gameDescriptionModel.findById(id).exec();
  }

  async update(id: string, updateGameDescriptionDto: UpdateGameDescriptionDto): Promise<GameDescription> {
    return this.gameDescriptionModel.findByIdAndUpdate(id, updateGameDescriptionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<GameDescription> {
    return this.gameDescriptionModel.findByIdAndDelete(id).exec();
  }
}
