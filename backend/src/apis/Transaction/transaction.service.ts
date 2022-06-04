import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Used_car } from '../used_cars/entities/used_car.entity';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/transaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Used_car)
    private readonly usedCarRepository: Repository<Used_car>,

    private readonly iamportService: IamportService,

    private readonly connection: Connection,
  ) {}

  async prepare({ merchant_uid, amount, currentUser }) {
    const accessToken = await this.iamportService.getAccessToken();

    const prepareComplete = await this.iamportService.paymentPrepare({
      merchant_uid,
      accessToken,
      amount,
    });
  }

  async create({ impUid, amount, currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();

    console.log('===============');
    console.log('🍎', accessToken);
    console.log('===============');

    const from_Import = await this.iamportService.checkImpUid({
      accessToken,
      impUid,
    });

    console.log('+++++++++');
    console.log(from_Import); //아임포트 사이트에서 가져온 정보들
    console.log('+++++++++');

    const merchant_uid_fromImport = from_Import.merchant_uid;

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const used_car = await queryRunner.manager.findOne(
        Used_car,
        { car_id: merchant_uid_fromImport },
        { lock: { mode: 'pessimistic_write' } },
      );

      if (used_car.is_sold === true)
        throw new UnprocessableEntityException('이미 구매된 상품입니다');

      if (from_Import.amount !== amount) {
        await this.iamportService.cancelOrderWithUid({ accessToken, impUid });
        throw new UnprocessableEntityException(
          '지불한 가격과, 자동차의 가격이 일치하지 않습니다',
        );
      }
      // pointTransactionTable 에 거래 기록 1을 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        used_car: merchant_uid,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);
      //2. 유저 정보 가져오기
      //const user = await this.userRepository.findOne({ id: currentUser.id });
      //3. 자동차 정보 가져오기

      const updateUsedCar = this.usedCarRepository.create({
        ...used_car, //찾아올사람
        is_sold: true, // 바꿀 내용
      });
      await queryRunner.manager.save(updateUsedCar);
      await queryRunner.commitTransaction();
      //4. 최종결과 프런트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async delete({ currentUser, merchant_uid }) {
    const accessToken = await this.iamportService.getAccessToken();
    //이 과정에서 안찾아지면 사기임
    const from_Import = await this.iamportService.checkMerchantUid({
      accessToken,
      merchant_uid,
    });
    console.log('🥰', from_Import);

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); //연결
    //transaction 시작
    await queryRunner.startTransaction('SERIALIZABLE'); // 시작

    try {
      const userInfo = await queryRunner.manager.findOne(
        User,
        { email: currentUser.email },
        { lock: { mode: 'pessimistic_write' } },
      );

      const pointTransaction = await queryRunner.manager.findOne(
        PointTransaction,
        { where: { used_car: merchant_uid }, relations: ['user'] },
      );
      console.log('🍋', userInfo);
      console.log('😇 ', pointTransaction);
      if (userInfo.id !== pointTransaction.user.id)
        throw new UnprocessableEntityException('구매하신 품목이 아닙니다.');

      console.log('🍌', pointTransaction);
      if (pointTransaction.status === 'CANCEL')
        throw new UnprocessableEntityException('이미 취소된 상품입니다.');

      await this.iamportService.cancelOrderWithMuid({
        accessToken,
        merchant_uid,
      });

      const used_car = await queryRunner.manager.findOne(
        Used_car, //
        { car_id: merchant_uid },
        { lock: { mode: 'pessimistic_write' } },
      );

      const updateCar = this.usedCarRepository.create({
        ...used_car, //찾아올사람 아이디
        is_sold: false, // 바꿀 내용
      });
      await queryRunner.manager.save(updateCar);

      const result = await this.pointTransactionRepository.create({
        impUid: from_Import.imp_uid,
        amount: from_Import.amount,
        used_car: merchant_uid,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });

      await queryRunner.manager.save(result);

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //연결해제
      await queryRunner.release(); //연결 해제를 해줘야 한다.
    }
  }
}
