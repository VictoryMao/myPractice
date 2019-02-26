const utils = require("../../utils/utils.js")
const app = getApp()
Page({
  data: {
    movieList: Array(3).join(',').split(',')
  },
  // 监听页面加载
  onLoad: function () {
    // 具体文档都在github上的api仓库下的时光网
    // 正在售票
    var inSellingUrl = app.globalData.urlBase + '/PageSubArea/HotPlayMovies.api?locationId=319';
    // 正在热映
    var inTheatersUrl = app.globalData.urlBase + '/Showtime/LocationMovies.api?locationId=319';
    // 即将上映
    var comingSoonUrl = app.globalData.urlBase + '/Movie/MovieComingNew.api?locationId=319';
  
    wx.showNavigationBarLoading()

    utils.http(inSellingUrl, this.processMovieData, 1)
    utils.http(inTheatersUrl, this.processMovieData, 2)
    utils.http(comingSoonUrl, this.processMovieData, 3)
  },
  // 页面初次渲染完成
  onReady: function () {
    wx.hideNavigationBarLoading()
  },
  processMovieData: function (movies, type) {
    var data = {} 
    var arr = []
    //  每个接口返回的字段都不一样
    if (type === 1) {
      data.type = '正在售票'
      movies.movies.forEach(function (item, index) {
        if (index < 3) {
          var obj = {
            title: item.titleCn,
            coverImg: item.img,
            score: (item.ratingFinal + '.0').slice(0, 3),
            movieId: item.movieId,
            star: utils.convertToStarsArray(item.ratingFinal)
          }
          arr.push(obj)
        }
      })
    } else if (type === 2) {
      data.type = '正在热映'
      movies.ms.forEach(function (item, index) {
        if (index < 3) {
          var obj = {
            title: item.t,
            coverImg: item.img,
            score: (item.r + '.0').slice(0, 3),
            star: utils.convertToStarsArray(item.r),
            movieId: item.id
          }
          arr.push(obj)
        }
      })
    } else if (type === 3) {
      data.type = '即将上映'
      movies.moviecomings.forEach(function (item, index) {
        if (index < 3) {
          var obj = {
            title: item.title,
            coverImg: item.image,
            score: 5 + item.id.toString().slice(1, 2) % 5 + '.0',  //这个接口的电影没有分数，只好根据它的id来造了
            star: utils.convertToStarsArray(5 + item.id.toString().slice(1, 2) % 5),
            movieId: item.id
          }
          arr.push(obj)
        }
      })
    }
    data.movies = arr
    var movieArr = this.data.movieList
    movieArr.splice((type - 1), 1, data)
    this.setData({
      movieList: movieArr
    })
  },
  // 跳到更多电影页面
  goMove: function (event) {
    wx.navigateTo({
      url: './movies-more/movies-more?movieType=' + event.currentTarget.dataset.type,
    })
  }
})