import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsUUID()
  @Field()
  uuid!: string;

  @IsOptional()
  @IsBoolean()
  @Field((type) => Boolean, { nullable: true })
  isDeleted?: boolean;
}
