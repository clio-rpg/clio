import { CreateHistoryInput } from './create-history.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateHistoryInput extends PartialType(CreateHistoryInput) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  private?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  inviteEnabled?: boolean;
}
