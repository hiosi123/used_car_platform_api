import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  provider: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToMany(() => Used_car, (used_car) => used_car.user) //(,products 에서 나를 어떻게 찾을것인가)
  @Field(() => [Used_car])
  used_car: Used_car[];
}
