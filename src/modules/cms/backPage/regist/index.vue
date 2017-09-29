<template>
  <section>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple" style="text-align: center">
          <h1>~welcome to regist~</h1>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <div style="margin-top:10px">
            <el-form ref="form" :rules="rules" :model="registData" label-width="80px">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="registData.userName" @blur="doValidateUserName()"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="registData.nickName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passWord">
                <el-input v-model="registData.passWord" :type="registData.pwType"></el-input>
                <el-button @click="showPW()">{{registData.pwDes}}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="doRegist()">注册</el-button>
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
import cmsApi from '../api'
import { Message } from 'element-ui'
export default {
  name: 'regist',
  data() {
    return {
      registData: {
        userName: '',
        nickName: '',
        passWord: '',
        pwType: 'password',
        pwDes: '显示密码'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
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
     * 校验用户名
     */
    doValidateUserName() {
      this.$refs.form.validateField('userName', error => {
        if (error === '') {
          const validateRes = cmsApi.validateRegistName(this.registData.userName)
          if (validateRes.IsSuccess || validateRes.Data) {
            Message({
              message: validateRes.Msg,
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
      })
    },
    /**
     * 注册
     */
    doRegist() {
      this.$refs.form.validate((valide) => {
        if (valide) {
          const registRes = cmsApi.regist(this.registData)
          Message({
            message: registRes.Msg,
            type: registRes.IsSuccess ? 'success' : 'error'
          })
          if (registRes.IsSuccess) {
            this.$store.dispatch('LoginCMS', this.registData).then(response => {
              Message({
                message: '自动登陆成功',
                type: 'success'
              })
              this.$router.push({ path: '/cms/bp/news' })
            }).catch(error => {
              Message({
                message: '自动登陆失败',
                type: 'error'
              })
              console.log(error)
              this.$router.push({ path: '/cms/bp/login' })
            })
          }
        }
      })
    },
    /**
     * 重置
     */
    doReset() {
      this.registData.userName = ''
      this.registData.nickName = ''
      this.registData.passWord = ''
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


