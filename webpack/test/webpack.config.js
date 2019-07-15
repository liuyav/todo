const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    //publicPath: "dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: "标题"
    }),
    // 热更新模块需要的配置
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '192.168.1.71',
    port: 8000,
    //publicPath: "./src",
    //open: true,
    // 开启热替换
    hot: true,
    hotOnly: true,
    watchContentBase: true,
    liveReload: true,
    // 默认根路径
    contentBase: "./src"
  }
}
