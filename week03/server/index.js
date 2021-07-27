/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-27 23:31:47
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 00:13:29
 */
// var child = require('child_process');
 
// child.exec('npm run build', function(err, sto) {
//     console.log(123);//sto才是真正的输出，要不要打印到控制台，由你自己啊
// })
const express = require('express')
let fs = require('fs')
const app = express()
const port = 3000

app.post('/save', (req, res) => {
  console.log(req)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})