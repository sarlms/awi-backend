import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { DepositedGameService } from './depositedGame.service';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';

@Controller('depositedGame')
export class DepositedGameController {
  constructor(private readonly depositedGameService: DepositedGameService) {}

  @Post()
  async create(@Body() createDepositedGameDto: CreateDepositedGameDto) {
    return this.depositedGameService.create(createDepositedGameDto);
  }

  @Get()
  async findAll() {
    return this.depositedGameService.findAll();
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

  @Patch(':id/for-sale')
  async setForSale(@Param('id') id: string) {
    return this.depositedGameService.setForSale(id);
  }

  @Patch(':id/remove-from-sale')
  async removeFromSale(@Param('id') id: string) {
    return this.depositedGameService.removeFromSale(id);
  }

  @Patch(':id/mark-as-picked-up')
  async markAsPickedUp(@Param('id') id: string) {
    return this.depositedGameService.markAsPickedUp(id);
  }
}
