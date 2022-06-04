import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DriveMethodService } from './driveMethod.service';

import { DriveMethod } from './entities/driveMethod.entity';

@Resolver()
export class DriveMethodResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly driveMethodService: DriveMethodService,
  ) {}
  @Mutation(() => DriveMethod) // 프런트에서 받아가는 데이터 타입
  createDriveMethod(
    @Args('id') id: string,
    @Args('name') name: string, //
  ) {
    return this.driveMethodService.create({ id, name });
  }
}
