/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-27 06:28:24
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-27 06:42:26
 */
let editor = {
  name: 'editor',
  id: 1,
}
function editorFnc(params) {
  console.log(params)
  params.id = editor.id
  return params
}

export default editorFnc
