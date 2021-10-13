import { CreateCharacterInput } from './create-character.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {}
