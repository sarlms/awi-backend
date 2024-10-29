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
import { JwtAuthGuard } from '../auth/jwt-auth.guards'; // Make sure the file path is correct
import { ManagerService } from './manager.service';
import { Request } from 'express';
import { ProfileDto } from './dto/profile.dto';


@Controller('manager') // Prefixes routes with '/manager'
export class ManagerController {
  logger: Logger;

  constructor(private readonly managerService: ManagerService) {
    this.logger = new Logger(ManagerController.name); // Initializes a logger specific to this controller
  }

  // Route for creating a new manager
  @Post('create')
  async create(@Req() req): Promise<any> {
    const newManager = req.body; // Retrieves manager data from the request body
    try {
      const query = { email: newManager.email };
      const isManager = await this.managerService.findOne(query);

      // Checks if the manager already exists and throws a ConflictException if so
      if (isManager) throw new ConflictException('Manager Already Exist');

      // Creates the new manager in the database and returns the result
      const manager = await this.managerService.create(newManager);
      return manager;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err; // Re-throws the error to ensure it’s handled by the global exception filter
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<ProfileDto> {
    // Extract the manager's ID from the JWT payload
    const managerId = req.user.id;

    // Log managerId to see if it's been correctly retrieved
    this.logger.log(`Manager ID from JWT payload: ${managerId}`);

    if (!managerId) {
      throw new NotFoundException('Manager ID not found in request');
    }

    // Use the existing `findOne` method in ManagerService to retrieve the manager by ID
    const manager = await this.managerService.findOne({ _id: managerId });
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    // Map the manager's information to ProfileDto
    return {
      id: manager._id.toString(),
      email: manager.email,
      firstName: manager.firstName,
      lastName: manager.lastName,
      // Add additional fields if necessary
    };
  }
}
