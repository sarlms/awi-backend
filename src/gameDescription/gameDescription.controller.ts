import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GameDescriptionService } from './gameDescription.service';
import { CreateGameDescriptionDto } from './dto/create-gameDescription.dto';
import { UpdateGameDescriptionDto } from './dto/update-gameDescription.dto';

@Controller('gameDescription')
export class GameDescriptionController {
  constructor(private readonly gameDescriptionService: GameDescriptionService) {}

  @Post()
  async create(@Body() createGameDescriptionDto: CreateGameDescriptionDto) {
    return this.gameDescriptionService.create(createGameDescriptionDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gameDescriptionService.findOne(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return this.gameDescriptionService.findByName(name);
  }

  @Get()
  async findAll() {
    return this.gameDescriptionService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGameDescriptionDto: UpdateGameDescriptionDto) {
    return this.gameDescriptionService.update(id, updateGameDescriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.gameDescriptionService.remove(id);
  }
}
