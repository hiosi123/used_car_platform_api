import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './apis/auth/auth.module';
import { BrandModule } from './apis/brand/brand.module';
import { CarKindModule } from './apis/carKind/carKind.module';
import { CarModelModule } from './apis/carModel/carModel.module';
import { CarImageModule } from './apis/car_image/car_image.module';
import { DealerModule } from './apis/dealer/dealer.module';
import { DriveMethodModule } from './apis/driveMethod/driveMethod.module';
import { FileModule } from './apis/file/file.module';
import { FuelModule } from './apis/fuel/fuel.module';

import { GearModule } from './apis/gearKind/gearkind.module';
import { IamportService } from './apis/iamport/iamport.service';
import { PointTransactionModule } from './apis/Transaction/transaction.module';
import { Used_carModule } from './apis/used_cars/used_car.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { SearchModule } from './apis/search/search.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    BrandModule,
    FileModule,
    CarImageModule,
    DealerModule,
    PointTransactionModule,
    Used_carModule,
    CarModelModule,
    CarKindModule,
    DriveMethodModule,
    FuelModule,
    GearModule,
    IamportService,
    SearchModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**/*.entity.*'], //각 경로 설정
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
