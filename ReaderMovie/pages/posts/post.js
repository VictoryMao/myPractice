const postsData = require('../../data/posts-data.js')
Page({
  // 小程序总是会读取data对象来做数据绑定，这个动作我们成为动作A
  // 而这个动作A的执行，是在onLoad事件执行之后发生的
  onLoad: function () {
    this.setData({
      post_content: postsData.postList,
    })
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  onShow: function () {
    var postsView = wx.getStorageSync('postsView')
    for (var i in postsView) {
      postsData.postList[i].view = postsView[i]
    }
    this.setData({
      post_content: postsData.postList,
    })
  }
})