import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Fuel } from './entities/fuel.entity';

import { FuelService } from './fuel.service';

@Resolver()
export class FuelResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly createfuelService: FuelService,
  ) {}
  @Mutation(() => Fuel) // 프런트에서 받아가는 데이터 타입
  createFuel(
    @Args('id') id: string,
    @Args('name') name: string, //
  ) {
    return this.createfuelService.create({ id, name });
  }
}
