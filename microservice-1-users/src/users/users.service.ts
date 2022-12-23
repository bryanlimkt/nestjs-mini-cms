import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> | undefined {
    this.logger.log(
      'create new user with createUserInput:',
      JSON.stringify(createUserInput),
    );
    const newUser: User = this.usersRepository.create(createUserInput);
    newUser.isDeleted = false;
    let createdUser: Promise<User>;
    try {
      createdUser = this.usersRepository.save(newUser);
    } catch (err) {
      this.logger.error('error creating new user');
    }

    return createdUser;
  }

  findAll(findAllUsersInput?: FindAllUsersInput): Promise<User[]> | undefined {
    this.logger.log('find all users. findAllUsersInput:', findAllUsersInput);
    let allUsers: Promise<User[]>;
    try {
      allUsers = findAllUsersInput
        ? this.usersRepository.find({ where: findAllUsersInput })
        : this.usersRepository.find();
    } catch (err) {
      this.logger.error('error finding all users');
    }
    return allUsers;
  }

  findOne(uuid: string): Promise<User> | undefined {
    this.logger.log('find one user by uuid:', uuid);
    let userById: Promise<User>;
    try {
      userById = this.usersRepository.findOneByOrFail({ uuid });
    } catch (err) {
      this.logger.error('error finding user by UUID:', uuid);
    }
    return userById;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> | undefined {
    const uuid: string = updateUserInput.uuid;
    this.logger.log(
      'update user ${uuid} with updateUserInput:',
      updateUserInput,
    );
    let updatedUser: User;
    try {
      const currentUser = await this.usersRepository.findOneByOrFail({ uuid });
      updatedUser = { ...currentUser, ...updateUserInput };
      updatedUser = await this.usersRepository.save(updatedUser);
    } catch (err) {
      this.logger.error('error updating user UUID:', uuid);
    }
    this.logger.log('updatedUser:', updatedUser);
    return updatedUser;
  }

  async remove(uuid: string): Promise<User> | undefined {
    this.logger.log('remove user ${uuid} with uuid:', uuid);
    let removedUser: User;
    try {
      const currentUser = await this.usersRepository.findOneByOrFail({ uuid });
      removedUser = { ...currentUser, isDeleted: true };
      removedUser = await this.usersRepository.save(removedUser);
    } catch (err) {
      this.logger.error('error removing user UUID:', uuid);
    }
    this.logger.log('removedUser:', removedUser);
    return removedUser;
  }
}
