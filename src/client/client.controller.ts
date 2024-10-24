import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: any) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.clientService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: any) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
