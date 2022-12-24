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
    const newUser: User = this.usersRepository.create(createUserInput);
    newUser.isDeleted = false;
    let createdUser: Promise<User>;
    try {
      createdUser = this.usersRepository.save(newUser);
      this.logger.log('new user created');
    } catch (err) {
      this.logger.error('error creating new user');
    }
    return createdUser;
  }

  findAll(findAllUsersInput?: FindAllUsersInput): Promise<User[]> | undefined {
    let allUsers: Promise<User[]>;
    try {
      allUsers = findAllUsersInput
        ? this.usersRepository.find({ where: findAllUsersInput })
        : this.usersRepository.find();
      this.logger.log('find all users');
    } catch (err) {
      this.logger.error('error finding all users');
    }
    return allUsers;
  }

  findOne(uuid: string): Promise<User> | undefined {
    let userById: Promise<User>;
    try {
      userById = this.usersRepository.findOneByOrFail({ uuid });
      this.logger.log('find one user');
    } catch (err) {
      this.logger.error('error finding user by UUID:', uuid);
    }
    return userById;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> | undefined {
    const uuid: string = updateUserInput.uuid;
    let updatedUser: User;
    try {
      const currentUser = await this.usersRepository.findOneByOrFail({ uuid });
      updatedUser = { ...currentUser, ...updateUserInput };
      updatedUser = await this.usersRepository.save(updatedUser);
      this.logger.log('update user');
    } catch (err) {
      this.logger.error('error updating user UUID:', uuid);
    }
    this.logger.log('updatedUser: ' + JSON.stringify(updatedUser));
    return updatedUser;
  }

  async remove(uuid: string): Promise<User> | undefined {
    let removedUser: User;
    try {
      const currentUser = await this.usersRepository.findOneByOrFail({ uuid });
      removedUser = { ...currentUser, isDeleted: true };
      removedUser = await this.usersRepository.save(removedUser);
      this.logger.log('remove user');
    } catch (err) {
      this.logger.error('error removing user UUID:', uuid);
    }
    this.logger.log('removedUser: ' + JSON.stringify(removedUser));
    return removedUser;
  }
}
