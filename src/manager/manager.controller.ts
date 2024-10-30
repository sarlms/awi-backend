import {
  Controller,
  Post,
  Req,
  Logger,
  NotFoundException,
  UseGuards,
  Get,
  Param,
  ConflictException,
  Body,
  Patch,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { ManagerService } from './manager.service';
import { Request } from 'express';
import { ProfileDto } from './dto/profile.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('manager')
export class ManagerController {
  private readonly logger: Logger;

  constructor(private readonly managerService: ManagerService) {
    this.logger = new Logger(ManagerController.name);
  }

  // Route for creating a new manager
  @Post('create')
  async create(@Req() req): Promise<any> {
    const newManager = req.body;
    try {
      const query = { email: newManager.email };
      const isManager = await this.managerService.findOne(query);

      if (isManager) throw new ConflictException('Manager Already Exist');

      const manager = await this.managerService.create(newManager);
      return manager;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<ProfileDto> {
    const managerId = req.user.id;
    this.logger.log(`Manager ID from JWT payload: ${managerId}`);

    if (!managerId) {
      throw new NotFoundException('Manager ID not found in request');
    }

    const manager = await this.managerService.findOne({ _id: managerId });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    return {
      id: manager._id.toString(),
      email: manager.email,
      firstName: manager.firstName,
      lastName: manager.lastName,
    };
  }

  // Route for retrieving a manager by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProfileDto> {
    const manager = await this.managerService.findOne({ _id: id });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    return {
      id: manager._id.toString(),
      email: manager.email,
      firstName: manager.firstName,
      lastName: manager.lastName,
    };
  }

  // Route for retrieving all managers
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ProfileDto[]> {
    const managers = await this.managerService.findAll();
    return managers.map((manager) => ({
      id: manager._id.toString(),
      email: manager.email,
      firstName: manager.firstName,
      lastName: manager.lastName,
    }));
  }

  // Route pour mettre à jour un manager par ID (réservée aux administrateurs)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateManager(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateManagerDto: UpdateManagerDto,
  ): Promise<ProfileDto> {
    // Vérifie si le manager connecté est un administrateur
    const requestingManager = await this.managerService.findOne({ _id: req.user.id });
    if (!requestingManager?.admin) {
      throw new ForbiddenException('Only administrators can update managers');
    }

    // Effectue la mise à jour du manager
    const updatedManager = await this.managerService.update(id, updateManagerDto);
    if (!updatedManager) {
      throw new NotFoundException('Manager not found');
    }

    // Retourne le profil mis à jour
    return {
      id: updatedManager._id.toString(),
      email: updatedManager.email,
      firstName: updatedManager.firstName,
      lastName: updatedManager.lastName,
    };
  }

  // Route pour supprimer un manager par ID (réservée aux administrateurs)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteManager(@Param('id') id: string, @Req() req: Request): Promise<{ message: string }> {
    // Vérifier si le manager connecté est un administrateur
    const requestingManager = await this.managerService.findOne({ _id: req.user.id });
    if (!requestingManager?.admin) {
      throw new ForbiddenException('Only administrators can delete managers');
    }

    // Supprimer le manager
    const deletedManager = await this.managerService.delete(id);
    if (!deletedManager) {
      throw new NotFoundException('Manager not found');
    }

    return { message: 'Manager successfully deleted' };
  }
}
