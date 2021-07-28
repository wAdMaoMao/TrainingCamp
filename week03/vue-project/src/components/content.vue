<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-07-28 15:28:25
 * @LastEditors: voanit
 * @LastEditTime: 2021-07-28 16:24:34
-->
<template>
  <div class="test-container">
    <iframe v-if="isShow" class="test-iframe" src="http://localhost:9090/#/" frameborder="0"></iframe>
    <div class="no-content" v-else>正在处理中，请稍后...</div>
  </div>
</template>

<script>
export default {
  props:{
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.test-container{
  width: 100%;
  height: 598px;
  position: relative;
}
.no-content{
  width: 200px;
  position: relative;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: -11px;
}
.test-iframe{
  height: 598px;
  width: 100%;
  border: none;
}
</style>