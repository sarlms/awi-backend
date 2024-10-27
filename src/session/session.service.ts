import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec();
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(id, updateSessionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Session> {
    return this.sessionModel.findByIdAndDelete(id).exec();
  }
}
