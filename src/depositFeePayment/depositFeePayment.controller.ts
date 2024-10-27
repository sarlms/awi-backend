import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DepositFeePaymentService } from './depositFeePayment.service';
import { CreateDepositFeePaymentDto } from './dto/create-depositFeePayment.dto';
import { UpdateDepositFeePaymentDto } from './dto/update-depositFeePayment.dto';

@Controller('depositFeePayment')
export class DepositFeePaymentController {
  constructor(private readonly depositFeePaymentService: DepositFeePaymentService) {}

  @Post()
  async create(@Body() createDepositFeePaymentDto: CreateDepositFeePaymentDto) {
    return this.depositFeePaymentService.create(createDepositFeePaymentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.depositFeePaymentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepositFeePaymentDto: UpdateDepositFeePaymentDto) {
    return this.depositFeePaymentService.update(id, updateDepositFeePaymentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.depositFeePaymentService.remove(id);
  }
}
