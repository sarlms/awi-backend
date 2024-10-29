import {
  Controller,
  Post,
  Request,
  Logger,
  NotFoundException,
  UseGuards,
  Get,
  ConflictException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards'; // Assurez-vous d'utiliser le bon nom de fichier ici
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  logger: Logger;
  constructor(private readonly managerService: ManagerService) {
    this.logger = new Logger(ManagerController.name);
  }

  @Post('create')
  async create(@Request() req): Promise<any> {
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
}
