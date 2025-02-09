//depositedGame.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { DepositedGameService } from './depositedGame.service';
import { CreateDepositedGameDto } from './dto/create-depositedGame.dto';
import { UpdateDepositedGameDto } from './dto/update-depositedGame.dto';
import { DepositedGame } from '../schemas/depositedGame.schema'; // Ajout de l'import

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

  //SARAH : ajout d'une méthode pour récup les transactions par vendeur
  @Get('seller/:sellerId')
  async findDepositedGamesBySellerId(@Param('sellerId') sellerId: string): Promise<DepositedGame[]> {
    return this.depositedGameService.findBySellerId(sellerId);
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

  @Post('createWithoutSession')
  async createWithoutSession(@Body() body: { sellerId: string; gameDescriptionId: string; salePrice: number }) {
    const { sellerId, gameDescriptionId, salePrice } = body;
    return this.depositedGameService.createWithoutSessionId(sellerId, gameDescriptionId, salePrice);
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
