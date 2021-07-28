<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-28 15:11:06
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 17:44:51
-->
<template>
  <div class="main">
    <div class="main-container">
      <MyEditor ref="MyEditor" class="my-editor" />
      <div class="show-container">
        <Content :isShow="isShow" />
      </div>
    </div>
    <div class="btn-content">
      <el-button type="primary" plain id="fileImport" @click="clickLoad"
        >导入</el-button
      >
      <input type="file" id="files" ref="refFile" @change="fileLoad" />
      <el-button type="primary" id="fileImport" @click="saveClick"
        >保存并预览</el-button
      >
    </div>
  </div>
</template>
 
<script>
import MyEditor from './components/myEditor'
import Content from './components/content.vue'
import axios from 'axios'
export default {
  components: {
    MyEditor,
    Content,
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    clickLoad() {
      this.$refs.refFile.dispatchEvent(new MouseEvent('click'))
    },
    fileLoad() {
      const selectedFile = this.$refs.refFile.files[0]
      let reader = new FileReader()
      reader.readAsText(selectedFile)
      reader.onload = (e) => {
        this.$refs.MyEditor.monacoEditor.executeEdits('insert-code', [
          {
            range: {
              startLineNumber: 1,
              startColumn: 1,
            },
            text: e.target.result,
          },
        ])
      }
    },
    async saveClick() {
      this.isShow = false
      try {
        let ret = await axios.post('http://localhost:9000/saveApi', {
          content: this.$refs.MyEditor.codes,
        })
        if (ret.data.code === '200') {
          this.isShow = true
        } else {
          console.log(ret.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
 
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.main-container .btn-content {
  height: 100%;
  width: 100%;
  position: relative;
}
.btn-content {
  margin-top: 18px;
}
.my-editor {
  width: 50%;
}
#files {
  width: 96px;
  height: 36px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
#fileImport {
  margin-right: 12px;
}
.show-container {
  width: 50%;
  margin-left: 12px;
  border: 1px solid #dcdcdc;
}
</style>
<style>
.el-button {
  width: 96px;
  height: 36px;
  font-size: 12px;
}
</style>