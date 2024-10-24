import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}

  async create(createClientDto: any): Promise<Client> {
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findById(id: string): Promise<Client> {
    return this.clientModel.findById(id).exec();
  }

  async update(id: string, updateClientDto: any): Promise<Client> {
    return this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }
}
