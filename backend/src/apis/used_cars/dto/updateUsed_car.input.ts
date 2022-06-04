import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUsed_carInput } from './createUsed_car.input';

@InputType()
export class UpdateUsed_carInput extends PartialType(CreateUsed_carInput) {} //전체를 들고와도 되고 안들고 와도 되고
