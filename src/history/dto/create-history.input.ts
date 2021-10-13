import { SystemDetails } from '@clio/common/enums/system.enum';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateHistoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsBoolean()
  @IsNotEmpty()
  private: boolean;

  @IsEnum(SystemDetails)
  @IsNotEmpty()
  @Field(() => SystemDetails)
  system: SystemDetails;
}
