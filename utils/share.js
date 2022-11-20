/*
 * @Author: Chenxu
 * @Date: 2022-08-13 17:05:58
 * @LastEditTime: 2022-08-18 14:03:31
 * @Msg: Nothing
 */
module.exports = {
	onShow() {
		let pages = getCurrentPages();
		if (pages.length >= 1) {
			this.$x.pageRouter = (pages[pages.length - 1]).route 
			if(this.$x.pageRouter){
				this.$x.mpShare = {
					title: '画头酱-只能AI绘画平台！', // 分享标题
					path: '/pages/index/index', // 默认为当前页面路径
					imageUrl: '/static/share.jpg' // 默认为当前页面的截图
				}
			}
			return ;
		}		
	},
	// 分享到好友
	onShareAppMessage(el) {
		return this.$x.mpShare
	},
	// 分享到朋友圈
	onShareTimeline(){
		return this.$x.mpShare
	}
}
