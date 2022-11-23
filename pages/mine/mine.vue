<template>
  <view class="personal page-bottom">
    <view v-if="false" class="personal-main container mb">
      <u-avatar :src="avatar" mode="square" size="50" class="u-avatar"></u-avatar>
      <view class="personal-info">
        <view class="">小兵旭旭</view>
        <view class="">ID：216361237</view>
      </view>
    </view>

    <view class="container mb">
      <view class="xcc_label mb">剩余可画头像的点数 </view>
      <view class="dian_num">{{userInfo.attributes.totalScore || 0}}点 </view>

      <view class="flex-row mb">
        <view class="button_bottom1">
          <u-button :disabled="userInfo.attributes.signIn" @click="signinHandle" type="primary" shape="circle" :text="userInfo.attributes.signIn ? '已签到' : '签到'"></u-button>
        </view>
        <view class="button_bottom">
          <u-button @click="show = true" class="button_bottom" type="success" shape="circle" text="充值"></u-button>
        </view>
      </view>

      <view class="xcc_label mb">观看广告获得点数 </view>
      <view class="flex-row">
        <u-button disabled type="primary" shape="circle" :text="`观 看 广 告 (${userInfo.attributes.remainingAds || 0}/99)`"></u-button>
      </view>
    </view>

    <view class="options_box">
      <u-cell-group>
        <u-cell icon="share" title="分享到群里" :isLink="true" arrow-direction="right">
          <template #label>
            <view class="flex-row option_label">
              <u-button @click="nextStepShare = true" open-type="share" :text="`免费获取点数(${3 - userInfo.attributes.remainingShare}/3)！`"></u-button>
            </view>
          </template>
        </u-cell>
        <u-cell @click="$toPage('/pages/webview/webview?type=1')" icon="question-circle-fill" title="使用帮助" :isLink="true" arrow-direction="right"></u-cell>
        <u-cell @click="$toPage('/pages/webview/webview?type=2')" icon="calendar-fill" title="服务协议" :isLink="true" arrow-direction="right"></u-cell>
        <u-cell icon="server-fill" :isLink="true" arrow-direction="right">
          <template #title>
            <view class="flex-row option_label1">
              <u-button style="font-size: 15px" open-type="contact" text="联系客服"></u-button>
            </view>
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <!-- 购买弹出 -->
    <u-popup :show="show" closeOnClickOverlay @close="show = false" :round="10" mode="bottom">
      <view class="buy-items flex-row justify-around">
        <view class="buy-item">
          <view class="item-title">20 点</view>
          <view class="item-price"><text style="color:red">￥</text>1.00</view>
        </view>
        <view class="buy-item">
          <view class="item-title">100 点</view>
          <view class="item-price"><text style="color:red">￥</text>8.00</view>
        </view>
        <view class="buy-item">
          <view class="item-title">2000 点</view>
          <view class="item-price"><text style="color:red">￥</text>100.00</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import AV from "../../utils/av-core-min";
export default {
  data() {
    return {
      nextStepShare: false,
      avatar:
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg',
      show: false,
      list: [
        {
          name: '收藏',
          id: 'favorites',
          icon: 'star-fill',
          iconBackground: '#398c0c'
        },
        {
          name: '相册',
          id: 'photoAlbum',
          icon: 'photo-fill',
          iconBackground: '#5e2d88'
        },
        {
          name: '卡包',
          id: 'cardPackage',
          icon: 'grid-fill',
          iconBackground: '#33696c'
        },
        {
          name: '表情',
          id: 'expression',
          icon: 'gift-fill',
          iconBackground: '#833456'
        },
        {
          name: '设置',
          id: 'setUp',
          icon: 'setting-fill',
          iconBackground: '#3b2021'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  onShow() {
    if (this.nextStepShare) {
      this.userShareTask()
      this.nextStepShare = false
    }
    this.$store.dispatch('flushUserInfo')
  },
  methods: {
    async userShareTask() {
      try {
        await AV.Cloud.run('userShareTask')
        uni.showToast({
          title: '分享成功！',
          icon: 'success',
          mask: true
        })
        this.$store.dispatch('flushUserInfo')
      } catch (error) {
        uni.showToast({
          title: error.message.split(' ')[0],
          icon: 'none',
          mask: true
        })
        console.log(error)
      }
    },
    async signinHandle() {
      try {
        await AV.Cloud.run('userSignIn')
        this.$store.dispatch('flushUserInfo')
        uni.showToast({
          title: '签到成功',
          icon: 'success',
          mask: true
        })
      } catch (error) {
        uni.showToast({
          title: error.message.split(' ')[0],
          icon: 'none',
          mask: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}

.personal-main {
  display: flex;
  align-items: center;
}

.personal-info {
  display: flex;
  flex-direction: column;
}

.u-avatar {
  margin-right: 30rpx;
}

.button_bottom {
  flex: 1;
  margin-left: 5px;
}

.button_bottom1 {
  flex: 1;
  margin-right: 5px;
}

.options_box {
  background-color: #fff;
}

.dian_num {
  font-size: 32px;
  margin-bottom: 15px;
}

.option_label .u-button,
.option_label1 .u-button {
  margin: 0 !important;
  color: $uni-color-error !important;
  border: none !important;
  padding: 0 !important;
  line-height: 16px !important;
  height: 16px !important;
  font-size: 13px !important;
  justify-content: flex-start !important;
}

.option_label .u-button--active::before,
.option_label1 .u-button--active::before {
  background-color: transparent !important;
}

.option_label1 .u-button {
  color: $u-main-color !important;
}

.option_label1 .u-button__text {
  font-size: 15px !important;
}

.buy-items {
  padding: 30px;
}
.buy-item {
  padding: 10px 20px;
  border: 1px solid $uni-color-primary;
  background-color: #fafafa;
  border-radius: 8px;
}
.item-title {
}

.item-price {
  margin-top: 8px;
  font-size: 15px;
}
</style>
