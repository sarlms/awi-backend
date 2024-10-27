import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositFeePaymentDto } from './create-depositFeePayment.dto';

export class UpdateDepositFeePaymentDto extends PartialType(CreateDepositFeePaymentDto) {}
