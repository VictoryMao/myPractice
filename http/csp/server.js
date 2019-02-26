const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    if (request.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8')
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Security-Policy': 'connect-src script-src \'self\' https://code.jquery.com/; form-action \'self\'; report-uri /report; http: https:'
                                                                                                        // default-src限制全局 只能通过http或者https的方式进行加载，不能直接写在html里面, 加上\'self\'表示同一域名下,再加上后面的域名表示这个域名不被限制
                                                                                                        //  表单提交不受default-src的限制, form-action \'self\' 可以
                                                                                                        //  default-src把图片也给拦截掉了，如果只想拦截脚本，可以改成script-src
                                                                                                        //  在这里写的效果跟在html页面里设置meta标签的效果是一样的
                                                                                                        //  用connect-src可以拦截掉ajax请求
        })
        response.end(html)
    } else {
        response.writeHead(200, {
            'Content-Type': 'application/javascript'
        })
        response.end('console.log("loaded script")')
    }

}).listen(8888)

console.log('server listening on 8888')
//  Content-Security-Policy（内容安全策略）作用
//  1、限制资源获取，从哪里获取，请求发到哪里   2、报告资源获取越权（在网页中获取到一些不应该获取的资源的情况下）
//  限制方式  1、通过default-src限制全局所有跟链接请求有关的东西，都可以去限制它的作用范围， 根据特定的资源类型来限定资源： font-src、img-src、script-src、content-src...