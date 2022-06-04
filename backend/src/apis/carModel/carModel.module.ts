import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelResolver } from './carModel.resolver';
import { CarModelService } from './carModel.service';
import { Model } from './entities/carModel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [
    CarModelResolver, //
    CarModelService,
  ],
})
export class CarModelModule {}
