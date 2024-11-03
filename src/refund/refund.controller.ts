import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { Request } from 'express';

@Controller('refund')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRefundDto: CreateRefundDto,
    @Req() req: Request & { user: { id: string } }
  ) {
    const managerId = req.user.id;
    return this.refundService.create(createRefundDto, managerId);
  }

  @Get()
  async findAll() {
    return this.refundService.findAll();
  }

  @Get('seller/:sellerId')
  async findBySellerId(@Param('sellerId') sellerId: string) {
    const refunds = await this.refundService.findBySellerId(sellerId);
    if (!refunds.length) {
      throw new NotFoundException('No Refunds found for this seller');
    }
    return refunds;
  }

  @Get('seller/:sellerId/session/:sessionId')
  async findBySellerAndSession(
    @Param('sellerId') sellerId: string,
    @Param('sessionId') sessionId: string
  ) {
    const refunds = await this.refundService.findBySellerAndSession(sellerId, sessionId);
    if (!refunds.length) {
      throw new NotFoundException('No Refunds found for this seller and session');
    }
    return refunds;
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
