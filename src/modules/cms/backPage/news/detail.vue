<template>
  <div class="detail" v-loading="loading1">
    <h1>{{detail.title}}</h1>
    <div class="info">
      <span>类型：{{detail.type}} </span>
      <span>发布人：{{detail.publishUser}} </span>
      <span>发布时间：{{detail.publishTime}} </span>
      <span>阅读量：{{detail.readCount}} </span>
    </div>
    <div class="content">{{detail.content}}</div>
    <div class="foot">
      <span>作者：{{detail.author}}</span>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import cmsApi from '../api'
export default {
  name: 'detail',
  data() {
    return {
      detail: {
        ID: '', // 编号
        title: '', // 标题
        content: '', // 内容
        author: '', // 作者
        type: '', // 类型
        publishTime: '', // 发布时间
        publishUser: '', // 发布人
        readCount: 0 // 阅读量
      },
      loading1: true
    }
  },
  created() {
    const searchData = { ID: this.$route.query.ID }
    cmsApi.getNewsDetail(searchData).then(response => {
      this.loading1 = false
      this.detail = response.Value.data
    }).catch(error => {
      console.log(error)
      Message({
        type: 'error',
        message: error.Msg,
        durarion: 3 * 1000
      })
    })
  }
}
</script>

<style scoped>
.info {
  line-height: 20px;
  font-size: 6px;
  color: #8c8c8c
}

.content {
  width: 80%;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  color: #3e3e3e;
  font-size: 20px
}

.foot {
  margin-top: 10px;
  font-size: 16px;
  color: #8c8c8c;
  float: right;
  right: 100px
}
</style>
