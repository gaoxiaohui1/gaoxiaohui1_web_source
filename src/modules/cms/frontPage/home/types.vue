<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in types" v-bind:key="item.value">
        <router-link :to="{path: '/cms/fp/news/list', query: { type: item.value }}"> {{item.label}} </router-link>
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
  name: 'types',
  data() {
    return {
      types: []
    }
  },
  computed: {
    isShowList() {
      return this.types.length > 0
    }
  },
  created() {
    const res = cmsAPI.getDistinctInfos({ type: 'type', label: '类型' })
    if (res.IsSuccess) {
      res.Data.forEach(x => {
        this.types.push({ value: x, label: x })
      })
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

