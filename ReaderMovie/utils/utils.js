function covertToStarsArray(score) {
  var int = score.toString().substring(0, 1);
  var float = score.toString().substring(2, 3);
  //  整数部分是奇数还是偶数需要考虑一下，比如8.8和9.8 都显示4颗半星
  var number = (int % 2 === 0) ? int / 2 : ((int - 1) / 2).toString().slice(0, 1)  
  var arr = []  // 1:满星， 2:半星， 0：没星
  for (var i = 0; i < number; i++) {
    arr.push(1)
  }
  if (float > 0) {
    arr.push(2)
  }
  var num = 5- arr.length
  for (var j = 0; j < num; j++) {
    arr.push(0)
  }
  return arr
}

function http (url, callBack, type) {
  wx.request({
    url: url,
    success: function (res) {
      callBack(res.data, type)
    },
    fail: function () {
      console.log('error')
    }
  })
}
module.exports = {
  convertToStarsArray: covertToStarsArray,
  http: http
}