<template>
  <div style="width:300px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机" prop="inputOne">
        <el-input v-model="ruleForm.inputOne"></el-input>
      </el-form-item>
      <el-form-item label="固定电话" prop="inputTwo">
        <el-input v-model="ruleForm.inputTwo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validate = (setrule, value, callback) => {
      if (!this.ruleForm.inputOne && !this.ruleForm.inputTwo) {
        callback(new Error("请至少填写一项"))
      } else {
        //任意值被填写，清除验证提示
        if (!this.ruleForm.inputOne || !this.ruleForm.inputTwo) {
          this.$refs.ruleForm.clearValidate()
        }
        callback()
      }
    };
    return {
      ruleForm: {
        inputOne: '',
        inputTwo: ''
      },
      rules: {
        inputOne: [
          {
            required: true,
            validator: validate,
            trigger: "change",
          },
        ],
        inputTwo: [
          {
            required: true,
            validator: validate,
            trigger: "change",
          },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('验证通过');
        } else {
          return
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>