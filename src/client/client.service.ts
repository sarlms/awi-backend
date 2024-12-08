import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findOne(id: string): Promise<Client> {
    return this.clientModel.findById(id).exec();
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    if (updateClientDto.email) {
      const emailExists = await this.clientModel.findOne({ email: updateClientDto.email, _id: { $ne: id } }).exec();
      if (emailExists) {
        throw new ConflictException('Cet email est déjà pris.');
      }
    }
  
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Client> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec(); // Récupère tous les documents dans la collection "clients"
  }
  
}
