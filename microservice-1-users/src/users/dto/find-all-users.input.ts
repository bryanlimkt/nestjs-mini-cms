import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class FindAllUsersInput extends PartialType(UpdateUserInput) {
  @Field((type) => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
