/*
 * @Author: Chenxu
 * @Date: 2022-08-13 17:05:58
 * @LastEditTime: 2022-11-23 09:26:47
 * @Msg: Nothing
 */
import AV from "../utils/av-core-min";
import store from "../store/index";

module.exports = {
  onShow() {
    let pages = getCurrentPages();
    const {
      image,
      title
    } = store.getters.getShareObj
    if (!image) return
    if (pages.length >= 1) {
      this.$x.pageRouter = (pages[pages.length - 1]).route
      if (this.$x.pageRouter) {
        this.$x.mpShare = {
          title, // 分享标题
          path: '/pages/index/index', // 默认为当前页面路径
          imageUrl: image.serverData.url // 默认为当前页面的截图
        }
      }
      return;
    }
  },
  // 分享到好友
  async onShareAppMessage(el) {
    return this.$x.mpShare
  },
  // 分享到朋友圈
  onShareTimeline() {
    return this.$x.mpShare
  }
}
