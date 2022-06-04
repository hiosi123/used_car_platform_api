import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  CACHE_MANAGER,
  Inject,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import exp from 'constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //검중부, Bearer 뺴고 넣어야함, 내장 되어있음 .fromauthheadera
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '9981',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // 실패 또는 성공여부를 알려줌
    //검증완료되면 실행
    const accessToken = req.headers.authorization.split(' ')[1];
    const check = await this.cacheManager.get(`accessToken: ${accessToken}`);

    if (check) throw new UnauthorizedException();

    return {
      id: payload.sub, //리턴이 된거임 context 라는 곳으로
      email: payload.email,
      provider: payload.provider,
    };
  }
}
