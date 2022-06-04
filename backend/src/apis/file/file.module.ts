import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarImageService } from '../car_image/car_image.service';
import { CarImage } from '../car_image/entities/carImage.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarImage])],
  providers: [
    FileResolver, //
    FileService,
    CarImageService,
  ],
})
export class FileModule {}
