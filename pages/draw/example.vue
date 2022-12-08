<template>
  <view class="index-box">
    <LoadRefresh ref="loadRefresh" :request="getList" :init="true" @complete="completeHandle">
      <view class="waterfall-item-container">
        <view v-for="item in dataList" :key="item.objectId" @click="() => onClick(item)" class="waterfall-item">
          <image v-if="item.status == 1 && item.images" v-for="(ele,key) in item.images" :key="key"
            :src="ele.serverData.url" mode="widthFix"></image>
          <view v-if="item.status == 2 || item.status == 0" class="dIng-box">
            <image :src="'../../static/waterfall/0.jpg'" mode="widthFix">
              <view class="dIng-text">
                画头酱<br>作画中
              </view>
          </view>
          <view class="content">
            <view class="u-line-1">{{item.title}}</view>
          </view>
        </view>
      </view>
    </LoadRefresh>
  </view>
</template>

<script>
  import LoadRefresh from '@/components/load-refresh/load-refresh.vue'
  import AV from '../../utils/av-core-min.js'
  import { mapState } from 'vuex'
  export default {
    components: {
      'LoadRefresh': LoadRefresh
    },

    data() {
      return {
        dataList: [],
      }
    },
    computed: {
      ...mapState(['indexFlush'])
    },
    onShow() {
      if (this.indexFlush) {
        this.$store.commit('SET_INDEX_FLUSH', false)
        uni.startPullDownRefresh({
          success: (result) => {},
          fail: (error) => {}
        })
      }
    },
    onReachBottom() {
      this.$refs.loadRefresh.loadMore()
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.$refs.loadRefresh.query(1)
    },
    methods: {
      completeHandle(event) {
        uni.stopPullDownRefresh();
        this.dataList = event
      },
      // 瀑布流组件点击事件
      onClick(data, index, tag) {
        uni.navigateTo({
          url: `/pages/index/detail?data=${JSON.stringify(data)}&type=2`,
        })
      },
      // 获取数据
      getList(params) {
        return AV.Cloud.run('getPaintingSample', params)
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #e8e8e8;
  }

  .dIng-box {
    position: relative;
  }

  .dIng-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #666;
  }

  .waterfall-item {
    padding: 16rpx;
    background-color: #fff;
    border-radius: 4px;
    font-size: 28rpx;
    color: #666;
    width: calc(50% - 5px);
    margin-bottom: 10px;

    image {
      display: block;
      width: 100%;
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


  .waterfall-item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: -20px;
  }

  .index-box {
    padding: 0 10px;
  }
</style>
