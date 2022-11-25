import {
  request,
  baseUrl
} from './request.js'
import store from "../store/index";
import qs from "qs";
import md5 from "js-md5"

// 百度翻译
export function BaiDuTrans(q) {
  // 先翻译
  const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
  const secret = 'gs85GynUt8LwAabexCw1'
  const appid = '20221121001462790'
  
  const params = {
    q,
    from: 'auto',
    to: 'en',
    appid,
    salt: '1435660288',
  }
  params.sign = md5(params.appid + params.q + params.salt + secret)
  // 生成随机码
  return uni.request({
    url,
    method: 'POST',
    data: params,
  })
}
