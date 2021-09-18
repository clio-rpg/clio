import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

  @Query(() => [History], { name: 'history' })
  findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History, { name: 'history' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.historyService.findOne(id);
  }

  @Mutation(() => History)
  updateHistory(
    @Args('updateHistoryInput') updateHistoryInput: UpdateHistoryInput,
  ) {
    return this.historyService.update(
      updateHistoryInput.id,
      updateHistoryInput,
    );
  }

  @Mutation(() => History)
  removeHistory(@Args('id', { type: () => Int }) id: number) {
    return this.historyService.remove(id);
  }
}
