<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple" style="text-align: center">
          <h1>~welcome to login~</h1>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <div style="margin-top:10px">
            <el-form ref="form" :rules="rules" :model="loginData" label-width="80px">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginData.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passWord">
                <el-input v-model="loginData.passWord" :type="loginData.pwType"></el-input>
                <el-button @click="showPW()">{{loginData.pwDes}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="doLogin()">登陆</el-button>
                <el-button @click="doReset()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'regist',
  data() {
    return {
      loginData: {
        userName: '',
        passWord: '',
        pwType: 'password',
        pwDes: '显示密码'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 密码显示隐藏
     */
    showPW() {
      if (this.loginData.pwType === 'password') {
        this.loginData.pwType = ''
        this.loginData.pwDes = '隐藏密码'
      } else {
        this.loginData.pwType = 'password'
        this.loginData.pwDes = '显示密码'
      }
    },
    /**
     * 登陆
     */
    doLogin() {
      this.$refs.form.validate((valide) => {
        if (valide) {
          this.$store.dispatch('LoginCMS', this.loginData).then(response => {
            Message({
              message: '登陆成功',
              type: 'success'
            })
            this.$router.push({ path: '/cms/bp/news' })
          }).catch(error => {
            console.log(error)
            MessageBox.confirm(error.Msg + '，登陆失败了。。。', '提示', {
              type: 'error',
              confirmButtonText: '注册新账号',
              cancelButtonText: '重新登陆'
            }).then(() => {
              this.$router.push({ path: '/cms/bp/regist' })
            }).catch(() => {
              this.$router.push({ path: '/cms/bp/login' })
            })
          })
        }
      })
    },
    /**
     * 重置
     */
    doReset() {
      this.loginData.userName = ''
      this.loginData.passWord = ''
    }
  }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>


