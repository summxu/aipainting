<template>
  <view>
    <!-- <web-view src="https://www.baidu.com" /> -->
    <rich-text :nodes="string"></rich-text>
  </view>
</template>
<script>
export default {
  data() {
    return {
      string: ''
    }
  },
  created() {},
  onLoad({ type }) {
    if (type == 1) {
      this.string = '<p>使用帮助</p>'
      uni.setNavigationBarTitle({ title: '使用帮助' })
    }
    if (type == 2) {
      this.string = '<p>服务协议</p>'
      uni.setNavigationBarTitle({ title: '服务协议' })
    }
  },
  methods: {}
}
</script>
<style  lang="scss" scoped>
</style>
