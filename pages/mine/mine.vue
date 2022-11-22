<template>
  <view class="personal page-bottom">
    <view class="personal-main container mb">
      <u-avatar :src="avatar" mode="square" size="50" class="u-avatar"></u-avatar>
      <view class="personal-info">
        <view class="">小兵徐徐</view>
        <view class="">ID：216361237</view>
      </view>
    </view>

    <view class="container mb">
      <view class="xcc_label mb">剩余可画头像的点数 </view>
      <view class="dian_num">20点 </view>

      <view class="flex-row mb">
        <u-button class="button_bottom1" type="primary" shape="circle" text="签到"></u-button>
        <u-button @click="show = true" class="button_bottom" type="success" shape="circle" text="充值"></u-button>
      </view>

      <view class="xcc_label mb">观看广告获得点数 </view>

      <view class="flex-row">
        <u-button type="primary" shape="circle" text="观 看 广 告 (0/99)"></u-button>
      </view>
    </view>

    <view class="options_box">
      <u-cell-group>
        <u-cell icon="share" title="分享到群里" :isLink="true" arrow-direction="right">
          <template #label>
            <view class="option_label">免费获取点数！</view>
          </template>
        </u-cell>
        <u-cell @click="$toPage('/pages/webview/webview?type=1')" icon="question-circle-fill" title="使用帮助" :isLink="true" arrow-direction="right"></u-cell>
        <u-cell @click="$toPage('/pages/webview/webview?type=2')" icon="calendar-fill" title="服务协议" :isLink="true" arrow-direction="right"></u-cell>
        <u-cell icon="server-fill" title="联系客服" :isLink="true" arrow-direction="right"></u-cell>
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
  export default {
    data() {
      return {
        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg',
        show: false,
        list: [{
          name: '收藏',
          id: 'favorites',
          icon: 'star-fill',
          iconBackground: '#398c0c',
        }, {
          name: '相册',
          id: 'photoAlbum',
          icon: 'photo-fill',
          iconBackground: '#5e2d88',
        }, {
          name: '卡包',
          id: 'cardPackage',
          icon: 'grid-fill',
          iconBackground: '#33696c',
        }, {
          name: '表情',
          id: 'expression',
          icon: 'gift-fill',
          iconBackground: '#833456',
        }, {
          name: '设置',
          id: 'setUp',
          icon: 'setting-fill',
          iconBackground: '#3b2021',
        }],
      }
    },
    methods: {
      onClick(item) {},
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
    margin-left: 5px;
  }

  .button_bottom1 {
    margin-right: 5px;
  }

  .options_box {
    background-color: #fff;
  }

  .dian_num {
    font-size: 32px;
    margin-bottom: 15px
  }

  .option_label {
    color: $uni-color-error;
  }
  
  .buy-items{
    padding: 30px;
  }
  .buy-item{
    padding: 10px 20px;
    border: 1px solid $uni-color-primary;
    background-color: #fafafa;
    border-radius: 8px;
  }
  .item-title{}
  .item-price{
    margin-top: 8px;
    font-size: 15px;
    color: $uni-color-primary;
  }
</style>
