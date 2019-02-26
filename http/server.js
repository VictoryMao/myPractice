//  可以用http.createServer()方法创建服务器，并使用listen方法绑定8888端口。函数通过request，response参数来接收和响应数据。


var http = require('http')      //    请求Node.js自带的http模块
var fs = require('fs')

http.createServer(function (request, response) {
//    发送HTTP头部
//    HTTP状态值：200:ok
//    内容类型：text/plain
//     response.wr+---------------iteHead(200, {'Content-Type':'text/plain'})
//     response.end('hello world\n')

    console.log('request come', request.url)

    if (request.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8')
        response.writeHead(200, {
            'Content-Type': 'text/html'     //  text/plain  纯字符内容 text/html  将html内容解析
        })
        response.end(html)
    }

    if (request.url === '/script.js') {
        // response.writeHead(200, {
        //     'Content-Type': 'text/javascript',
        //     'Cache-Control': 'max-age=1000, no-cache',    //  url没变的情况下还是从memory cache去读，没有去加载服务端提供的新的文件， cache-control是客户端缓存，如果设置了，直接在客户端缓存，不会经过服务端的验证
        //     'Last-Modified': '123',                                            //  解决方法，就url变化
        //     'Etag': '777'                                    //  设置了no-cache之后，每次浏览器发起对一个已经设置了cache-control的资源的一个请求的时候，它都会要到服务器端进行一个资源的验证，验证完之后，如果确定这个资源可以使用缓存，
        //                                                      //  那么它才会读取本地的缓存 而如果设置的是no-store,它会忽略掉任何有关缓存的东西。
        // //    验证头  1、Last-Modified  2、Etag
        // //    Last-Modified(上次修改时间)， 配合if-modified-since/if-unmodified-since使用   对比上次修改时间来验证资源是否需要更新
        // //       Etag，更加严格的验证， 主要通过数据签名来验证，我们的资源对它的内容会产生唯一的签名，只要内容有任何修改，2次签名就会不一样，对比浏览器传过来的签名和服务器存的签名是否一致
        // //    对比资源的签名判断是否使用缓存
        // //   第一次请求时服务器会在响应头返回last-modified和etag2个字段（如果设置了的话),第二次请求这个资源的时候浏览器会在请求头通过If-Modified-Since带上Last-Modified的值，通过If-None-Match带上Etag的值给服务器进行验证。
        // })   如果Cache-Control设置了no-store, 则任何有关缓存的东西都会被忽略掉



        //   Cookie: 通过Set-Cookie设置，下次请求会自动带上，键值对的形式，可以设置多个， 属性：max-age和expires设置过期时间，Secure只在https的时候发送，设置HttpOnly无法js无法通过document.cookie访问



        const etag = request.headers['if-none-match']
        if (etag === '777') {
            response.writeHead(304, {         //    304：Not Modified   资源没有修改
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('')
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000, no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('console.log("script loaded twice")')
        }

    }

}).listen(8888)
console.log('Server running at http://127.0.0.1:8888/')