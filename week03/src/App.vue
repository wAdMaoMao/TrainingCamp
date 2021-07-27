<template>
  <div class="main-container">
    <MyEditor
      class="my-editor"
      :language="'javascript'"
      :codes="javascriptCodes"
      @onMounted="javascriptOnMounted"
      @onCodeChange="javascriptOnCodeChange" />
    <div class="btn-content">
      <el-button
        type="primary"
        plain
        id="fileImport"
        @click="clickLoad"
      >浏览</el-button>
      <input
        type="file"
        id="files"
        ref="refFile"
        @change="fileLoad"
      />
      <el-button
        type="primary"
        id="fileImport"
        @click="saveClick"
      >保存</el-button>
    </div>
  </div>
</template>
 
<script>
 import MyEditor from './components/myEditor'
 import axios from 'axios'
export default {
  components:{
    MyEditor
  },
  data () {
    return {
      htmlCodes:'<div>This is html</div>',
      javascriptCodes:'',
      cssCodes:'body{}',
      htmlEditor:null,
      jsEditor:null,
      cssEditor:null,
    }
  },
  methods:{
    htmlOnMounted(edit){
      this.htmlEditor = edit;
    },
    javascriptOnMounted(edit){
      this.jsEditor = edit;
    },
    cssOnMounted(edit){
      this.cssEditor = edit;
    },
    htmlOnCodeChange(value,event){
      console.log(value,event)
    },
    javascriptOnCodeChange(value,event){
      console.log(value,event)
    },
    cssOnCodeChange(value,event){
      console.log(value,event)
    },
    clickLoad(){
      this.$refs.refFile.dispatchEvent(new MouseEvent("click"))
    },
    fileLoad(){
      const selectedFile = this.$refs.refFile.files[0];
      let reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = (e) => {
        console.log(e.target.result, window.monacoEditor);
        window.monacoEditor.executeEdits('insert-code', [
          {
            range: {
              startLineNumber:1,
              startColumn:1,
            },
            text: e.target.result,
          },
        ])
      }
    },
    saveClick(){
      console.log(this.$refs.refFile.files[0])
      axios.post('/save',{}).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container{
  width: 100%;
  height: 100%;
  /* display: flex; */
  /* justify-content: space-between; */
}
.main-container .btn-content{
  height: 100%;
  width: 50%;
  position: relative;
}
#files{
  width: 70px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
#fileImport{
  margin-right: 12px;
}
</style>