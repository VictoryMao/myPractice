import './foo';
//  通过运行 npm run build可以将babel转化的结果，生成到lib目录下的person.js，具体的请看.babelrc配置文件

//  通过webpack命令将bebel转化的结果打包压缩到person.compiled.js文件

//  在没安装babel-polyfill插件之间，可以看到两个文件的结果是一样的（只是由于.babelrc文件配置不转化foo.js文件，所以通过npm run build 命令转化的文件没有foo.js文件内容而已）
//  可以看到，转化结果只是对箭头函数等语法进行了转化，而新的api Promise是完全不会被转化的。

//  网上说安装babel-polyfill可以解决这个问题，然而安装了之后引用报错。。。



//  总而言之
//  babel只能在构建过程中转译语法糖，比如说将ES7/ES6/JSX中的语法部分（例如箭头函数）转译成ES5。
//
//  而polyfill则是解决原生对象的问题，比如说你的浏览器不支持Promise，babel就给你建一个Promise供你使用。
//
//  所以，polyfill是肯定得在浏览器运行的


class person {
    constructor () {
        this.name = 'maomaomao';
    }
    sayName () {
        console.log(`my name is${this.name}`);
    }
}
var p = new Person();
p.sayName();

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('测试一下babel能不能转新的api Promise')
    }, 1000)
})