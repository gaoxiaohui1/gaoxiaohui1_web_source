<template>
  <div class="detail" v-loading="loading1">
    <h1>{{detail.title}}</h1>
    <div class="info">
      <span>编号：{{detail.ID}} </span>
      <span>状态：{{detail.newsStatusDes}} </span>
      <span>类型：{{detail.type}} </span>
      <span>发布人：{{detail.publishUser}} </span>
      <span>发布时间：{{detail.publishTime}} </span>
      <span>阅读量：{{detail.readCount}} </span>
    </div>
    <div class="content" v-html="detail.content"></div>
    <div class="foot">
      <span>作者：{{detail.author}}</span>
      <br/>
      <span>录入时间：{{detail.insertTime}}</span>
      <br/>
      <span>修改时间：{{detail.updateTime}}</span>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import cmsAPI from '@/modules/cms/api/newsAPI'
export default {
  name: 'detail',
  data() {
    return {
      detail: {
        ID: 0, // 主键ID
        title: '', // 标题
        type: '', // 类型
        content: '', // 内容
        author: '', // 作者
        newsStatus: 0, // 状态（0-草稿;1-发布;9-删除）
        newsStatusDes: '', // 状态
        insertUserID: '', // 录入人ID
        insertTime: '', // 录入时间
        updateTime: '', // 修改时间
        readCount: 0, // 阅读次数
        publishUserID: -1, // 发布人ID
        publishUser: '', // 发布人
        publishTime: '' // 发布时间
      },
      loading1: true
    }
  },
  created() {
    const arcRes = cmsAPI.addReadCount(this.$route.query.ID)
    console.log(arcRes)
    const detailRes = cmsAPI.getNewsDetail(this.$route.query.ID)
    this.loading1 = false
    if (detailRes.IsSuccess) {
      this.detail = detailRes.Data
    } else {
      Message({
        type: 'error',
        message: detailRes.Msg,
        durarion: 3 * 1000
      })
    }
  }
}
</script>

<style scoped>
.detail {
  width: 80%;
  margin-top: 20px
}

.info {
  margin-top: 20px;
  line-height: 20px;
  font-size: 6px;
  color: #8c8c8c
}

.content {
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  color: #3e3e3e;
  font-size: 20px
}

.foot {
  margin-top: 30px;
  font-size: 16px;
  color: #8c8c8c;
  float: right;
  right: 100px
}
</style>
