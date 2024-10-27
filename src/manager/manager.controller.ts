import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  async create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerService.create(createManagerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.managerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.managerService.remove(id);
  }
}
