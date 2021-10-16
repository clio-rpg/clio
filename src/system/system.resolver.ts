import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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

  @Query(() => System, { name: 'system' })
  findOne(@Args('id') id: string) {
    return this.systemService.findOne(id);
  }

  @Query(() => [System], { name: 'publicSystems' })
  findPublicSystems() {
    return this.systemService.findAll();
  }

  @Mutation(() => System)
  updateSystem(
    @Args('systemId') id: string,
    @Args('updateSystemInput') updateSystemInput: UpdateSystemInput,
  ) {
    return this.systemService.update(id, updateSystemInput);
  }
}
