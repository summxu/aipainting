import {
  login,
  getUserInfo,
  member
} from '../api/index.js'
import {
  switchTab,
  redirectTo,
  navigateTo
} from '../utils/navigate.js'
import Vue from 'vue'
import Vuex from 'vuex'
import toast from 'uview-ui/libs/config/props/toast'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shareCode: undefined,
    statusBar: 0,
    customBar: 0,
    systemInfo: {},
    userInfo: null,
    token: null,
  },
  mutations: {
    SET_SHARE_CODE(state, payload) {
      state.shareCode = payload
    },
    saveUserInfo(state, payload) {
      state.userInfo = payload
      uni.setStorageSync('userInfo', payload)
    },
    saveToken(state, payload) {
      state.token = payload
      uni.setStorageSync('token', payload)
    },
    cleanUserInfo(state, payload) {
      state.userInfo = null
      state.token = null
      clearInterval(state.notifyTimer)
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
    },
    // 获取头部高度
    getHeaderHeight(state) {
      uni.getSystemInfo({
        success: (e) => {
          // this.compareVersion(e.SDKVersion, '2.5.0')
          let statusBar = 0
          let customBar = 0

          // #ifdef MP
          statusBar = e.statusBarHeight
          customBar = e.statusBarHeight + 45
          if (e.platform === 'android') {
            customBar = e.statusBarHeight + 50
          }
          // #endif


          // #ifdef MP-WEIXIN
          statusBar = e.statusBarHeight
          // @ts-ignore
          const custom = wx.getMenuButtonBoundingClientRect()
          customBar = custom.bottom + custom.top - e.statusBarHeight
          // #endif


          // #ifdef MP-ALIPAY
          statusBar = e.statusBarHeight
          customBar = e.statusBarHeight + e.titleBarHeight
          // #endif


          // #ifdef APP-PLUS
          console.log('app-plus', e)
          statusBar = e.statusBarHeight
          customBar = e.statusBarHeight + 45
          // #endif


          // #ifdef H5
          statusBar = 0
          customBar = e.statusBarHeight + 45
          // #endif

          store.systemInfo = e
          store.statusBar = statusBar
          store.customBar = customBar

        }
      })
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
    
    async flushUserInfo({
      commit
    }) {
      try {
        const {
          data
        } = await getUserInfo()
        commit('saveUserInfo', data)
      } catch (e) {
        //TODO handle the exception
      }
    },
    initUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        const userInfo = uni.getStorageSync('userInfo')
        commit('saveUserInfo', userInfo)
        const token = uni.getStorageSync('token')
        commit('saveToken', token)

        resolve({
          userInfo,
          token
        })
      })
    },
    logoutAction({
      commit
    }) {
      commit('cleanUserInfo')
      redirectTo({
        url: '/pages/login/login'
      })
    },
    loginAction({
      state,
      commit
    }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            data,
            token,
            code
          } = await login({
            code: payload,
            shareCode: state.shareCode || null
          })
          // console.log(token)
          commit('saveUserInfo', {
            ...state.userInfo,
            ...data
          })
          commit('saveToken', token)
          if (code === 10002) {
            // 能登陆但未注册
            uni.redirectTo({
              url: '/pages/login/login2',
              success: res => {},
              fail: () => {},
              complete: () => {}
            });
            return
          }
          switchTab({
            url: '/pages/index/index'
          })
          resolve({
            data,
            token
          })
        } catch (e) {
          reject(e)
        }
      })
    }
  }
})

export default store
