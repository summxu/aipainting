<script>
import store from './store/index.js'
export default {
  onLaunch: async function () {
    const { userInfo } = await store.dispatch('initUserInfo')
    // 没有用户信息,的情况下请求登录
    if (!userInfo) {
      store.dispatch('loginAction')
    }
    // 获取系统信息
    store.commit('getHeaderHeight')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';

/*每个页面公共css */
page {
  background-color: #f6f6f6;
}

html {
  font-size: 14px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

view,
image,
text {
  box-sizing: border-box;
  flex-shrink: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.items-center {
  display: flex;
  align-items: center;
}

.items-end {
  display: flex;
  align-items: flex-end;
}

// 自定义
.container {
  padding: 10px;
  background-color: #fff;
}

.page-bottom {
  padding-bottom: 15px;
}

.mt {
  margin-top: 10px;
}

.mt20 {
  margin-top: 10px;
}

.mb {
  margin-bottom: 10px;
}

.pd {
  padding: 10px;
}

.xcc_label {
  font-size: 13px;
  color: $uni-color-subtitle;
}
</style>
