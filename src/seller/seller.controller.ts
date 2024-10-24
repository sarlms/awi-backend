import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  async create(@Body() createSellerDto: any) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  async findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.sellerService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSellerDto: any) {
    return this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }
}
