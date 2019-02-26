Page({
  onTap: function () {
    // 关闭页面
    // wx.redirectTo({
    //   url: '../posts/post',
    // })
    // 不关闭页面, 不能跳到tabbar页面，使用wx.navigateBack可以返回到原页面
    //  wx.navigateTo({
    //    url: '../posts/post',
    //  })
    wx.switchTab({
      url: '/pages/posts/post',
    })
  },
  // 页面关闭时执行
  onUnload: function () {
    // console.log(1)
  },
  // 页面隐藏时执行
  onHide: function () {
    console.log(2)
  }
})