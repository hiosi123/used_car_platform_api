import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriveMethodResolver } from './driveMethod.resolver';
import { DriveMethodService } from './driveMethod.service';
import { DriveMethod } from './entities/driveMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriveMethod])],
  //controller: []
  providers: [
    //그래프 큐엘 형태를 가져오기때문
    DriveMethodResolver,
    DriveMethodService,
  ],
})
export class DriveMethodModule {}
