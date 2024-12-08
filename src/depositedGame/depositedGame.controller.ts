//depositedGame.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { DepositedGameService } from './depositedGame.service';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';

@Controller('depositedGame')
export class DepositedGameController {
  constructor(private readonly depositedGameService: DepositedGameService) {}

  @Get('sessions') // Récupérer toutes les sessions
  async getAllSessions() {
    return this.depositedGameService.getSessions();
  }

  @Get('sellers') // Récupérer tous les vendeurs
  async getAllSellers() {
    return this.depositedGameService.getSellers();
  }

  @Get('by-session-id/:sessionId') // Récupérer les jeux par session
  async findBySessionId(@Param('sessionId') sessionId: string) {
    return this.depositedGameService.findBySessionId(sessionId);
  }

  @Get() // Récupérer tous les jeux déposés
  async findAll() {
    return this.depositedGameService.findAll();
  }

  @Get('with-sessions') // Nouvelle route pour récupérer les jeux avec sessions
  async findAllWithSessions() {
    return this.depositedGameService.findAllWithSessions();
  }


  @Get(':id') // Récupérer un jeu par son ID
  async findOne(@Param('id') id: string) {
    return this.depositedGameService.findOne(id);
  }

  @Post()
  async create(@Body() createDepositedGameDto: CreateDepositedGameDto) {
    return this.depositedGameService.create(createDepositedGameDto);
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
