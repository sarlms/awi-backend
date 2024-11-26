import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  // Helper pour valider les dates
  private validateDates(startDate: Date, endDate: Date): void {
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('La date de fin doit être postérieure à la date de début.');
    }
  }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    // Valide les dates
    this.validateDates(createSessionDto.startDate, createSessionDto.endDate);

    // Vérifie l'unicité du nom de la session
    const existingSession = await this.sessionModel.findOne({ name: createSessionDto.name }).exec();
    if (existingSession) {
      throw new ConflictException('Le nom de session existe déjà.');
    }

    // Vérifie les chevauchements de dates
    const overlappingSession = await this.sessionModel.findOne({
      $or: [
        { startDate: { $lt: createSessionDto.endDate }, endDate: { $gt: createSessionDto.startDate } },
      ],
    }).exec();
    if (overlappingSession) {
      throw new ConflictException('Les dates de session chevauchent une session existante.');
    }

    // Crée la session
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
      throw new NotFoundException('Session non trouvée.');
    }
    return session;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    // Vérifie les dates si elles sont mises à jour
    if (updateSessionDto.startDate && updateSessionDto.endDate) {
      this.validateDates(updateSessionDto.startDate, updateSessionDto.endDate);
    }

    // Vérifie l'unicité du nom de session
    if (updateSessionDto.name) {
      const existingSession = await this.sessionModel.findOne({ name: updateSessionDto.name }).exec();
      if (existingSession && existingSession._id.toString() !== id) {
        throw new ConflictException('Le nom de session existe déjà.');
      }
    }

    // Met à jour la session
    const updatedSession = await this.sessionModel.findByIdAndUpdate(id, updateSessionDto, { new: true }).exec();
    if (!updatedSession) {
      throw new NotFoundException('Session non trouvée.');
    }
    return updatedSession;
  }

  async updateByName(name: string, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const existingSession = await this.findByName(name);
    if (!existingSession) {
      throw new NotFoundException('Session non trouvée.');
    }

    // Vérifie les dates si elles sont mises à jour
    if (updateSessionDto.startDate && updateSessionDto.endDate) {
      this.validateDates(updateSessionDto.startDate, updateSessionDto.endDate);
    }

    // Met à jour la session
    const updatedSession = await this.sessionModel.findOneAndUpdate(
      { name },
      updateSessionDto,
      { new: true },
    ).exec();

    if (!updatedSession) {
      throw new NotFoundException('Session non trouvée.');
    }

    return updatedSession;
  }

  async remove(id: string): Promise<Session> {
    const deletedSession = await this.sessionModel.findByIdAndDelete(id).exec();
    if (!deletedSession) {
      throw new NotFoundException('Session non trouvée.');
    }
    return deletedSession;
  }

  async removeByName(name: string): Promise<Session> {
    const deletedSession = await this.sessionModel.findOneAndDelete({ name }).exec();
    if (!deletedSession) {
      throw new NotFoundException('Session non trouvée.');
    }
    return deletedSession;
  }
}
