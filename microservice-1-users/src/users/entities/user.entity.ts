import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Validate,
} from 'class-validator';
import { isValidAddress } from 'src/custom-validation/validation';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  uuid!: string;

  @IsAlphanumeric()
  @Field()
  @Column()
  firstName!: string;

  @IsAlphanumeric()
  @Field()
  @Column()
  lastName!: string;

  @IsDate()
  @Column('timestamp without time zone')
  @Field((type) => Date)
  dateOfBirth!: Date;

  @IsString()
  @Validate(isValidAddress)
  @Field()
  @Column()
  addressLine1!: string;

  @IsOptional()
  @IsString()
  @Validate(isValidAddress)
  @Field({ nullable: true })
  @Column({ nullable: true })
  addressLine2?: string;

  @Field((type) => Date)
  @CreateDateColumn()
  created!: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated!: Date;

  @IsBoolean()
  @Field((type) => Boolean)
  @Column('boolean')
  isDeleted!: boolean;
}
