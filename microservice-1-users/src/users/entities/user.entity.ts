import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsAlpha, IsAlphanumeric, IsBoolean, IsDate } from 'class-validator';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
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
  @Column('datetime')
  @Field((type) => Date)
  dateOfBirth!: Date;

  @IsAlphanumeric()
  @Field()
  @Column()
  addressLine1!: string;

  @IsAlphanumeric()
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
