<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import index from "./view/index.vue";

export default {
  name: 'App',
  components: {
    index
  }
}
</script>

<style>
html,
body,
#app {
  height: 100vh;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

/* 优化滚动条效果 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #ebeef5;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ccc;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
</style>
