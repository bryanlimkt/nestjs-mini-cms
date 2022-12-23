import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { CreateUserInput } from './dto/create-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUsersRepository = {
    create: jest.fn((user) => Promise.resolve(mockUser)),

    save: jest.fn((user) => Promise.resolve(user)),

    findOneByOrFail: jest.fn((uuid) => Promise.resolve(mockUser)),

    find: jest.fn((findallUsersInput?: FindAllUsersInput) => {
      return Promise.resolve(Array.of(mockUser));
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
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user should return user', async () => {
    const result = await service.create(createMockUserInput);
    expect(result).toBeDefined;
    expect(result).toEqual(mockUser);
  });

  it('find all should return array of users', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(Array.of(mockUser));
  });

  it('find all with uuid in findAllUsersInput should return array of users', async () => {
    const result = await service.findAll({ uuid: '123' });
    expect(result).toBeDefined();
    expect(result).toEqual(Array.of(mockUser));
  });

  it('find all with isDeleted in findAllUsersInput should return array of users', async () => {
    const result = await service.findAll({ isDeleted: true });
    expect(result).toBeDefined();
    expect(result).toEqual(Array.of(mockUser));
  });

  it('find one should return user', async () => {
    const uuid = randomUUID();
    const result = await service.findOne(uuid);
    expect(result).toBeDefined();
    expect(result).toEqual(mockUser);
  });

  it('update should return user', async () => {
    const newUUID = randomUUID();
    const updateUserInput: UpdateUserInput = { uuid: newUUID };
    const result = await service.update(updateUserInput);
    expect(result).toBeDefined();
    expect(result).toEqual({ ...mockUser, ...updateUserInput });
  });

  it('remove user should return user', async () => {
    const uuid = randomUUID();
    const result = await service.remove(uuid);
    expect(result).toBeDefined();
    expect(result).toEqual({ ...mockUser, isDeleted: true });
  });
});
