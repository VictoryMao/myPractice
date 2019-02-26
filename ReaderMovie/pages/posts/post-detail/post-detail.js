const postsData = require('../../../data/posts-data.js')
// 我发现用这个api只有在真机调试的时候才能听见声音，而且不会看到播放器。
const innerAudioContext = wx.createInnerAudioContext()
// src不能用本地的，因为小程序总的大小就不能超过1M啊
innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
innerAudioContext.autoplay = false

// getApp()可以得到App.js文件的数据
const appData = getApp().globalData    //  通过全局的变量来记录当前音乐的播放情况，不然有时候切换后台后回来页面图片与音乐播放情况不相符

Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function (option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.setData({
      postId: postId,
      postData: postData,
      isPlayingMusic: appData.g_currentMusicId === postId ? appData.g_isPlayingMusic : false
    })
    // 记录文章收藏情况
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
          collected: postCollected
      })
    } else {
        var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync('posts_collected', postsCollected);
    }
    // 记录文章收藏情况
    var postsView = wx.getStorageSync('postsView')
    if (postsView) {
      if (postsView[postId]) {
        postsView[postId]++
      } else {
        postsView[postId] = 1
      }
    } else {
      postsView = {}
      postsView[postId] = 1
    }
    wx.setStorageSync('postsView', postsView)

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })

    innerAudioContext.onPause(() => {
      console.log('暂停播放')
    })

    var that = this

    // 监听后台音乐播放
    wx.onBackgroundAudioPlay(function () {
      appData.g_isPlayingMusic = true
      if (appData.g_currentMusicId === that.data.postId) {
        that.setData({
          isPlayingMusic: true
        })
      }
    })
    // 音乐暂停
    wx.onBackgroundAudioPause(function () {
      appData.g_isPlayingMusic = false
      that.setData({
        isPlayingMusic: false
      })
    })
    // 音乐播完停止
    wx.onBackgroundAudioStop(function () {
      appData.g_isPlayingMusic = false
      that.setData({
        isPlayingMusic: false
      })
    })
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    // backgroundAudioManager.onPlay(function () {
    //   that.setData({
    //     isPlayingMusic: true
    //   })
    // })
    // backgroundAudioManager.onPause(function () {
    //   that.setData({
    //     isPlayingMusic: false
    //   })
    // })
  },
  onCollectionTap: function (event) {
    var postsCollection = wx.getStorageSync('posts_collected');
    var postsCollected = !postsCollection[this.data.postId];
    postsCollection[this.data.postId] = postsCollected;
    // 更新文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollection);

    this.setData({
        collected: postsCollected
    })
    wx.showToast({
      title: postsCollected ? '收藏成功' : '取消收藏'
    })
  }, 
  onShareTap: function () {
    var itemList = [
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        wx.showModal({
          title: itemList[res.tapIndex]
        })
      }
    })
  },
  onMusicTap: function () {
    if (!this.data.isPlayingMusic) {
      appData.g_isPlayingMusic = true
      appData.g_currentMusicId = this.data.postId
      this.setData({
        isPlayingMusic: true
      })
      wx.playBackgroundAudio({
        dataUrl: this.data.postData.music.url,
        title: this.data.postData.music.title,
        coverImgUrl: this.data.postData.music.coverImg
      })
    } else {
      wx.pauseBackgroundAudio()
      appData.g_isPlayingMusic = false
      appData.g_currentMusicId = ''
      this.setData({
        isPlayingMusic: false
      })
    }
  }
})