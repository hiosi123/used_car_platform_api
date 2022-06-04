import { Field, ObjectType } from '@nestjs/graphql';
import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@ObjectType()
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String) //따로 만들지 않아도 자동으로 아이디가 만들어짐
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  image: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Used_car)
  @Field(() => Used_car)
  used_car: Used_car;
}
