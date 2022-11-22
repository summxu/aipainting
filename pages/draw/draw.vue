<template>
  <view class="page-bottom">
    <u-swiper radius="0" height="260" :list="list2" keyName="image" :autoplay="true" :interval="10000" circular></u-swiper>

    <view class="container mt ">
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
        <u-tag :borderColor="item.color" v-for="(item,index) in tagsList" :key="index" :bgColor="item.color" size="mini" class="xcc-tag" :text="item.text"></u-tag>
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
        <view @click="clickStyleHandle(item)" v-for="(item,index) in 10 " :key="index" class="style_item flex-col justify-center ">
          <view class="style_img_box">
            <image :class="['style_img',style === item ? 'style_img_box_active' : null]" src="../../static/placeholder.png" alt="" />
          </view>
          <view :class="['style_text',style === item ? 'style_text_active' : null]">油画</view>
        </view>
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
          text: '二次元',
          color: rdmRgbColor()
        },
        {
          id: 3,
          text: '赛博朋克',
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
          text: '赛博朋克',
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
      ],
      list2: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
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
  margin: 0 16px 10px;
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
</style>
