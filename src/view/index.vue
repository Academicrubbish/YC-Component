<template>
  <div class="main">
    <div class="main_body">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="日历" name="1">
          <calendar></calendar>
        </el-collapse-item>
        <el-collapse-item title="可编辑表格" name="2">
          <editableTable></editableTable>
        </el-collapse-item>
        <el-collapse-item title="自定义上传组件" name="3">
          <w-uploadBtn></w-uploadBtn>
        </el-collapse-item>
        <el-collapse-item title="天气组件1(心知天气)" name="4">
          <weather></weather>
        </el-collapse-item>
        <el-collapse-item title="天气组件2(和风天气)" name="5">
          <test></test>
        </el-collapse-item>
        <el-collapse-item title="封装导航栏" name="6">
          <nav-bar></nav-bar>
        </el-collapse-item>
        <el-collapse-item title="右键菜单" name="7">
          <right-menu></right-menu>
        </el-collapse-item>
        <el-collapse-item title="自定义表单验证(二者填其一即可)" name="8">
          <form-validate></form-validate>
        </el-collapse-item>
        <el-collapse-item title="动态引入组件" name="9">
          <dynamic-comp></dynamic-comp>
        </el-collapse-item>
        <el-collapse-item title="左右分栏" name="10">
          <column></column>
        </el-collapse-item>
        <el-collapse-item title="登录验证码实现" name="11">
          <identify-code></identify-code>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import calendar from '../components/calendar/index'
import editableTable from '../components/editableTable/index'
import wUploadBtn from '../components/w-uploadBtn/index'
import weather from "../components/weather/index";
import test from "../components/test/index";
import navBar from "../components/navBar/index";
import rightMenu from "../components/rightMenu/index";
import formValidate from "../components/formValidate/index";
import dynamicComp from "../components/dynamicComp/index";
import column from "../components/column/index";
import identifyCode from "../components/identifyCode/index";


export default {
  components: {
    calendar,
    editableTable,
    wUploadBtn,
    weather,
    test,
    navBar,
    rightMenu,
    formValidate,
    dynamicComp,
    column,
    identifyCode
  },
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding-top: 70px;
  box-sizing: border-box;
  background-color: #f4f6f9;
}

.main_body {
  width: 80%;
  height: 90%;
  margin-left: 10%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  background-color: white;
  box-shadow: 10px 10px 5px 0 rgb(232, 237, 250);
}
</style>
