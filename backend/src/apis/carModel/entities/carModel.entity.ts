import { Field, ObjectType } from '@nestjs/graphql';
import { Brand } from 'src/apis/brand/entities/brand.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Model {
  @PrimaryGeneratedColumn('uuid') //따로 만들지 않아도 자동으로 아이디가 만들어짐
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  modelName: string;

  @ManyToOne(() => Brand)
  @Field(() => Brand)
  brand: Brand;

  @UpdateDateColumn()
  updatedAt: Date;
}
