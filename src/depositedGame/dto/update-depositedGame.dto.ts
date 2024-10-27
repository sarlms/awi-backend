import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositedGameDto } from './create-depositedGame.dto';

export class UpdateDepositedGameDto extends PartialType(CreateDepositedGameDto) {}
