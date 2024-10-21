import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.schema';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() item: Item) {
    return this.itemService.create(item);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() item: Item) {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}
