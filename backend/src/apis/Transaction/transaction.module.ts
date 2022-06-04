import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Used_car } from '../used_cars/entities/used_car.entity';
import { User } from '../user/entities/user.entity';
import { PointTransaction } from './entities/transaction.entity';
import { PointTransactionResolver } from './transaction.resolver';
import { PointTransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
      Used_car,
    ]),
  ],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
    IamportService,
  ],
})
export class PointTransactionModule {}
