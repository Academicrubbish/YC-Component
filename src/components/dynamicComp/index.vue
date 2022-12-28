<template>
  <div>
    <div style="font-weight: bold;font-size: 12px;">使用场景，有四个盒子，要在其中放四个组件，不同季度盒子放不同的组件展示</div>
    <div>
      <el-checkbox-group v-model="checkList" :max="4">
        <el-checkbox label="aaa"></el-checkbox>
        <el-checkbox label="bbb"></el-checkbox>
        <el-checkbox label="ccc"></el-checkbox>
        <el-checkbox label="ddd"></el-checkbox>
        <el-checkbox label="eee"></el-checkbox>
        <el-checkbox label="fff"></el-checkbox>
      </el-checkbox-group>
      <el-button size="mini" @click="save">确定</el-button>
    </div>
    <div style="margin-top: 20px;">
      <div class="box" v-for="item of component">
        <component :is="item"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: ['aaa', 'bbb', 'ccc', 'ddd'],
      component: [],
      status: false,
    };
  },
  mounted() {
    this.changeCheck();
  },
  methods: {
    changeCheck() {
      this.component = [];
      this.checkList.forEach((item, index) => {
        let myComp = () => import('@/common/dynamicTest/' + item + '.vue');
        this.$set(this.component, index, myComp);
      });
    },
    save() {
      this.changeCheck();
    }
  }
};
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 20px;
  border-radius: 5px;
  background-color: black;
}
</style>
