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

    const host = request.headers.host

//   Cookie: 通过Set-Cookie设置，下次请求会自动带上，键值对的形式，可以设置多个， 属性：max-age和expires设置过期时间，Secure只在https的时候发送，设置HttpOnly无法js无法通过document.cookie访问
//           有域的访问权限设定，当前这个域写了这个cookie之后其他的域是不能访问的
    if (request.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8')
        if (host === 'a.test.com') {
            response.writeHead(200, {
                'Content-Type': 'text/html',     //  text/plain  纯字符内容 text/html  将html内容解析
                'Set-Cookie': ['id=123; max-age=3', 'abc=456; domain=a.test.com; HttpOnly']   //  max-age: 这个cookie的有效时间， expires：到什么时间点过期
            })
        }
        response.end(html)
    }

}).listen(8888)
console.log('Server running at http://127.0.0.1:8888/')