import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositedGame } from '../schemas/depositedGame.schema';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';
import { Session } from '../schemas/session.schema';
import { Seller } from '../schemas/seller.schema';
import { GameDescription } from '../schemas/gameDescription.schema';

@Injectable()
export class DepositedGameService {
  constructor(
    @InjectModel(DepositedGame.name) private depositedGameModel: Model<DepositedGame>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Seller.name) private sellerModel: Model<Seller>,
    @InjectModel(GameDescription.name) private gameDescriptionModel: Model<GameDescription>,
  ) {}

  // Vérification de l'existence des IDs étrangers
  private async validateForeignKeys(sessionId: string, sellerId: string, gameDescriptionId: string) {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session) throw new NotFoundException('Session not found');

    const seller = await this.sellerModel.findById(sellerId).exec();
    if (!seller) throw new NotFoundException('Seller not found');

    const gameDescription = await this.gameDescriptionModel.findById(gameDescriptionId).exec();
    if (!gameDescription) throw new NotFoundException('GameDescription not found');
  }

  async create(createDepositedGameDto: CreateDepositedGameDto): Promise<DepositedGame> {
    // Valide les clés étrangères avant de créer
    await this.validateForeignKeys(
      createDepositedGameDto.sessionId,
      createDepositedGameDto.sellerId,
      createDepositedGameDto.gameDescriptionId,
    );

    const createdGame = new this.depositedGameModel(createDepositedGameDto);
    return createdGame.save();
  }

  async findAll(): Promise<DepositedGame[]> {
    return this.depositedGameModel.find().exec();
  }

  async findOne(id: string): Promise<DepositedGame> {
    const game = await this.depositedGameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException('Deposited game not found');
    }
    return game;
  }

  async update(id: string, updateDepositedGameDto: UpdateDepositedGameDto): Promise<DepositedGame> {
    // Vérifie les clés étrangères si elles sont présentes dans la mise à jour
    if (updateDepositedGameDto.sessionId || updateDepositedGameDto.sellerId || updateDepositedGameDto.gameDescriptionId) {
      await this.validateForeignKeys(
        updateDepositedGameDto.sessionId ?? id,
        updateDepositedGameDto.sellerId ?? id,
        updateDepositedGameDto.gameDescriptionId ?? id,
      );
    }

    const updatedGame = await this.depositedGameModel.findByIdAndUpdate(id, updateDepositedGameDto, { new: true }).exec();
    if (!updatedGame) {
      throw new NotFoundException('Deposited game not found');
    }
    return updatedGame;
  }

  async remove(id: string): Promise<DepositedGame> {
    const game = await this.depositedGameModel.findByIdAndDelete(id).exec();
    if (!game) {
      throw new NotFoundException('Deposited game not found');
    }
    return game;
  }

  // Set `forSale` to true if not picked up
  async setForSale(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    if (game.pickedUp) {
      throw new ConflictException("Cannot set 'forSale' to true for a game that has been picked up");
    }
    game.forSale = true;
    return game.save();
  }

  // Set `forSale` to false
  async removeFromSale(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    game.forSale = false;
    return game.save();
  }

  // Set `pickedUp` to true and `forSale` to false
  async markAsPickedUp(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    game.forSale = false;
    game.pickedUp = true;
    return game.save();
  }
}
