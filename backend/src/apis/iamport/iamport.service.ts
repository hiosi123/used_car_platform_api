import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

export class IamportService {
  async getAccessToken() {
    const imp_uid_token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: '6436672414334897', // REST API키
        imp_secret:
          '1750f6c0346700ba0bd71145471462743354710e00673094edbfa720e1825da9d8709baee6b86bb0', // REST API Secret
      },
    });

    return imp_uid_token.data.response.access_token;
  }

  async checkImpUid({ accessToken, impUid }) {
    let fromImport;
    try {
      fromImport = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get', // GET method
        headers: {
          'Content-Type': 'application/json', // "Content-Type": "application/json"
          Authorization: `Bearer ${accessToken}`, // 발행된 액세스 토큰
        },
      });
    } catch (error) {
      if (error.response.status === 409) {
        console.log('409!!');
        throw new ConflictException('이미 구매된 상품입니다');
      }
    }
    // .catch((error) => {
    //   this.cancelOrderWithUid({ accessToken, impUid });
    //   console.log(error);
    // });
    console.log(fromImport);
    console.log('authorized impUid');

    return fromImport.data.response;
  }

  async checkMerchantUid({ accessToken, merchant_uid }) {
    const fromImport = await axios({
      url: `https://api.iamport.kr/payments/find/${merchant_uid}/paid`,
      method: 'get', // GET method
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${accessToken}`, // 발행된 액세스 토큰
      },
    });
    console.log('authorized impUid');

    return fromImport.data.response;
  }
  async cancelOrderWithUid({ accessToken, impUid }) {
    await axios({
      url: `https://api.iamport.kr/payments/cancel/`,
      method: 'post', // GET method
      data: { imp_uid: `${impUid}` },
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${accessToken}`, // 발행된 액세스 토큰
      },
    });
    console.log('canceled order');
  }

  async cancelOrderWithMuid({ accessToken, merchant_uid }) {
    await axios({
      url: `https://api.iamport.kr/payments/cancel/`,
      method: 'post', // GET method
      data: { merchant_uid: `${merchant_uid}` },
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${accessToken}`, // 발행된 액세스 토큰
      },
    });
    console.log('canceled order');
  }

  async paymentPrepare({ accessToken, merchant_uid, amount }) {
    await axios({
      url: `https://api.iamport.kr/payments/prepare/`,
      method: 'post', // GET method
      data: { merchant_uid: `${merchant_uid}`, amount },
      headers: {
        'Content-Type': 'application/json', // "Content-Type": "application/json"
        Authorization: `Bearer ${accessToken}`, // 발행된 액세스 토큰
      },
    });
    console.log('prepare complete');
  }
}
