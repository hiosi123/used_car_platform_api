import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarImage } from './entities/carImage.entity';

@Injectable()
export class CarImageService {
  constructor(
    @InjectRepository(CarImage) //db에 접근하기 위한 코딩
    private readonly carImageRepository: Repository<CarImage>, //db에 접근하기 위한 코딩
  ) {}
  // async create({ name }) {
  //   // 카테고리를 데이터 베이스에 저장

  //   const result = await this.carImageRepository.save({ image }); //name:name 생략가능
  //   console.log(result);

  //   return result;
  // }

  async create({ image, used_car }) {
    const result = [];
    for (let i = 0; i < image.length; i++) {
      const newImage = await this.carImageRepository.save({
        image: image[i],
        used_car,
      });
      result.push(newImage);
    }
    return result;
  }

  async update({ image, used_car }) {
    const result = [];
    await this.carImageRepository.delete({ used_car });

    for (let i = 0; i < image.length; i++) {
      const newImage = await this.carImageRepository.save({
        image: image[i],
        used_car,
      });
      result.push(newImage);
    }

    return result;
  }

  async delete({ image }) {
    const result = await this.carImageRepository.softDelete({ image: image });
    return result.affected ? true : false;
  }
}
