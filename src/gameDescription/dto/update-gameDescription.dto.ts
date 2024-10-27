import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDescriptionDto } from './create-gameDescription.dto';

export class UpdateGameDescriptionDto extends PartialType(CreateGameDescriptionDto) {}
