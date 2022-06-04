import {
  CACHE_MANAGER,
  Inject,
  PayloadTooLargeException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, //,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('provider') provider: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ email, provider });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 이메일 입니다');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('암호가 일치하지 않습니다');

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async logout(
    @Context() context: any, //
  ) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    console.log('🍋', accessToken);
    const bakeCookie = context.req.headers.cookie.split(' ');
    const result = bakeCookie[bakeCookie.length - 1].replace(
      'refreshToken=',
      '',
    ); //
    console.log('🍟', result);

    try {
      const checkAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
      );
      const checkRefreshToken = jwt.verify(result, process.env.REFRESH_TOKEN);
      console.log('🍌', checkAccessToken);
      console.log(checkRefreshToken);

      const start = checkRefreshToken['iat'];
      const end = checkRefreshToken['exp'];

      await this.cacheManager.set(
        `accessToken: ${accessToken}`,
        'accessToken',
        {
          ttl: end - start,
        },
      );
      await this.cacheManager.set(
        `refreshToken: ${result}`, //
        'refreshToken',
        {
          ttl: end - start,
        },
      );
    } catch (error) {
      if (error) throw new UnprocessableEntityException();
    }

    return '로그아웃 되었습니다.';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
