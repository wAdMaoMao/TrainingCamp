/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-27 23:53:50
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 17:40:41
 */

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
  }
}
