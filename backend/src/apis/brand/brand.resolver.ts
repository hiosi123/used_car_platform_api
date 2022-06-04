import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';

@Resolver()
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Mutation(() => Brand)
  createBrand(
    @Args('brandName') brandName: string, //
  ) {
    return this.brandService.create({ brandName });
  }
}
