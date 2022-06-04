import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Model } from '../carModel/entities/carModel.entity';
import { Used_car } from '../used_cars/entities/used_car.entity';

import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(
    private readonly searchService: SearchService, //
  ) {}

  @Query(() => [Used_car])
  async searchUsedCar(
    @Args('carintro') carintro: string, //
  ) {
    //1. 레디스에서 들고온다
    const redisGet = await this.searchService.redisGetAll({ carintro });
    if (redisGet) {
      console.log('😇from redis');
      return redisGet;
    }

    //2. 레디스에 없으면 일라스틱에서 들고옴
    const elasticGet = await this.searchService.elasticSearchAll({
      carintro,
    });

    //3. 일라스틱에서 온 정보들
    const values = [];
    for (let i = 0; i < elasticGet['hits']['hits'].length; i++) {
      const all = elasticGet['hits']['hits'][i]['_source'];

      all['reportNumber'] = all['reportnumber'];
      all['carIntro'] = all['carintro'];
      all['gear'] = {
        id: all['gearid'],
        name: all['gearname'],
      };
      all['fuel'] = {
        id: all['fuelid'],
        name: all['fuelname'],
      };
      all['carkind'] = {
        id: all['carkindid'],
        name: all['carkindname'],
      };
      all['model'] = {
        id: all['modelid'],
        name: all['modelname'],
      };
      all['driveMethod'] = {
        id: all['drivemethodid'],
        name: all['drivemethodname'],
      };

      console.log(elasticGet['hits']['hits'][i]['_source']);
      values.push(all);
    }
    console.log('🍟', elasticGet['hits']['hits'][0]['_source']);
    // console.log('🍎', elasticGet['hits']['hits'][0]['_source']['name']);

    //4. 리턴하기전에 레디스에 저장

    await this.searchService.redisSaveAll({ carintro, values });

    console.log('🥲 from elastic');
    return values;
  }
}
