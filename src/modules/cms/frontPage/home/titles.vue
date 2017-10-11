<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in titles" v-bind:key="item.ID">
        <router-link :to="{path: '/cms/fp/news/detail', query: { ID: item.ID }}"> {{item.title}} </router-link>
      </li>
    </ul>
    <div v-else>
      <span>
        暂时没有新闻~
      </span>
      <br/>
      <span>
        没有账号？
        <router-link to="/cms/bp/regist">注册账号</router-link>添加并发布新闻~
      </span>
      <br/>
      <span>
        已有账号，请
        <router-link to="/cms/bp/login">登陆账号</router-link>添加并发布新闻~
      </span>
    </div>
  </section>
</template>
<script>
import { Message } from 'element-ui'
import cmsAPI from '@/modules/cms/api/newsAPI'
export default {
  name: 'titles',
  data() {
    return {
      titles: []
    }
  },
  computed: {
    isShowList() {
      return this.titles.length > 0
    }
  },
  created() {
    const res = cmsAPI.getDistinctInfos({ type: 'title', label: '标题' })
    if (res.IsSuccess) {
      this.titles = [...res.Data]
    } else {
      Message({
        type: 'error',
        message: res.Msg,
        durarion: 3 * 1000
      })
    }
  }
}
</script>

