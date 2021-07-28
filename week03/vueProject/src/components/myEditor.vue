<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-28 15:11:06
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 17:49:12
-->
<template>
  <div class="myEditor">
    <div id="container" ref="container" style="height: 600px"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import axios from 'axios'
export default {
  data() {
    return {
      codes: `<template>\n\t<div>\n\t\t<div class="target">This is a demo page!</div>\n\t</div>\n</template>\n\n<style>\n.target {\n\tfont-size: 14px;\n\tcolor: #323232;\n\tfont-weight: 600;\n\ttext-align: center;\n}\n</style>\n`, //编辑器内容
      monacoEditor: null,
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    async initEditor() {
      this.$refs.container.innerHTML = ''
      this.monacoEditor = monaco.editor.create(this.$refs.container, {
        value: this.codes,
        automaticLayout: true,
        language: 'html',
        fontSize: '18px',
        theme: 'vs-dark',
      })
      // 初始化服务器相关操作
      this.$parent.isShow = false
      try {
        let ret = await axios.post('http://localhost:9000/runnerApi', {
          content: this.codes,
        })
        if (ret.data.code === '200') {
          this.$parent.isShow = true
        } else {
          console.log(ret.data.message)
        }
      } catch (error) {
        console.log(error)
      }
      this.monacoEditor.onDidChangeModelContent(() => {
        //编辑器内容changge事件
        console.log('我改变了！！！', this.monacoEditor.getValue())
        this.codes = this.monacoEditor.getValue()
      })
      //编辑器随窗口自适应
      window.addEventListener('resize', () => {
        this.initEditor()
      })
    },
  },
}
</script>
<style scoped>
#container {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>