<template>
  <div class="nav">
    <div class="nav_title" :class="{ active: currentIndex == index && titles.length > 1 }"
      v-for="(item, index) in titles" :key="index" @click="titleClick(index)">
      {{ item }}
    </div>
    <div class="nav_go" v-if="path != ''" @click="jump">
      更多
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default: function () {
        return []
      }
    },
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      if (this.titles.length > 1) {
        this.$emit('titleClick', index);
      }
    },
    jump() {
      // this.$router.push(this.path);
    }
  }
}
</script>
<style scoped>
.nav {
  position: relative;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
}

.nav>div {
  display: inline-block;
}

.nav_title {
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
}

.active {
  border-bottom: 3px solid #4095E5;
}

.nav_go {
  position: absolute;
  font-size: 14px;
  line-height: 30px;
  right: 5px;
  color: grey;
  cursor: pointer;
}
</style>