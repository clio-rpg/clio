import { CreateSystemInput } from './create-system.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSystemInput extends PartialType(CreateSystemInput) {}
