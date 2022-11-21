<template>
  <view class="detail page-bottom">
    <view class="pd">
      <image src="../../../static/placeholder.png" class="main_image" mode=""></image>
    </view>

    <view class="container mb">
      <view class="xcc_label">作品ID：131277163125763</view>
      <view class="alert mt"> *本图片为用户输入关键词由AI生成，请在符合相关法律法规政策的情况下分享和使用，请勿生成或传播色情及铭感内容</view>
    </view>

    <view class="container">
      <view class="xcc_label">用户关键词</view>
      <view class="desc">猫咪，月亮，简笔画，彩色，好看，头像，开心</view>
    </view>
    <view class="container">
      <view class="xcc_label">风格</view>
      <view class="desc">赛博朋克</view>
    </view>
    <view class="container">
      <view class="xcc_label">迭代次数</view>
      <view class="desc">123</view>
    </view>
    <view class="container">
      <view class="xcc_label">用户关键词</view>
      <view class="desc">猫咪，月亮，简笔画，彩色，好看，头像，开心</view>
    </view>

    <view class="mt flex-row pd">

      <u-button class="button_bottom" type="success" shape="circle" text="保存图片"></u-button>
      <u-button type="primary" shape="circle" text="使用当前提示词让画头酱再画一次"></u-button>
    </view>



  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style>
  .main_image {
    border-radius: 8px;
    width: 100%;
    height: 350px;
  }

  .alert {
    color: #ff0606;
    font-size: 13px;
  }

  .desc {
    margin-top: 5px;
  }

  .button_bottom {
    width: 200px;
    margin-right: 10px;
  }
</style>
