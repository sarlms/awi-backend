import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guards';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
