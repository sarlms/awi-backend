import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Manager, ManagerDocument } from '../schemas/manager.schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ManagerService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {
    this.logger = new Logger(ManagerService.name);
  }

  async findOne(query: FilterQuery<Manager>): Promise<ManagerDocument | null> {
    return await this.managerModel.findOne(query).select('+password');
  }

  async create(manager: Partial<Manager>): Promise<ManagerDocument> {
    this.logger.log('Creating manager.');

    // Hasher le mot de passe avant la création
    const hashedPassword = await this.authService.getHashedPassword(manager.password);
    manager.password = hashedPassword;

    // Créer et sauvegarder un nouveau manager
    const newManager = new this.managerModel(manager);
    return newManager.save();
  }

  async findOneAndUpdate(query: FilterQuery<Manager>, payload: Partial<Manager>): Promise<ManagerDocument | null> {
    this.logger.log('Updating Manager.');
    return this.managerModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }

  async findOneAndDelete(query: FilterQuery<Manager>): Promise<ManagerDocument | null> {
    this.logger.log('Deleting Manager.');
    return this.managerModel.findOneAndDelete(query);
  }
}
