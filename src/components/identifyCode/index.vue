<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left">

      <h1 class="title" style="text-align: center;">用户登录</h1>

      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="用户账号" tabindex="1"
          autocomplete="on" /> <!-- autocomplete="on"实现表单验证 -->
      </el-form-item>

      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="用户密码" tabindex="2" show-password
          autocomplete="on" />
      </el-form-item>

      <el-form-item prop="sidentifyMode">
        <el-input prefix-icon="el-icon-document" v-model="loginForm.sidentifyMode" placeholder="验证码" tabindex="3"
          autocomplete="on" @keyup.enter.native="handleLogin" /> <!-- enter提交 -->
        <span @click="refreshCode()" class="identify" title="点击切换验证码">
          <v-sidentify :identifyCode="identifyCode"></v-sidentify>
        </span>
      </el-form-item>


      <el-button :loading="loading" type="primary" tabindex="4"
        style="width:80%;margin: 0 0 50px 10%;letter-spacing: 10px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import vSidentify from "@/common/indentify/index.vue";

export default {
  name: 'Login',
  components: {
    vSidentify
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入你的用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位！'))
      } else {
        callback()
      }
    }
    const validateIdentify = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        sidentifyMode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        sidentifyMode: [{ required: true, trigger: 'blur', validator: validateIdentify }]
      },
      loading: false,
      identify: '',
      identifyCode: '',
      //验证码出现的数字和字母
      identifyCodes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    }
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.sidentifyMode.toLowerCase() != this.identifyCode.toLowerCase()) {
            this.$message({
              type: 'warning',
              duration: '2000',
              message: '验证码错误！'
            })
            this.refreshCode()
            return
          } else {
            alert('登陆成功')
          }
        } else {
          return false
        }
      })
    },
    // 生成随机数
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 更新验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
      // console.log('当前验证码:', this.identifyCode)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      // console.log('data, len:', data, len)
      for (let i = 0; i < len; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length - 1)]
      }
    },
  }
}
</script>

<style scoped>
.login-container {
  width: 420px;
  border: 1px solid gray;
  border-radius: 10px;
}

.el-form-item {
  height: 50px;
  width: 80%;
  margin-left: 10%;
}

.login-container /deep/ .el-input__inner {
  height: 50px;
}

.identify {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>