<template>
  <view class="waterfall-item-container">
    <view class="waterfall-item" @tap="onTap">
      <image v-if="params.status && params.images" v-for="(item,key) in params.images" :key="key" :src="item.serverData.url"
        mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
      <image v-if="!params.status" :src="'../../static/waterfall/0.jpg'" mode="widthFix" @load="emitHeight" @error="emitHeight">
      </image>
      <view class="content">
        <view class="u-line-2">{{params.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "helangWaterfallItem",
    options: {
      virtualHost: true
    },
    props: {
      params: {
        type: Object,
        default () {
          return {}
        }
      },
      tag: {
        type: String | Number,
        default: ''
      },
      index: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {

      };
    },
    methods: {
      // 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
      emitHeight(e) {
        const query = uni.createSelectorQuery().in(this);
        query.select('.waterfall-item-container').boundingClientRect(data => {
          let height = Math.floor(data.height);
          this.$emit("height", height, this.$props.tag);
        }).exec();
      },
      onTap() {
        this.$emit("click", this.$props.index, this.$props.tag);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .waterfall-item {
    padding: 16rpx;
    background-color: #fff;
    border-radius: 4px;
    font-size: 28rpx;
    color: #666;

    image {
      display: block;
      width: 100%;
      // 默认设置一个图片的大约值
      height: 350rpx;
    }

    .content {
      margin-top: 16rpx;

      .money {
        color: #fa3534;
        margin-top: 8rpx;
      }

      .label {
        background-color: #fa3534;
        color: #fff;
        font-size: 20rpx;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
      }

      .shop-name {
        font-size: 20rpx;
        color: #999;
      }
    }
  }
</style>
