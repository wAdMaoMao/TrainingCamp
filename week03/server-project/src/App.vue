<template>
  <div id="app">
    <Target/>
  </div>
</template>

<script>
import Target from '@/components/target.vue'

export default {
  name: 'App',
  components: {
    Target
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
