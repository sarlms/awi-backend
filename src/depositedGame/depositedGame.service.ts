import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  private async validateForeignKeys(
    sessionId: string | Types.ObjectId,
    sellerId: string | Types.ObjectId,
    gameDescriptionId: string | Types.ObjectId,
  ) {
    const sessionObjectId = typeof sessionId === 'string' ? new Types.ObjectId(sessionId) : sessionId;
    const sellerObjectId = typeof sellerId === 'string' ? new Types.ObjectId(sellerId) : sellerId;
    const gameDescriptionObjectId = typeof gameDescriptionId === 'string' ? new Types.ObjectId(gameDescriptionId) : gameDescriptionId;

    const session = await this.sessionModel.findById(sessionObjectId).exec();
    if (!session) throw new NotFoundException('Session not found');

    const seller = await this.sellerModel.findById(sellerObjectId).exec();
    if (!seller) throw new NotFoundException('Seller not found');

    const gameDescription = await this.gameDescriptionModel.findById(gameDescriptionObjectId).exec();
    if (!gameDescription) throw new NotFoundException('GameDescription not found');
  }

  async create(createDepositedGameDto: CreateDepositedGameDto): Promise<DepositedGame> {
    await this.validateForeignKeys(
      createDepositedGameDto.sessionId,
      createDepositedGameDto.sellerId,
      createDepositedGameDto.gameDescriptionId,
    );

    return this.depositedGameModel.create(createDepositedGameDto);
  }

  async findAll(): Promise<DepositedGame[]> {
    return this.depositedGameModel
      .find()
      .populate('gameDescriptionId', 'name publisher photoURL description minPlayers maxPlayers ageRange') // Inclut tous les champs nécessaires
      .populate('sessionId', 'name')
      .populate('sellerId', 'name email') // Inclut le nom du vendeur
      .exec();
  }

  async findBySellerId(sellerId: string): Promise<DepositedGame[]> {
    return this.depositedGameModel
      .find({ sellerId: new Types.ObjectId(sellerId) })
      .populate('gameDescriptionId', 'name publisher photoURL description minPlayers maxPlayers ageRange') // Inclut tous les champs nécessaires
      .populate('sellerId', 'name email') // Inclut le nom du vendeur
      .exec();
  }

  async findBySellerAndSession(sellerId: string, sessionId: string): Promise<DepositedGame[]> {
    return this.depositedGameModel
      .find({
        sellerId: new Types.ObjectId(sellerId),
        sessionId: new Types.ObjectId(sessionId),
      })
      .populate('gameDescriptionId', 'name publisher photoURL description minPlayers maxPlayers ageRange') // Inclut tous les champs nécessaires
      .populate('sellerId', 'name email') // Inclut le nom du vendeur
      .exec();
  }

  async findOne(id: string): Promise<DepositedGame> {
    const game = await this.depositedGameModel
      .findById(id)
      .populate('gameDescriptionId', 'name publisher photoURL description minPlayers maxPlayers ageRange') // Inclut tous les champs nécessaires
      .populate('sessionId', '_id name')
      .populate('sellerId', '_id name email') // Inclut le nom et l'email du vendeur
      .exec();

    if (!game) {
      throw new NotFoundException('Deposited game not found');
    }

    console.log('Seller details:', game.sellerId); // Vérifiez si les détails du vendeur sont récupérés
    return game;
  }

  async update(id: string, updateDepositedGameDto: UpdateDepositedGameDto): Promise<DepositedGame> {
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

  async setForSale(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    if (game.pickedUp) {
      throw new ConflictException("Cannot set 'forSale' to true for a game that has been picked up");
    }
    game.forSale = true;
    return game.save();
  }

  async removeFromSale(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    game.forSale = false;
    return game.save();
  }

  async markAsPickedUp(id: string): Promise<DepositedGame> {
    const game = await this.findOne(id);
    game.forSale = false;
    game.pickedUp = true;
    return game.save();
  }
}
