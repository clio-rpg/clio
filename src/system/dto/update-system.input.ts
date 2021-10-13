import { CreateSystemInput } from './create-system.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSystemInput extends PartialType(CreateSystemInput) {
  @Field(() => Int)
  id: number;
}
