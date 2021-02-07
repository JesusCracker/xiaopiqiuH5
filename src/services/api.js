import request from '../utils/request';

export function getVerifyCode(params) {
  return request('/api/wx/getPhoneCode', {
    method: 'POST',
    body: {
      ...params
    }
  });
}
//判断用户是否已经注册
export function isVerified(params) {
  return request('/api/wx/getUserByPhone', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

//根据code获取用户信息
export async function queryUserInfo(params) {
  return request(`/api/wx/getWxUser`, {
    method: 'POST',
    body: {code: params},
  });
}

//用户通过手机密码openid登录
export async function wxLogin(params) {
  return request(`/api/wx/login`, {
    method: 'POST',
    body: {...params},
  });
}

//注册账号
export async function wxRegister(params) {
  return request(`/api/wx/registered`, {
    method: 'POST',
    body: {...params},
  });
}

//忘记密码
export async function wxForgot(params) {
  return request(`/api/wx/resetPass`, {
    method: 'POST',
    body: {...params},
  });
}
