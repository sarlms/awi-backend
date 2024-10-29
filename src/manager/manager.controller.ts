import {
  Controller,
  Post,
  Req,
  Logger,
  NotFoundException,
  UseGuards,
  Get,
  ConflictException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards'; // Assurez-vous d'utiliser le bon nom de fichier ici
import { ManagerService } from './manager.service';
import { ProfileDto } from '../auth/dto/profile.dto';
import { Request } from 'express';

@Controller('manager')
export class ManagerController {
  logger: Logger;
  constructor(private readonly managerService: ManagerService) {
    this.logger = new Logger(ManagerController.name);
  }

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
  @Get('viewProfile')
  async viewProfile(@Req() req: Request & { user: { email: string } }) {
    const email = req.user.email; // TypeScript reconnaît maintenant user.email
    const manager = await this.managerService.findOne({ email });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    return {
      id: manager._id,
      firstName: manager.firstName,
      lastName: manager.lastName,
      email: manager.email,
      admin: manager.admin, // Si applicable
      // Ajoutez d'autres champs nécessaires ici
    };
  }

}
