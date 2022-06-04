import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './entities/fuel.entity';

import { FuelResolver } from './fuel.resolver';
import { FuelService } from './fuel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fuel])],
  //controller: []
  providers: [
    FuelResolver, //그래프 큐엘 형태를 가져오기때문
    FuelService,
  ],
})
export class FuelModule {}
