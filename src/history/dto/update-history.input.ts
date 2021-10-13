import { CreateHistoryInput } from './create-history.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHistoryInput extends PartialType(CreateHistoryInput) {}
