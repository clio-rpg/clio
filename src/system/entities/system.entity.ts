import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class System {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
