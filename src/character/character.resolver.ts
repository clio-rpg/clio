import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@clio/auth/guards/auth.guard';
import { CurrentUser } from '@clio/auth/decorators/user.decorator';
import { User } from '@clio/auth/entities/user.entity';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Character)
  createCharacter(
    @CurrentUser() user: User,
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
    @Args('historyId') historyId: string,
  ) {
    return this.characterService.create(createCharacterInput, user, historyId);
  }

  @Query(() => [Character], { name: 'characters' })
  findAll() {
    return this.characterService.findAll();
  }

  @Query(() => Character, { name: 'character' })
  findOne(@Args('id') id: string) {
    return this.characterService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Character, { name: 'characterByHistory' })
  findByHistory(@Args('historyId') id: string) {
    return this.characterService.findByHistory(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Character, { name: 'characterByUser' })
  findByUser(@CurrentUser() user: User) {
    return this.characterService.findByUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Character)
  updateCharacter(
    @Args('id') id: string,
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ) {
    return this.characterService.update(id, updateCharacterInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeCharacter(@Args('id') id: string) {
    return this.characterService.remove(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  hardRemoveCharacter(@Args('id') id: string) {
    return this.characterService.hardRemove(id);
  }
}
