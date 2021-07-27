/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-27 23:53:50
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 00:05:16
 */

module.exports = {
  devServer: {
      port:8080,
      proxy: {
      '/save': {
        target: 'http://localhost:3000', //服务端地址
        ws: true,  //如果要代理 websockets，配置这个参数
        changeOrigin: true // 允许跨域
      }
    }
  }
}
