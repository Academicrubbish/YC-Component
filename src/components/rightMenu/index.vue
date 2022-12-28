<template>
  <!-- 右键菜单 -->
  <div class="right" @mouseup="appMouseDown">
    <div class="mousedown" @contextmenu.prevent="rightClick($event)">
      右键点击区域
    </div>
    <div v-if="showRightMenu" class="right-menu" :style="{ top: topNumber + 'px', left: leftNumber + 'px' }">
      <div style="width: 100%;padding: 5px;box-sizing: border-box;">
        <div class="right-menu-option" @mousedown="renameFile">
          <i class="el-icon-refresh-right"></i>
          <div style="width: 70%;display: inline-block;">重命名</div>
        </div>
        <el-divider></el-divider>
        <div class="right-menu-option" @mousedown="deleteFile">
          <i class="el-icon-delete"></i>
          <div style="width: 70%;display: inline-block;">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topNumber: 0,
      leftNumber: 0,
      showRightMenu: false
    };
  },
  methods: {
    //右键文件夹打开菜单
    rightClick(e) {
      this.topNumber = e.pageY
      this.leftNumber = e.pageX
      this.showRightMenu = true
    },
    renameFile() {
      console.log('重命名');
    },
    deleteFile() {
      console.log('删除文件');
    },
    //用于左键点击其他地方取消右键菜单
    appMouseDown() {
      this.showRightMenu = false;
    },
  }
};
</script>

<style scoped>
.right {
  width: 200px;
  height: 200px;
  background-color: pink;
}

.mousedown {
  width: 100px;
  height: 100px;
  background-color: black;
  color: white;
  font-size: 12px;
}

.right-menu {
  width: 130px;
  position: fixed;
  z-index: 1000;
  background-color: white;
  box-shadow: 2px 2px 5px #ddd;
  border-radius: 5px;
}

.el-divider--horizontal {
  margin: 5px 0;
}

.right-menu-option {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.right-menu-option:hover {
  background-color: #409EFF;
  color: white;
  cursor: pointer;
}
</style>