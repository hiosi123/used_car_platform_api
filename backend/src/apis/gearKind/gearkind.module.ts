import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gear } from './entities/gearKind.entity';
import { GearResolver } from './gearkind.resolver';
import { GearService } from './gearkind.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gear])],
  //controller: []
  providers: [
    GearResolver, //그래프 큐엘 형태를 가져오기때문
    GearService,
  ],
})
export class GearModule {}
