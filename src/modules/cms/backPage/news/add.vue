<template>
  <div class="detail">
    <el-form ref="form" :rules="rules" :model="addData" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addData.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="addData.type" placeholder="类型" size="small"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="addData.content" type="textarea" placeholder="内容" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="addData.author" placeholder="作者" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doAdd()">确认</el-button>
        <el-button @click="doReset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import cmsAPI from '@/modules/cms/api/newsAPI'
export default {
  name: 'add',
  data() {
    return {
      addData: {
        title: '', // 标题
        type: '', // 类型
        content: '', // 内容
        author: '' // 作者
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1~20个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在1~5个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 10000, message: '长度在1~10000个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1~10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 新增
     */
    doAdd() {
      this.$refs.form.validate((valide) => {
        if (valide) {
          const addRes = cmsAPI.addNews(this.addData)
          if (addRes.IsSuccess) {
            MessageBox.confirm('新增成功', '提示', {
              type: 'success',
              confirmButtonText: '进入列表',
              cancelButtonText: '继续新增'
            }).then(() => {
              this.$router.push({ path: '/cms/bp/news/list' })
            }).catch(() => {
              this.$router.push({ path: '/cms/bp/news/add' })
            })
          } else {
            Message({
              type: 'error',
              message: addRes.Msg,
              durarion: 3 * 1000
            })
          }
        }
      })
    },
    /**
     * 重置
     */
    doReset() {
      this.addData.title = ''
      this.addData.type = ''
      this.addData.content = ''
      this.addData.author = ''
    }
  }
}
</script>

<style scoped>
.detail {
  width: 80%;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  color: #8c8c8c;
  font-size: 20px
}
</style>
