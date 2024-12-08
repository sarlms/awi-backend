//src/transaction/transaction.service.ts :
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { DepositedGame, DepositedGameDocument } from '../schemas/depositedGame.schema';
import { Seller, SellerDocument } from '../schemas/seller.schema';
import { Session, SessionDocument } from '../schemas/session.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Seller.name) private readonly sellerModel: Model<SellerDocument>,
    @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>,
    @InjectModel(DepositedGame.name) private readonly depositedGameModel: Model<DepositedGameDocument>,

  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, managerId: string): Promise<Transaction> {
    const { labelId, sessionId, sellerId } = createTransactionDto;

    // Vérification du jeu déposé
    const depositedGame = await this.depositedGameModel.findById(labelId);
    if (!depositedGame) {
      throw new NotFoundException('Deposited game not found');
    }
    if (!depositedGame.forSale) {
      throw new BadRequestException('Deposited game is not for sale');
    }

    // Mise à jour des états du jeu déposé
    depositedGame.forSale = false;
    depositedGame.sold = true;
    await depositedGame.save();

    // Récupération de la session pour accéder à `saleComission`
    const session = await this.sessionModel.findById(depositedGame.sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const saleCommission = session.saleComission;

    // Mise à jour du montant dû au vendeur
    const seller = await this.sellerModel.findById(sellerId);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    const salePrice = depositedGame.salePrice;
    const amountToAdd = salePrice - salePrice * saleCommission;
    seller.amountOwed += amountToAdd;
    await seller.save();

    // Création de la transaction
    const transaction = new this.transactionModel({
      ...createTransactionDto,
      managerId,
      transactionDate: new Date(),
    });
    return transaction.save();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel
      .find()
      .populate([
        { path: 'labelId', populate: { path: 'gameDescriptionId', select: 'name' } }, // Populate imbriqué
        { path: 'sessionId', select: 'name' },
        { path: 'sellerId', select: 'name' },
        { path: 'clientId', select: 'name' },
        { path: 'managerId', select: 'firstName lastName' },
      ])
      .exec();
  }
  
  
  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionModel.findByIdAndUpdate(id, updateTransactionDto, { new: true }).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async remove(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findByIdAndDelete(id).exec();
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async createMultipleTransactions(
    transactions: { labelId: string; sessionId: string; sellerId: string; clientId: string }[],
    managerId: string,
  ): Promise<Transaction[]> {
    const createdTransactions: Transaction[] = [];
  
    for (const transactionData of transactions) {
      const depositedGame = await this.depositedGameModel.findById(transactionData.labelId);
      if (!depositedGame) {
        throw new NotFoundException(`Deposited game with ID ${transactionData.labelId} not found`);
      }
      if (!depositedGame.forSale) {
        throw new BadRequestException(`Game with ID ${transactionData.labelId} is not for sale`);
      }
  
      // Marquer le jeu comme vendu
      depositedGame.forSale = false;
      depositedGame.sold = true;
      await depositedGame.save();
  
      // Récupérer la session et le vendeur
      const session = await this.sessionModel.findById(transactionData.sessionId);
      const seller = await this.sellerModel.findById(transactionData.sellerId);
  
      if (!session || !seller) {
        throw new NotFoundException('Session or Seller not found');
      }
  
      // Calculer et ajouter le montant dû au vendeur
      const saleCommission = session.saleComission;
      const amountToAdd = depositedGame.salePrice - depositedGame.salePrice * saleCommission;
      seller.amountOwed += amountToAdd;
      await seller.save();
  
      // Créer la transaction
      const transaction = new this.transactionModel({
        ...transactionData,
        managerId,
        transactionDate: new Date(),
      });
      const savedTransaction = await transaction.save();
      createdTransactions.push(savedTransaction);
    }
  
    return createdTransactions;
  }
  
}
