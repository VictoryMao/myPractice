const http = require('http')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    response.writeHead(200, {   // 没看到这句话的话，浏览器会把请求的内容给拦截掉，并且在控制台 报跨域的错
        'Access-Control-Allow-Origin': '*',   //  http://127.0.0.1:8888
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'get, post, PUT',
        'Access-Control-Max-Age': '1000'      //    允许以这种方式进行跨域的,一个请求的最长时间，1000s之内不需要再发送预请求验证了
    })
    response.end('123')
}).listen(8887)

console.log('server listening on 8887')