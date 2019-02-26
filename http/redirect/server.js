const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    if (request.url === '/') {
        response.writeHead(301, {     //  302语义代表临时跳转，每次要服务器告诉要跳转到那个路径，如果是永久跳转，用301，告诉浏览器下次直接指定这个路径，不需要经过服务器再指定了，要慎重，浏览器会缓存下来，每次都读缓存。
            'Content-Type': 'text/html',
            'Location': '/new'
        })
        response.end('')
    }

    if (request.url === '/new') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('<div>this is content</div>')
    }

}).listen(8888)

console.log('server listening on 8888')