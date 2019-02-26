//  如果webpack.config.js 存在， 则webpack命令将默认选择使用它。

//  webpack1 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。
//  为了从 JavaScript 模块中 import 一个 CSS 文件，你需要在 module 配置中 安装并添加 style-loader 和 css-loader：npm install --save-dev style-loader css-loader
//  webpack1 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader。
//  这使你可以在依赖于此样式的文件中 import './style.css'。现在，当该模块运行时，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。



//  使用file-loader 可以把背景和图标这些内容混合到css中, 不安装就在css里写入样式的话会报错
//  loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。 比如a17cc46b09d...


//  加载字体：file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录


//  加载数据：如 JSON 文件，CSV、TSV 和 XML。 JSON文件是内置的，引入JSON文件默认将正常运行，要导入 CSV、TSV 和 XML，可以使用 csv-loader 和 xml-loader
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    mode: 'production',           //  none, development, production
    // entry: './src/index.js',    //   告诉webpack从哪个模块（文件）开始构建依赖关系图，webpack将会以此为起点，找到所有的依赖并打包最终形成bundle.
                                   //   loader的作用是将所有类型的文件转换为可以被 dependency graph 直接应用的文件，也就是Webpack封面图--将所有依赖模块打包成静态资源
    entry: {
      app: './src/index.js',
      // print: './src/print.js'   如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，会发生什么？生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。
                                   //  我们用 HtmlWebpackPlugin 来解决这个问题。
      // print1: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: './dist/'       运行dist中生成的index.html文件就不需要了
        publicPath: '/'
    },
    devtool: 'inline-source-map',            //    使用source-map就会知道具体报错在哪个文件
    devServer: {
        contentBase: './dist',    //    告诉开发服务器(dev server)，在哪里查找文件  告知 webpack1-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist'])  //   使用这个插件可以清空旧文件
        new HtmlWebpackPlugin({              //   安装并配置它之后再打包，在dist文件里会生成一个index.html
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
         rules: [
           {
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           },{
             test: /\.(png|svg|jpg|gif)$/,
             use: [
               'file-loader'
             ]
           },{
             test: /\.(woff|woff2|eot|ttf|otf|ttc)$/,
             use: [
                'file-loader'
             ]
            }, {
             test: /\.(csv|tsv)$/,
             use: [
                 'csv-loader'
             ]
            }, {
             test: /\.xml$/,
             use: [
                 'xml-loader'
             ]
           }
         ]
   }
}