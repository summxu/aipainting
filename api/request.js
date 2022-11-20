// http.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
// export const baseUrl = 'http://27.198.75.26:8099'
export const baseUrl = 'https://weixin.xiaoguancloud.com/lawyer'
import store from '../store/index.js'
export const request = (options = {}) => {
  // 在这里可以对请求头进行一些设置
  // 例如：
  // options.header = {
  // 		"Content-Type": "application/x-www-form-urlencoded"
  // }
  // console.log(store.getters.getToken)
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url || '',
      method: options.type || 'GET',
      data: options.data || {},
      header: {
        ...options.header,
        Authorization: store.getters.getToken
      }
    }).then((res) => {
      const {
        data,
        message,
        msg,
        status,
        token,
        code
      } = res[1].data
      if (status === 50000 || code === 500 || code === 2000 || code === 20000) {
        uni.showToast({
          title: message || msg,
          icon: 'none'
        })
        reject(message || msg)
      }
      if (code === 20001) {
        store.dispatch('logoutAction')
      }

      resolve({
        data,
        message,
        token,
        code
      });
    }).catch(error => {
      uni.showToast({
        title: '网络连接失败┭┮﹏┭┮',
        icon: 'none'
      })
      reject(error)
    })
  });
}

export const get = (url, data, options = {}) => {
  options.type = 'GET';
  options.data = data;
  options.url = url;
  return request(options)
}

export const post = (url, data, options = {}) => {
  options.type = 'POST';
  options.data = data;
  options.url = url;
  return request(options)
}
