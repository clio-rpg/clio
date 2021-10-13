import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SystemService } from './system.service';
import { System } from './entities/system.entity';
import { CreateSystemInput } from './dto/create-system.input';
import { UpdateSystemInput } from './dto/update-system.input';

@Resolver(() => System)
export class SystemResolver {
  constructor(private readonly systemService: SystemService) {}

  @Mutation(() => System)
  createSystem(
    @Args('createSystemInput') createSystemInput: CreateSystemInput,
  ) {
    return this.systemService.create(createSystemInput);
  }

  @Query(() => [System], { name: 'system' })
  findAll() {
    return this.systemService.findAll();
  }

  @Query(() => System, { name: 'system' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.systemService.findOne(id);
  }

  @Mutation(() => System)
  updateSystem(
    @Args('updateSystemInput') updateSystemInput: UpdateSystemInput,
  ) {
    return this.systemService.update(updateSystemInput.id, updateSystemInput);
  }

  @Mutation(() => System)
  removeSystem(@Args('id', { type: () => Int }) id: number) {
    return this.systemService.remove(id);
  }
}
