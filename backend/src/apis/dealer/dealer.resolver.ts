import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DealerService } from './dealer.service';
import { Dealer } from './entities/dealer.entity';

@Resolver()
export class DealerResolver {
  constructor(private readonly dealerService: DealerService) {}

  @Mutation(() => Dealer)
  create(
    @Args('name') name: string,
    @Args('phone') phone: string,
    @Args('location') location: string,
    @Args('image') image: string,
  ) {
    return this.dealerService.create({ name, phone, location, image });
  }
}
