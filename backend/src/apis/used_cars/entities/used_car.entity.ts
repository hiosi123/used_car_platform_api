import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CarKind } from 'src/apis/carKind/entities/carKind.entity';
import { Model } from 'src/apis/carModel/entities/carModel.entity';
import { Dealer } from 'src/apis/dealer/entities/dealer.entity';
import { DriveMethod } from 'src/apis/driveMethod/entities/driveMethod.entity';
import { Fuel } from 'src/apis/fuel/entities/fuel.entity';
import { Gear } from 'src/apis/gearKind/entities/gearKind.entity';
import { OptionDetail } from 'src/apis/optionDetail/entities/optionDetail.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Used_car {
  @PrimaryGeneratedColumn('increment') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  @Field(() => Int)
  car_id: number;

  @Column()
  @Field(() => Boolean)
  is_nativeCar: boolean;

  @Column()
  @Field(() => Int)
  cc: number;

  @Column()
  @Field(() => Int)
  year: number;

  @Column()
  @Field(() => String)
  color: string;

  @Column()
  @Field(() => Int)
  km: number;

  @Column()
  @Field(() => String)
  seater: string;

  @Column()
  @Field(() => String)
  reportNumber: string;

  @Column()
  @Field(() => Boolean)
  is_seizuer: boolean;

  @Column()
  @Field(() => String)
  carIntro: string;

  @Column()
  @Field(() => Boolean)
  is_accident: boolean;

  @Column()
  @Field(() => Boolean)
  is_repair: boolean;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: 0 })
  @Field(() => Boolean)
  is_sold: boolean;

  @DeleteDateColumn()
  deleteAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @ManyToOne(() => Gear) //mysql 에 알려줘야함 one to one 관계라는것을
  @Field(() => Gear)
  gear: Gear;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @ManyToOne(() => Fuel) //mysql 에 알려줘야함 one to one 관계라는것을
  @Field(() => Fuel)
  fuel: Fuel;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @ManyToOne(() => CarKind) //mysql 에 알려줘야함 one to one 관계라는것을
  @Field(() => CarKind)
  carkind: CarKind;

  @JoinColumn() // 컬럼을 가지고 연결하겠다, 기준이 있는 곳에 죠인 컬럼을 둔다
  @ManyToOne(() => DriveMethod) //mysql 에 알려줘야함 one to one 관계라는것을
  @Field(() => DriveMethod)
  driveMethod: DriveMethod;

  @ManyToOne(() => Model)
  @Field(() => Model)
  model: Model;

  @ManyToOne(() => Dealer)
  @Field(() => Dealer)
  dealer: Dealer;

  @JoinTable()
  @ManyToMany(() => OptionDetail, (optionDetail) => optionDetail.used_car) //(,태그에서 나를 어떻게 찾을것인가)
  @Field(() => [OptionDetail])
  optionDetail: OptionDetail[];

  @JoinTable()
  @ManyToMany(() => User, (user) => user.used_car)
  @Field(() => [User])
  user: User[];
}
