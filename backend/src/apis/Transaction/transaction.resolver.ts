import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PointTransaction } from './entities/transaction.entity';
import { PointTransactionService } from './transaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  //Service()

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @Args('merchant_uid') merchant_uid: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
      merchant_uid,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  deleteTransaction(
    @Args('merchant_uid') merchant_uid: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.delete({
      currentUser,
      merchant_uid,
    });
  }
}
