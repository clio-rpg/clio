import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsJSON } from 'class-validator';
import JSON from 'graphql-type-json';

@InputType()
export class CreateCharacterInput<
  SystemDetailsStats extends Record<string, unknown> = Record<string, unknown>,
> {
  @IsString()
  @IsNotEmpty({
    message: 'Character name is required',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: 'Character bio is required',
  })
  bio?: string;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  deleted: boolean;

  @IsString()
  thumbnail?: string;

  @IsString()
  portrait?: string;

  @IsJSON()
  @Field(() => JSON)
  stats: SystemDetailsStats;
}
