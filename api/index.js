import {
  request,
  baseUrl
} from './request.js'
import store from "../store/index";
import qs from "qs";
// 上传
export function upload (url, data) {
  return new Promise((resolve, reject) => {
    let a = uni.uploadFile({
      url: baseUrl + '/app/member/upload',
      filePath: url,
      name: 'file',
      header: {
        'x-api-key': store.getters.getToken
      },
      formData: data,
      success: (res) => {
        resolve(res)
      }
    });
  })
}

// 登录 
export function login (data) {
  return request({
    url: `/app/login`,
    type: 'POST',
    data
  })
}

// 手机号获取
export function phone (data) {
  return request({
    url: `/app/phone`,
    type: 'POST',
    data
  })
}

// 手机号登录/注册
export function login_rest (data) {
  return request({
    url: `/app/rest/login`,
    type: 'POST',
    data
  })
}

// 注册 
export function register (data) {
  return request({
    url: '/app/register',
    type: 'POST',
    data
  })
}

// 获取验证码
export function sms_code (data) {
  return request({
    url: '/app/sms_code',
    type: 'POST',
    data
  })
}
