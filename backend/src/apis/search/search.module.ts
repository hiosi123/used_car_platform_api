import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from '../carModel/entities/carModel.entity';
import { Used_car } from '../used_cars/entities/used_car.entity';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model, Used_car]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    SearchResolver, //
    SearchService,
  ],
})
export class SearchModule {}
