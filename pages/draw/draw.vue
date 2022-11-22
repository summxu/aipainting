<template>
  <view class="page-bottom">
    <image style="width: 100%;height: 260px;" src="../../static/touxiang2_head.png" />
    <view style="margin-top: -3px" class="container">
      <view class="item-top flex-row justify-between items-center">
        <view>
          <view class="keyword_label">关键词</view>
          <view class="xcc_label">想要一个什么头像</view>
        </view>
        <view>
          <u-button @click="$toPage('./example')" type="primary" size="mini" text="查看示例 >"></u-button>
        </view>
      </view>
      <u--textarea class="mt" v-model="value1" placeholder="输入关键词，如：可爱的猫，星空下的树"></u--textarea>
    </view>

    <view class="container mt ">
      <view class="item-top flex-row justify-between items-center">
        <view>
          <view class="keyword_label">推荐关键词</view>
        </view>
        <view>
          <u-button type="primary" size="mini" text="换一组"></u-button>
        </view>
      </view>

      <view class="keyword-boxs flex-wrap mt">
        <view v-for="(item,index) in tagsList" :key="index" class="xcc-tag">
          <u-tag :borderColor="item.color" :bgColor="item.color" size="mini" :text="item.text"></u-tag>
        </view>
      </view>
    </view>

    <view class="container mt ">
      <view class="item-top flex-row justify-between items-center">
        <view>
          <view class="keyword_label">风格选择（可选）</view>
        </view>
        <view>
          <u-button type="error" size="mini" @click="style = null" text="清除选择"></u-button>
        </view>
      </view>

      <view class="keyword-boxs flex-wrap mt">
        <u-grid col="4" :border="false">
          <u-grid-item @click="clickStyleHandle(item)" v-for="(item,index) in 10 " :key="index">
            <view class="style_item ">
              <view class="style_img_box">
                <image :class="['style_img',style === item ? 'style_img_box_active' : null]" src="../../static/placeholder.png" alt="" />
              </view>
              <view :class="['style_text',style === item ? 'style_text_active' : null]">油画</view>
            </view>
          </u-grid-item>
        </u-grid>
      </view>
    </view>

    <view class="mt flex-row pd">
      <u-button type="primary" shape="circle" text="生成（消耗3点）"></u-button>
    </view>

  </view>
</template>

<script>
import { rdmRgbColor } from '@/utils'
export default {
  data() {
    return {
      value1: '',
      style: null,
      tagsList: [
        {
          id: 1,
          text: '小猫',
          color: rdmRgbColor()
        },
        {
          id: 2,
          text: '二次',
          color: rdmRgbColor()
        },
        {
          id: 3,
          text: '赛博克',
          color: rdmRgbColor()
        },
        {
          id: 4,
          text: '简笔画',
          color: rdmRgbColor()
        },
        {
          id: 5,
          text: '彩色',
          color: rdmRgbColor()
        },
        {
          id: 6,
          text: '二次元',
          color: rdmRgbColor()
        },
        {
          id: 7,
          text: '小猫',
          color: rdmRgbColor()
        },
        {
          id: 8,
          text: '二次元',
          color: rdmRgbColor()
        },
        {
          id: 9,
          text: '赛博克',
          color: rdmRgbColor()
        },
        {
          id: 14,
          text: '简笔画',
          color: rdmRgbColor()
        },
        {
          id: 15,
          text: '彩色',
          color: rdmRgbColor()
        },
        {
          id: 16,
          text: '二次元',
          color: rdmRgbColor()
        }
      ]
    }
  },
  methods: {
    clickStyleHandle(item) {
      if (this.style === item) {
        this.style = null
      } else {
        this.style = item
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.keyword_label {
  margin-bottom: 5px;
}
.xcc-tag {
  margin: 0 8px 8px 0;
}

.style_item {
  margin-bottom: 8px;
}
.style_img {
  height: 100%;
  width: 100%;
}
.style_img_box {
  width: 65px;
  height: 65px;
}

.style_img_box_active {
  border: 4px solid $uni-color-primary;
}

.style_text_active {
  color: $uni-color-primary;
}

.style_text {
  text-align: center;
  margin-top: 5px;
}

.xcc_label {
  margin-bottom: 5px;
}
</style>
