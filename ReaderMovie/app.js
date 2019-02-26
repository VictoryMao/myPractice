App({
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicId: '',
    // 豆瓣官方限制第三方对豆瓣接口的调用,所以请求https://api.douban.com/v2/movie/top250
    // 虽然通过http://t.yushu.im/也可以访问到豆瓣api的数据，然而http请求在手机看不可以，所以上时光网获得数据
    // doubanBase: 'http://t.yushu.im/'
    urlBase: 'https://api-m.mtime.cn'
  },
  onLaunch: function () {
    // 小程序初始化完成时（全局只触发一次）
    // console.log('onLuanch')
  },
  onShow: function () {
    // 小程序启动，或从后台进入前台显示时
    // console.log('onShow')
  },
  onHide: function () {
    // 小程序从前台进入后台时
    // console.log('onHide')
  },
  onError: function () {
    // 小程序发生脚本错误，或者api调用失败时触发，会带上错误信息
    // console.log('onError')
  },
  onPageNotFound: function () {
    // 小程序要打开的页面不存在时触发，会带上页面信息回调该函数
    // console.log('onPageNotFound')
  }
})