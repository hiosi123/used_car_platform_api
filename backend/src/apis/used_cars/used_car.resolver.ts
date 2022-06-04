import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUsed_carInput } from './dto/createUsed_car.input';
import { UpdateUsed_carInput } from './dto/updateUsed_car.input';
import { Used_car } from './entities/used_car.entity';
import { Used_carService } from './used_car.service';

@Resolver()
export class Used_carResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly used_carService: Used_carService,
  ) {}

  @Query(() => [Used_car])
  fetchProducts() {
    return this.used_carService.findAll();
  }

  @Query(() => [Used_car])
  fetchDeleted() {
    return this.used_carService.findAllDel();
  }
  @Query(() => Used_car)
  fetchProduct(@Args('carId') carId: number) {
    return this.used_carService.fineOne({ carId });
  }

  @Mutation(() => Used_car) // 프런트에서 받아가는 데이터 타입
  createProduct(
    @Args('used_carInput') used_carInput: CreateUsed_carInput, //
  ) {
    return this.used_carService.create({ used_carInput });
  }

  @Mutation(() => Used_car)
  async updateProduct(
    @Args('carId') carId: number,
    @Args('used_carInput') used_carInput: UpdateUsed_carInput,
  ) {
    // 판매 완료가 되었는지 확인하기
    await this.used_carService.checkSoldout({ carId });

    // 수정하기
    return await this.used_carService.update({ carId, used_carInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('carId') carId: number, //
  ) {
    return this.used_carService.delete({ carId });
  }

  @Mutation(() => Boolean)
  restoreProduct(
    @Args('carId') carId: number, //
  ) {
    return this.used_carService.restore({ carId });
  }
}
