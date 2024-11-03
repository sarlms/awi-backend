import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDescription } from '../schemas/gameDescription.schema';
import { CreateGameDescriptionDto } from './dto/create-gameDescription.dto';
import { UpdateGameDescriptionDto } from './dto/update-gameDescription.dto';
import { AgeRange } from './dto/create-gameDescription.dto';

@Injectable()
export class GameDescriptionService {
  constructor(@InjectModel(GameDescription.name) private gameDescriptionModel: Model<GameDescription>) {}

  async create(createGameDescriptionDto: CreateGameDescriptionDto): Promise<GameDescription> {
    const { name, minPlayers, maxPlayers, ageRange } = createGameDescriptionDto;

    // Vérification de l'unicité du nom
    const existingGame = await this.gameDescriptionModel.findOne({ name }).exec();
    if (existingGame) {
      throw new ConflictException('A game with this name already exists');
    }

    // Vérification que minPlayers <= maxPlayers
    if (minPlayers > maxPlayers) {
      throw new BadRequestException('minPlayers must be less than or equal to maxPlayers');
    }

    // Vérification que ageRange est dans l'énumération
    if (!Object.values(AgeRange).includes(ageRange)) {
      throw new BadRequestException(`Invalid age range: ${ageRange}`);
    }

    const createdGameDescription = new this.gameDescriptionModel(createGameDescriptionDto);
    return createdGameDescription.save();
  }

  async findOne(id: string): Promise<GameDescription> {
    const game = await this.gameDescriptionModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async findByName(name: string): Promise<GameDescription> {
    const game = await this.gameDescriptionModel.findOne({ name }).exec();
    if (!game) {
      throw new NotFoundException(`Game with name ${name} not found`);
    }
    return game;
  }

  async findAll(): Promise<GameDescription[]> {
    return this.gameDescriptionModel.find().exec();
  }

  async update(id: string, updateGameDescriptionDto: UpdateGameDescriptionDto): Promise<GameDescription> {
    const { minPlayers, maxPlayers, ageRange } = updateGameDescriptionDto;

    // Vérification que minPlayers <= maxPlayers lors de la mise à jour
    if (minPlayers && maxPlayers && minPlayers > maxPlayers) {
      throw new BadRequestException('minPlayers must be less than or equal to maxPlayers');
    }

    // Vérification que ageRange est valide
    if (ageRange && !Object.values(AgeRange).includes(ageRange)) {
      throw new BadRequestException(`Invalid age range: ${ageRange}`);
    }

    return this.gameDescriptionModel.findByIdAndUpdate(id, updateGameDescriptionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<GameDescription> {
    return this.gameDescriptionModel.findByIdAndDelete(id).exec();
  }
}
