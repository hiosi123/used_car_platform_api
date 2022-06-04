import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarKindResolver } from './carKind.resolver';
import { CarKindService } from './carKind.service';
import { CarKind } from './entities/carKind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarKind])],
  //controller: []
  providers: [
    //그래프 큐엘 형태를 가져오기때문
    CarKindResolver,
    CarKindService,
  ],
})
export class CarKindModule {}
