import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarImageResolver } from './car_image.resolver';
import { CarImageService } from './car_image.service';

import { CarImage } from './entities/carImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarImage])],
  //controller: []
  providers: [
    //그래프 큐엘 형태를 가져오기때문
    CarImageResolver,
    CarImageService,
  ],
})
export class CarImageModule {}
