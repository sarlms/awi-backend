import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.schema';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  async create(createSessionDto: any): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findById(id: string): Promise<Session> {
    return this.sessionModel.findById(id).populate('managerId').exec(); // Populate pour récupérer les détails du manager
  }

  async update(id: string, updateSessionDto: any): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(id, updateSessionDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.sessionModel.findByIdAndDelete(id).exec();
  }
}
