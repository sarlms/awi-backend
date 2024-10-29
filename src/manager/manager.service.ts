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
    @Inject(forwardRef(() => AuthService)) // Use forwardRef to avoid circular dependency
    private authService: AuthService
  ) {
    this.logger = new Logger(ManagerService.name); // Initializes a logger for ManagerService
  }

  // Finds a single manager based on a given query
  async findOne(query: FilterQuery<Manager>): Promise<ManagerDocument | null> {
    return await this.managerModel.findOne(query).select('+password'); // Selects password explicitly if needed
  }

  // Creates a new manager with a hashed password
  async create(manager: Partial<Manager>): Promise<ManagerDocument> {
    this.logger.log('Creating manager.');

    // Hash the password before saving the manager
    const hashedPassword = await this.authService.getHashedPassword(manager.password);
    manager.password = hashedPassword;

    // Create and save the new manager
    const newManager = new this.managerModel(manager);
    return newManager.save();
  }

  // Finds a manager and updates them with new information
  async findOneAndUpdate(query: FilterQuery<Manager>, payload: Partial<Manager>): Promise<ManagerDocument | null> {
    this.logger.log('Updating Manager.');
    return this.managerModel.findOneAndUpdate(query, payload, {
      new: true, // Returns the modified document
      upsert: true, // Creates a new document if no match is found
    });
  }

  // Finds a manager and deletes them
  async findOneAndDelete(query: FilterQuery<Manager>): Promise<ManagerDocument | null> {
    this.logger.log('Deleting Manager.');
    return this.managerModel.findOneAndDelete(query);
  }
}
