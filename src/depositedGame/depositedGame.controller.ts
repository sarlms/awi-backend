import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepositedGameService } from './depositedGame.service';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';

@Controller('deposited-game')
export class DepositedGameController {
  constructor(private readonly depositedGameService: DepositedGameService) {}

  @Post()
  async create(@Body() createDepositedGameDto: CreateDepositedGameDto) {
    return this.depositedGameService.create(createDepositedGameDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.depositedGameService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepositedGameDto: UpdateDepositedGameDto) {
    return this.depositedGameService.update(id, updateDepositedGameDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.depositedGameService.remove(id);
  }
}
