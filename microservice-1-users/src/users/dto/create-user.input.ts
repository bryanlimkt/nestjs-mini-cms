import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsDate, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @Field()
  firstName!: string;

  @IsAlphanumeric()
  @Field()
  lastName!: string;

  @IsDate()
  @Field((type) => Date)
  dateOfBirth!: Date;

  @Field()
  addressLine1!: string;

  @IsOptional()
  @Field({ nullable: true })
  addressLine2?: string;
}
