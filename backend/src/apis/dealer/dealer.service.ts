import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dealer } from './entities/dealer.entity';

export class DealerService {
  constructor(
    @InjectRepository(Dealer)
    private readonly dealerRepository: Repository<Dealer>,
  ) {}

  async create({ name, phone, location, image }) {
    return await this.dealerRepository.save({ name, phone, location, image });
  }
}
