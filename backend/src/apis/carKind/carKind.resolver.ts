import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CarKindService } from './carKind.service';
import { CarKind } from './entities/carKind.entity';

@Resolver()
export class CarKindResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly createcarKindService: CarKindService,
  ) {}
  @Mutation(() => CarKind) // 프런트에서 받아가는 데이터 타입
  createCarKind(
    @Args('id') id: string,
    @Args('name') name: string, //
  ) {
    return this.createcarKindService.create({ id, name });
  }
}
