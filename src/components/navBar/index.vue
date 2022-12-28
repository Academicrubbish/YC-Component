<template>
  <div class="schedule">
    <nav-bar :titles="['组织计划', '日程管理']" @titleClick="titleClick" :path="route"></nav-bar>
    <div class="schedule_body" v-if="!status">
      111
    </div>
    <div class="schedule_body" v-else>
      222
    </div>
  </div>
</template>
<script>
import navBar from "@/common/navBarItem/index.vue";
export default {
  components: {
    navBar
  },
  data() {
    return {
      route: '#',
      status: false
    }
  },
  methods: {
    titleClick(index) {
      this.status = index
    },
  }
}
</script>
<style scoped>
.schedule {
  height: 300px;
  width: 400px;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid rgb(187, 186, 186);
  border-radius: 5px;
}
</style>