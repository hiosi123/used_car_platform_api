import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CANCELLED } from 'dns';
import { Used_car } from 'src/apis/used_cars/entities/used_car.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
  PARTIAL_REFUND = 'PARTIAL_REFUND',
}
//이거는 그래프 큐엘에서도 받아들일수 있게
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

//결제 테이블이란 수정이랑 삭제가 있으면 안된다, 수정이나 삭제가 있어서는 안됨
@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Used_car)
  @Field(() => Used_car)
  used_car: Used_car;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
