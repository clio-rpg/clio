import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @IsString()
  @Field(() => String)
  token: string;
}
