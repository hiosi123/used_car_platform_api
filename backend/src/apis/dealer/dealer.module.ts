import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerResolver } from './dealer.resolver';
import { DealerService } from './dealer.service';
import { Dealer } from './entities/dealer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dealer])],
  providers: [DealerService, DealerResolver],
})
export class DealerModule {}
