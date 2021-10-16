import { CreateHistoryInput } from './create-history.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateHistoryInput extends PartialType(CreateHistoryInput) {
  @IsString()
  systemId?: string;
}
