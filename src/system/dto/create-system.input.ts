import { InputType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateSystemInput<
  SystemDetailsStats extends Record<string, unknown> = Record<string, unknown>,
> {
  @Field(() => JSON)
  stats: SystemDetailsStats;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
