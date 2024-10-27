import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @Post()
  async create(@Body() createRefundDto: CreateRefundDto) {
    return this.refundService.create(createRefundDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.refundService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRefundDto: UpdateRefundDto) {
    return this.refundService.update(id, updateRefundDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.refundService.remove(id);
  }
}
