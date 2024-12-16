import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { DepositFeePaymentService } from './depositFeePayment.service';
import { CreateDepositFeePaymentDto } from './dto/create-depositFeePayment.dto';
import { UpdateDepositFeePaymentDto } from './dto/update-depositFeePayment.dto';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guards';

@Controller('depositFeePayment')
export class DepositFeePaymentController {
  constructor(private readonly depositFeePaymentService: DepositFeePaymentService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(
    @Body() createDepositFeePaymentDto: CreateDepositFeePaymentDto,
    @Req() req: Request & { user: { id: string } }
  ) {
    const managerId = req.user.id;
    return this.depositFeePaymentService.create(createDepositFeePaymentDto, managerId);
  }

  //SARAH : il manquait la méthode findAll pour la page de trésorerie globale
  @UseGuards(LocalAuthGuard)
  @Get()
  async findAll() {
    return this.depositFeePaymentService.findAll();
  }

  @Get('seller/:sellerId')
  async findBySellerId(@Param('sellerId') sellerId: string) {
    const payments = await this.depositFeePaymentService.findBySellerId(sellerId);
    if (!payments.length) {
      throw new NotFoundException('No DepositFeePayments found for this seller');
    }
    return payments;
  }

  @Get('seller/:sellerId/session/:sessionId')
  async findBySellerAndSession(
    @Param('sellerId') sellerId: string,
    @Param('sessionId') sessionId: string
  ) {
    const payments = await this.depositFeePaymentService.findBySellerAndSession(sellerId, sessionId);
    if (!payments.length) {
      throw new NotFoundException('No DepositFeePayments found for this seller and session');
    }
    return payments;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.depositFeePaymentService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepositFeePaymentDto: UpdateDepositFeePaymentDto) {
    return this.depositFeePaymentService.update(id, updateDepositFeePaymentDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.depositFeePaymentService.remove(id);
  }
}
