import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() createSessionDto: any) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  async findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.sessionService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSessionDto: any) {
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sessionService.delete(id);
  }
}
