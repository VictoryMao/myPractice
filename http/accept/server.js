const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    const html = fs.readFileSync('test.html')

    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Encoding': 'gzip'
    })
    response.end(zlib.gzipSync(html))
//  request header字段  Accept: 希望服务器返回的数据类型,不限一种，   Accept-Encoding：主要用来限制服务端如何对数据进行压缩，Accept-Language: 浏览器加的，希望接收的语言，q代表权重，数字越大，权重越大， User-Agent: 表示浏览器相关信息

//  response header对应  content-type、content-encoding、content-language
}).listen(8888)


