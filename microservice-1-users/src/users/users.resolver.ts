import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { UseInterceptors } from '@nestjs/common';

@UseInterceptors(LoggingInterceptor)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> | undefined {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('findAllUsersInput', { nullable: true })
    findAllUsersInput?: FindAllUsersInput,
  ): Promise<User[]> | undefined {
    return findAllUsersInput
      ? this.usersService.findAll(findAllUsersInput)
      : this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('uuid') uuid: string): Promise<User> | undefined {
    return this.usersService.findOne(uuid);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> | undefined {
    return this.usersService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('uuid') uuid: string): Promise<User> | undefined {
    return this.usersService.remove(uuid);
  }
}
