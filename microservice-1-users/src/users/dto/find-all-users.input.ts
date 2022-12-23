import { InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class FindAllUsersInput extends PartialType(UpdateUserInput) {}
