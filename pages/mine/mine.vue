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
          <u-button :disabled="userInfo.attributes.signIn" @click="signinHandle" type="primary" shape="circle"
            :text="userInfo.attributes.signIn ? '已签到' : '签到'"></u-button>
        </view>
        <view class="button_bottom">
          <u-button @click="show = true" class="button_bottom" type="success" shape="circle" text="充值"></u-button>
        </view>
      </view>

      <view class="xcc_label mb">观看广告获得点数 </view>
      <view class="flex-row">
        <u-button disabled type="primary" shape="circle"
          :text="`观 看 广 告 (${10 - userInfo.attributes.remainingAds }/10)`"></u-button>
      </view>
    </view>

    <view class="options_box">
      <u-cell-group>
        <u-button @click="nextStepShare = true" open-type="share">
          <u-cell icon="share" title="分享到群里" :isLink="true" arrow-direction="right">
            <template #label>
              <view class="flex-row option_label">
                {{`免费获取点数(${3 - userInfo.attributes.remainingShare}/3)！`}}
              </view>
            </template>
          </u-cell>
        </u-button>
        <u-cell @click="$toPage('/pages/webview/webview?type=1')" icon="question-circle-fill" title="使用帮助"
          :isLink="true" arrow-direction="right"></u-cell>
        <u-cell @click="$toPage('/pages/webview/webview?type=2')" icon="calendar-fill" title="服务协议" :isLink="true"
          arrow-direction="right"></u-cell>
        <u-button style="font-size: 15px" open-type="contact">
          <u-cell icon="server-fill" :isLink="true" arrow-direction="right">
            <template #title>
              <view class="flex-row option_label1">
                联系客服
              </view>
            </template>
          </u-cell>
        </u-button>
      </u-cell-group>
    </view>

    <!-- 购买弹出 -->
    <!-- 购买积分的类型 scoreType1 1.89元20积分 scoreType2 4.9元60积分 scoreType2 10元120积分 -->
    <u-popup :show="show" closeOnClickOverlay @close="show = false" :round="10" mode="bottom">
      <view class="buy-items flex-row justify-around">
        <view @click="payHandle('scoreType1')" class="buy-item">
          <view class="item-title">20 点</view>
          <view class="item-price"><text style="color:red">￥</text>1.89</view>
        </view>
        <view @click="payHandle('scoreType2')" class="buy-item">
          <view class="item-title">60 点</view>
          <view class="item-price"><text style="color:red">￥</text>4.90</view>
        </view>
        <view @click="payHandle('scoreType3')" class="buy-item">
          <view class="item-title">120 点</view>
          <view class="item-price"><text style="color:red">￥</text>10.00</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import AV from "../../utils/av-core-min";
  export default {
    data() {
      return {
        nextStepShare: false,
        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg',
        show: false,
        list: [{
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
          const { error } = await AV.Cloud.run('userShareTask')
          uni.showToast({
            title: '分享成功！',
            icon: 'success',
            mask: true
          })
          if (error) {
            uni.showToast({
              title: error,
              icon: 'none',
              mask: true
            })
            return
          }
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
      async payHandle(scoreType) {
        const openid = this.userInfo.authData.lc_weapp.openid
        try {
          const res = await AV.Cloud.run('wxPayScore', {
            openId: openid,
            scoreType
          })
          wx.requestPayment({
            ...res,
            success: () => {
              this.$store.dispatch('flushUserInfo')
              this.show = false
              uni.showToast({
                title: '充值成功',
                icon: 'success',
                mask: true
              })
            }
          })
        } catch (error) {
          uni.showToast({
            title: error.message.split(' ')[0],
            icon: 'none',
            mask: true
          })
        }
      },
      async signinHandle() {
        try {
          const { error } = await AV.Cloud.run('userSignIn')
          if (error) {
            uni.showToast({
              title: error,
              icon: 'none',
              mask: true
            })
            return
          }
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

    /deep/ .u-button {
      text-align: left;
      padding: 0 !important;
      height: auto !important;

      .u-cell {
        width: 100%;
      }
    }
  }

  .dian_num {
    font-size: 32px;
    margin-bottom: 15px;
  }

  .option_label {
    color: $uni-color-error;
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

  .item-title {}

  .item-price {
    margin-top: 8px;
    font-size: 15px;
  }
</style>
