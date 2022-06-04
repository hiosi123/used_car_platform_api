import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CarModelService } from './carModel.service';
import { Model } from './entities/carModel.entity';

@Resolver()
export class CarModelResolver {
  constructor(private readonly carModelService: CarModelService) {}

  @Mutation(() => Model)
  createCarModel(
    //
    @Args('modelName') modelName: string,
    @Args('brand') brand: string,
  ) {
    return this.carModelService.create({ modelName, brand });
  }
}
