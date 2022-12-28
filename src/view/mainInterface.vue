<template>
  <div class="main">
    <!-- 日历小组件 -->
    <div>
      <div class="nav" @click="$set(status, 0, !status[0])">
        <i :class="status[0] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <h4>1.日历小组件</h4>
      </div>
      <div class="calendar" v-show="status[0]">
        <calendar></calendar>
      </div>
    </div>
    <!-- 可编辑表格 -->
    <div>
      <div class="nav" @click="$set(status, 1, !status[1])">
        <i :class="status[1] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <h4>2.可编辑表格</h4>
      </div>
      <div class="table" v-show="status[1]">
        <editable-table></editable-table>
      </div>
    </div>
    <!-- 自定义封装上传小组件 -->
    <div>
      <div class="nav" @click="$set(status, 2, !status[2])">
        <i :class="status[2] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <h4>3.上传小组件</h4>
      </div>
      <div class="table" v-show="status[2]">
        <w-uploadBtn>
          <slot name="tip"></slot>
        </w-uploadBtn>
      </div>
    </div>
    <!-- 天气小组件 -->
    <div>
      <div class="nav" @click="$set(status, 3, !status[3])">
        <i :class="status[3] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <h4>4.天气小组件</h4>
      </div>
      <div v-show="status[3]">
        <weather></weather>
      </div>
    </div>
    <!-- 天气小组件 -->
    <div>
      <div class="nav" @click="$set(status, 5, !status[5])">
        <i :class="status[5] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        <h4>5.天气小组件</h4>
      </div>
      <di v-show="status[5]">
        <test></test>
      </di>
    </div>
  </div>
</template>

<script>
import calendar from '../components/calendar/index'
import editableTable from '../components/editableTable/index'
import wUploadBtn from '../components/w-uploadBtn/index'
import weather from "../components/weather/index";
import test from "../components/test/index";
export default {
  components: {
    calendar,
    editableTable,
    wUploadBtn,
    weather,
    test
  },
  data() {
    return {
      status: [0, 0, 0, 0, 0]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.nav {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

h4 {
  display: inline-block;
}

.calendar {
  /* 宽高自适应，可以随便给 */
  width: 300px;
  height: 370px;
}

.table {
  width: 770px;
}
</style>
