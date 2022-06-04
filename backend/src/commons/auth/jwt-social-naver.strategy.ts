import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

//google 로그인용 passport
//yarn add passport-google-oauth20
@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      //검중부, Bearer 뺴고 넣어야함, 내장 되어있음 .fromauthheadera
      clientID: process.env.NAVER_KEY, //구굴에서 들고오셈
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      //사이트마다 다르다
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.email,
      password: '1111',
      name: profile.name, //req.user라는 이름에  contest 로 들어감
      age: 0,
      phone: '01020311883',
      address: '구로구',
      provider: profile.provider,
    };
  }
}
