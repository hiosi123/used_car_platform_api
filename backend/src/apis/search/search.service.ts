import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';

@Injectable()
export class SearchService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async redisGetAll({ carintro }) {
    const mycache = await this.cacheManager.get(carintro);
    return mycache;
  }

  async elasticSearchAll({ carintro }) {
    const result = await this.elasticsearchService.search({
      index: 'mycar',
      query: {
        match: { carintro: carintro },
      },
    });
    return result;
  }

  async redisSaveAll({ carintro, values }) {
    await this.cacheManager.set(
      carintro, //
      values,
      {
        ttl: 1000,
      },
    );
  }
}
