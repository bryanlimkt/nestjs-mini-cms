import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsDate,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { isValidAddress } from 'src/custom-validation/validation';

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

  @IsString()
  @Validate(isValidAddress)
  @Field()
  @IsString()
  addressLine1!: string;

  @IsOptional()
  @IsString()
  @Validate(isValidAddress)
  @Field({ nullable: true })
  addressLine2?: string;
}
