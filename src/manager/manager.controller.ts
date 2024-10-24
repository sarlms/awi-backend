import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  async create(@Body() createManagerDto: any) {
    return this.managerService.create(createManagerDto);
  }

  @Get()
  async findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.managerService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateManagerDto: any) {
    return this.managerService.update(id, updateManagerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.managerService.delete(id);
  }
}
