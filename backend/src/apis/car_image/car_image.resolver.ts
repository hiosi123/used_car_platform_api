import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CarImageService } from './car_image.service';
import { CarImage } from './entities/carImage.entity';

@Resolver()
export class CarImageResolver {
  constructor(
    //여기랑 service 랑 연결하는 느낌
    private readonly carImageService: CarImageService,
  ) {}
  @Mutation(() => [CarImage]) // 프런트에서 받아가는 데이터 타입
  createCarImage(
    @Args({ name: 'image', type: () => [String] }) image: string[], //
    @Args('used_car') used_car: number,
  ) {
    return this.carImageService.create({ image, used_car });
  }

  //  @Mutation(() => CarImage)
  //  deleteCarImage(
  //    @Args
  //  )

  @Mutation(() => [CarImage])
  updateCarImage(
    @Args({ name: 'image', type: () => [String] }) image: string[], //
    @Args('used_car') used_car: number,
  ) {
    return this.carImageService.update({ image, used_car });
  }

  @Mutation(() => Boolean)
  deleteCarImage(
    @Args('image') image: string, //
  ) {
    return this.carImageService.delete({ image });
  }
}
