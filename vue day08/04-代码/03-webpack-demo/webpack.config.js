/* 
  webpack.config.js文件是webpack默认会读取的配置文件，名字固定的
  webpack是运行nodejs环境下的，在webpack.config.js文件中可以使用nodejs的语法
*/
const path = require('path')
// 导入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口：你要对哪个文件进行打包
  entry: './src/main.js',
  // 出口：你要把文件打包到哪儿去
  output: {
    // 打包的路径
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 模式：打包的模式
  mode: 'development',
  // 配置webpack的插件
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  // 配置loader
  module: {
    // 规则
    rules: [
      // 处理css文件的规则
      {
        // 用于匹配对应的文件
        test: /\.css$/,
        // 匹配到的文件用什么loader来处理
        // css-loader只能把css文件进行处理，不能让样式生效
        // style-loader: 把css-loader处理的结果添加到页面中
        // 处理顺序：从右到左
        use: ['style-loader', 'css-loader']
      },
      // 配置less文件的规则
      // less:处理less的语法
      // less-loader: 解析less文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // 配置处理图片的loader
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            // 如果图片小于30kb，会把图片打包成base64
            // 如果图片大于30kb, url-loader交给file-loader
            options: {
              limit: 10 * 1024
            }
          }
        ]
      },
      // 配置处理字体图标
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: [
          {
            loader: 'url-loader',
            // 如果图片小于30kb，会把图片打包成base64
            // 如果图片大于30kb, url-loader交给file-loader
            options: {
              limit: 10 * 1024
            }
          }
        ]
      },
      // 处理音视频
      {
        test: /\.(mp3|mp4|avi|rmvb)$/,
        use: [
          {
            loader: 'url-loader',
            // 如果图片小于30kb，会把图片打包成base64
            // 如果图片大于30kb, url-loader交给file-loader
            options: {
              limit: 10 * 1024
            }
          }
        ]
      },
      // 配置babel处理高版本的js语法
      {
        test: /\.js$/,
        // 排除
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 预设：配置哪些版本的js代码需要被babel出来，表示es6以上的语法都需要被处理
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // webpack-dev-server的配置
  devServer: {
    open: true,
    port: 3000,
    hot: true
  }
}
