import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositedGame } from '../schemas/depositedGame.schema';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';

@Injectable()
export class DepositedGameService {
  constructor(@InjectModel(DepositedGame.name) private depositedGameModel: Model<DepositedGame>) {}

  async create(createDepositedGameDto: CreateDepositedGameDto): Promise<DepositedGame> {
    const createdGame = new this.depositedGameModel(createDepositedGameDto);
    return createdGame.save();
  }

  async findOne(id: string): Promise<DepositedGame> {
    return this.depositedGameModel.findById(id).exec();
  }

  async update(id: string, updateDepositedGameDto: UpdateDepositedGameDto): Promise<DepositedGame> {
    return this.depositedGameModel.findByIdAndUpdate(id, updateDepositedGameDto, { new: true }).exec();
  }

  async remove(id: string): Promise<DepositedGame> {
    return this.depositedGameModel.findByIdAndDelete(id).exec();
  }
}
