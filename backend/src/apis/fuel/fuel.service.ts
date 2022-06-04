import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuel } from './entities/fuel.entity';

@Injectable()
export class FuelService {
  constructor(
    @InjectRepository(Fuel) //db에 접근하기 위한 코딩
    private readonly fuelRepository: Repository<Fuel>, //db에 접근하기 위한 코딩
  ) {}
  async create({ id, name }) {
    // 카테고리를 데이터 베이스에 저장

    const result = await this.fuelRepository.save({ id, name }); //name:name 생략가능
    console.log(result);

    return result;
  }
}
