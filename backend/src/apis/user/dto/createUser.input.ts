import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  phone: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  provider: string;
}
