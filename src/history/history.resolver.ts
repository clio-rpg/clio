import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => History)
  createHistory(
    @CurrentUser() user: User,
    @Args('createHistoryInput') createHistoryInput: CreateHistoryInput,
  ) {
    return this.historyService.create(createHistoryInput, user);
  }

  @Query(() => [History], { name: 'histories', nullable: 'items' })
  findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History, { name: 'history' })
  findOne(@Args('slug') slug: string) {
    return this.historyService.findBySlug(slug);
  }

  @Mutation(() => History)
  updateHistory(
    @Args('id') id: string,
    @Args('updateHistoryInput') updateHistoryInput: UpdateHistoryInput,
  ) {
    return this.historyService.update(id, updateHistoryInput);
  }

  @Mutation(() => Boolean)
  removeHistory(@Args('id') id: string) {
    return this.historyService.remove(id);
  }

  @Mutation(() => Boolean)
  hardRemoveHistory(@Args('id') id: string) {
    return this.historyService.hardRemove(id);
  }

  @Mutation(() => String)
  createInviteCode(@Args('slug') slug: string) {
    return this.historyService.createInviteCode(slug);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => History)
  joinHistoryWithInviteCode(
    @CurrentUser() user: User,
    @Args('inviteCode') inviteCode: string,
  ) {
    return this.historyService.joinHistoryWithInviteCode(inviteCode, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  leaveHistory(@CurrentUser() user: User, @Args('slug') slug: string) {
    return this.historyService.leaveHistory(slug, user);
  }
}
