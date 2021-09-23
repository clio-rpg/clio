import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({
    message: 'Invalid Characters',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Invalid Email',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password is Required',
  })
  password: string;
}
