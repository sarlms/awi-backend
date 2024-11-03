import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    // Check for unique name
    const existingSession = await this.sessionModel.findOne({ name: createSessionDto.name }).exec();
    if (existingSession) {
      throw new ConflictException('Session name already exists');
    }
    // Check for overlapping dates
    const overlappingSession = await this.sessionModel.findOne({
      $or: [
        { startDate: { $lt: createSessionDto.endDate }, endDate: { $gt: createSessionDto.startDate } }
      ],
    }).exec();
    if (overlappingSession) {
      throw new ConflictException('Session dates overlap with an existing session');
    }
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Session> {
    const session = await this.sessionModel.findOne({ name }).exec();
    if (!session) {
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    // Verify dates and unique name
    if (updateSessionDto.name) {
      const existingSession = await this.sessionModel.findOne({ name: updateSessionDto.name }).exec();
      if (existingSession && existingSession._id.toString() !== id) {
        throw new ConflictException('Session name already exists');
      }
    }
    const updatedSession = await this.sessionModel.findByIdAndUpdate(id, updateSessionDto, { new: true }).exec();
    if (!updatedSession) {
      throw new NotFoundException('Session not found');
    }
    return updatedSession;
  }

  async updateByName(name: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const existingSession = await this.findByName(name);
    if (!existingSession) {
      throw new NotFoundException('Session not found');
    }

    // Use findOneAndUpdate to apply updates directly
    const updatedSession = await this.sessionModel.findOneAndUpdate(
      { name },
      updateSessionDto,
      { new: true }
    ).exec();

    if (!updatedSession) {
      throw new NotFoundException('Session not found');
    }

    return updatedSession;
  }

  async remove(id: string): Promise<Session> {
    const deletedSession = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!deletedSession) {
      throw new NotFoundException('Session not found');
    }
    return deletedSession;
  }

  async removeByName(name: string): Promise<Session> {
    const deletedSession = await this.sessionModel.findOneAndDelete({ name }).exec();
    if (!deletedSession) {
      throw new NotFoundException('Session not found');
    }
    return deletedSession;
  }
}
