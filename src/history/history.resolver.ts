import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(
    @Args('createHistoryInput') createHistoryInput: CreateHistoryInput,
  ) {
    return this.historyService.create(createHistoryInput);
  }

  @Query(() => [History], { name: 'histories' })
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
}
