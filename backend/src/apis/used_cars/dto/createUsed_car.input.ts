import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUsed_carInput {
  @Field(() => Boolean)
  is_nativeCar: boolean;

  @Field(() => Int)
  cc: number;

  @Field(() => Int)
  year: number;

  @Field(() => String)
  color: string;

  @Field(() => Int)
  km: number;

  @Field(() => String)
  seater: string;

  @Field(() => String)
  reportNumber: string;

  @Field(() => Boolean)
  is_seizuer: boolean;

  @Field(() => String)
  carIntro: string;

  @Field(() => Boolean)
  is_accident: boolean;

  @Field(() => Boolean)
  is_repair: boolean;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean, { defaultValue: 0 })
  is_sold: boolean;

  @Field(() => String)
  fuel: string;

  @Field(() => String)
  gear: string;

  @Field(() => String)
  carkind: string;

  @Field(() => String)
  driveMethod: string;

  @Field(() => [String])
  optionDetail: string[];

  @Field(() => String)
  model: string;
}
