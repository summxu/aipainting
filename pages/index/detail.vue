<template>
  <view class="detail page-bottom">
    <view class="pd">
      <image v-if="data.status == 1" v-for="(item,index) in data.images" :key="index" :src="item.serverData.url"
        class="main_image" mode=""></image>
      <view v-if="data.status == 0" class="dIng-box">
        <image src="../../static/waterfall/0.jpg" class="main_image" mode=""></image>
        <view class="dIng-text">
          画头酱作画中
        </view>
      </view>
    </view>

    <view v-if="!isExample" class="container mb">
      <view class="xcc_label">作品ID：{{data.objectId}}</view>
      <view class="alert mt"> *本图片为用户输入关键词由AI生成，请在符合相关法律法规政策的情况下分享和使用，请勿生成或传播色情及铭感内容</view>
    </view>

    <view class="container">
      <view class="xcc_label">{{!isExample ? '用户关键词' : '关键词'}}</view>
      <view class="desc">{{data.chinesePrompt}}</view>
    </view>
    <view class="container">
      <view class="xcc_label">风格</view>
      <view class="desc">{{data.promptStyle.serverData.title}}</view>
    </view>
    <view v-if="!isExample" class="container">
      <view class="xcc_label">迭代次数</view>
      <view class="desc">{{data.steps}}</view>
    </view>

    <view v-if="!isExample" class="mt flex-row pd">
      <view class="button_bottom">
        <u-button @click="handleDownImg" :disabled="data.status == 0" type="success" shape="circle" text="保存图片">
        </u-button>
      </view>
      <u-button @click="toDraw" type="primary" shape="circle" text="使用当前关键词让画头酱再画一次"></u-button>
    </view>

    <view v-else class="mt flex-row pd">
      <u-button @click="toDraw" type="primary" shape="circle" text="使用当前关键词开始作画"></u-button>
    </view>

  </view>
</template>

<script>
  import {
    navigateTo, switchTab
  } from '../../utils/navigate'
  export default {
    data() {
      return {
        data: {},
        isExample: false
      }
    },
    onLoad({
      type,
      data
    }) {
      this.data = JSON.parse(data)
      if (type == 2) {
        this.isExample = true
      }
    },
    methods: {
      toDraw() {
        uni.switchTab({
          url: '/pages/draw/draw?keyword=' + this.data.chinesePrompt,
        });
      },
      handleDownImg() {
        this.data.images.forEach(item => {
          uni.downloadFile({
            url: item.serverData.url,
            success: res => {
              if (res.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function() {
                    uni.showToast({
                      title: '保存成功',
                      icon: 'none'
                    });
                  },
                  fail: function() {
                    uni.showToast({
                      title: '保存失败，请稍后重试',
                      icon: 'none'
                    });
                  }
                });
              } else {
                uni.showToast({
                  title: '下载失败，请稍后重试',
                  icon: 'none'
                });
              }
            }
          });
        })
      }
    }
  }
</script>

<style>
  .dIng-box {
    position: relative;
  }

  .dIng-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    color: #666;
  }

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
    width: 200rpx;
    margin-right: 10px;
  }
</style>
