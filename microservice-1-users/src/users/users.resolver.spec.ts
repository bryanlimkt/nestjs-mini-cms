import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserInput } from './dto/create-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockUsersService = {
    create: jest.fn(function (createUserInput: CreateUserInput): Promise<User> {
      return Promise.resolve(mockUser);
    }),
    findAll: jest.fn(function (
      findAllUsersInput?: FindAllUsersInput,
    ): Promise<User[]> {
      return Promise.resolve(Array.of(mockUser));
    }),
    findOne: jest.fn(function (uuid: string): Promise<User> {
      return Promise.resolve(mockUser);
    }),
    update: jest.fn(function (updateUserInput: UpdateUserInput): Promise<User> {
      return Promise.resolve({ ...mockUser, ...updateUserInput });
    }),
    remove: jest.fn(function (uuid: string): Promise<User> {
      return Promise.resolve(mockUser);
    }),
  };
  const createMockUserInput: CreateUserInput = {
    firstName: 'bob',
    lastName: 'Tschan',
    dateOfBirth: new Date('2001-12-23'),
    addressLine1: '123 Street',
  };

  const mockUser: User = {
    ...createMockUserInput,
    uuid: randomUUID(),
    created: new Date(Date.now()),
    updated: new Date(Date.now()),
    isDeleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('create user should not return undefined', async () => {
    const result: User = await resolver.createUser(createMockUserInput);
    expect(result).toBeDefined();
    expect(mockUsersService.create).toBeCalled();
    expect(result).toEqual(mockUser);
  });

  it('find all users without findAllUsersInput should return array User[]', async () => {
    const result: User[] = await resolver.findAll();
    expect(result).toBeDefined();
    expect(mockUsersService.findAll).toBeCalled();
    expect(result).toEqual(Array.of(mockUser));
  });

  it('find all users with findAllUsersInput should return array User[]', async () => {
    const result: User[] = await resolver.findAll({ uuid: '123' });
    expect(result).toBeDefined();
    expect(mockUsersService.findAll).toBeCalled();
    expect(result).toEqual(Array.of(mockUser));
  });

  it('find user should return User', async () => {
    const result: User = await resolver.findOne('123');
    expect(result).toBeDefined();
    expect(mockUsersService.findOne).toBeCalled();
    expect(result).toEqual(mockUser);
  });

  it('update user should return User', async () => {
    const newUUID = '456';
    const result: User = await resolver.updateUser({ uuid: newUUID });
    expect(result).toBeDefined();
    expect(mockUsersService.update).toBeCalled();
    expect(result).toEqual({ ...mockUser, uuid: newUUID });
  });

  it('remove users should return User', async () => {
    const result: User = await resolver.removeUser('123');
    expect(result).toBeDefined();
    expect(mockUsersService.remove).toBeCalled();
    expect(result).toEqual(mockUser);
  });
});
