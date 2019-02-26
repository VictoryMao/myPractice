// pages/movies/movies-more/movies-more.js
const utils = require('../../../utils/utils.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    allMovies: [],
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataUrl = '';
    var movieType = '';
    wx.showNavigationBarLoading()
    switch (options.movieType) {
      case '正在售票':
        {
          dataUrl = app.globalData.urlBase + '/PageSubArea/HotPlayMovies.api?locationId=319';
          movieType = 1;
        }
        break;
      case '正在热映': 
        {
          dataUrl = app.globalData.urlBase + '/Showtime/LocationMovies.api?locationId=319';
          movieType = 2;
        }
        break;
      case '即将上映':
        {
          dataUrl = app.globalData.urlBase + '/Movie/MovieComingNew.api?locationId=319';
          movieType = 3;
        }
        break;
    }
    this.setData({
      movieType: movieType,
      dataUrl: dataUrl,
      title: options.movieType
    })
    utils.http(dataUrl, this.processMovieData, movieType)
  },
  processMovieData: function (movies, type) {
    var arr = []
    //  每个接口返回的字段都不一样
    if (type === 1) {
      movies.movies.forEach(function (item, index) {
        if (item.titleCn.length > 6) {
          item.titleCn = item.titleCn.slice(0, 6) + '...'
        }
          var obj = {
            title: item.titleCn,
            coverImg: item.img,
            score: (item.ratingFinal + '.0').slice(0, 3),
            movieId: item.movieId,
            star: utils.convertToStarsArray(item.ratingFinal)
          }
          arr.push(obj)
      })
    } else if (type === 2) {
      movies.ms.forEach(function (item, index) {
        if (item.t.length > 6) {
          item.t = item.t.slice(0, 6) + '...'
        }
          var obj = {
            title: item.t,
            coverImg: item.img,
            score: (item.r + '.0').slice(0, 3),
            star: utils.convertToStarsArray(item.r),
            movieId: item.id
          }
          arr.push(obj)
      })
    } else if (type === 3) {
      movies.moviecomings.forEach(function (item, index) {
        if (item.title.length > 6) {
          item.title = item.title.slice(0, 6) + '...'
        }
          var obj = {
            title: item.title,
            coverImg: item.image,
            score: 5 + item.id.toString().slice(1, 2) % 5 + '.0',  //这个接口的电影没有分数，只好根据它的id来造了
            star: utils.convertToStarsArray(5 + item.id.toString().slice(1, 2) % 5),
            movieId: item.id
          }
          arr.push(obj)
      })
    }
    this.setData({
      allMovies: arr
    })
    // 想做下拉刷新功能，由于api不提供获取部分数据的功能，只能自己假装
    this.setData({
      movies: this.data.allMovies.slice(0, 10)
    })
    wx.stopPullDownRefresh()
  },
  lower: function () {
    if (this.data.movies.length < this.data.allMovies.length) {
      this.setData({
        movies: this.data.allMovies.slice(0, this.data.movies.length + 10)
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
    wx.hideNavigationBarLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 需要在json文件里配置 enablePullDownRefresh 才能开启下拉刷新功能
    this.setData({
      movies: [],
      allMovies: []
    })
    utils.http(this.data.dataUrl, this.processMovieData, this.data.movieType)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})