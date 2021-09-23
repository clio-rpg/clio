import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from './guards/auth.guard';
import { CreateUserInput } from '../auth/dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '../auth/entities/user.entity';
import { UserService } from './user/user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { nullable: 'items' })
  async users(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = this.userService.updateUser(id, data);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}
