import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Gear } from './entities/gearKind.entity';
import { GearService } from './gearkind.service';

@Resolver()
export class GearResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly createGearService: GearService,
  ) {}
  @Mutation(() => Gear) // 프런트에서 받아가는 데이터 타입
  createGear(
    @Args('id') id: string,
    @Args('name') name: string, //
  ) {
    return this.createGearService.create({ id, name });
  }
}
