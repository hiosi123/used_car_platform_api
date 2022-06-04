import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/carModel.entity';

@Injectable()
export class CarModelService {
  constructor(
    @InjectRepository(Model)
    private readonly carModelRepository: Repository<Model>,
  ) {}

  async create({ modelName, brand }) {
    const result = await this.carModelRepository.save({ modelName, brand });

    return result;
  }
}
