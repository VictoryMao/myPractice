const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    const html = fs.readFileSync('test.html', 'utf8')
    const img = fs.readFileSync('1.png')
    if (request.url === '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html)
    } else {     //    图片一样，但是url不同，还是会去重新请求图片的， 谷歌只能并发6个tcp连接，把网络调慢，可以看到第7张图片和第6张图片的connection id 是一样的，复用了(默认connection:keep-alive情况下)
        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Connection': 'close'    //
        })
        response.end(img)
    }
}).listen(8888)

console.log('server listening on 8888')