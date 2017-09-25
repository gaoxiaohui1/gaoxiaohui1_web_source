<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in publishUsers" v-bind:key="item.ID">
        <router-link :to="{path: '/cms/fp/news/list', query: { publishUser: item.publishUser }}"> {{item.publishUser}} </router-link>
      </li>
    </ul>
    <span v-else>
      暂时没有新闻~
    </span>
  </section>
</template>
<script>
import cmsApi from '../api'
export default {
  name: 'publishUsers',
  data() {
    return {
      publishUsers: []
    }
  },
  computed: {
    isShowList() {
      return this.publishUsers.length > 0
    }
  },
  created() {
    cmsApi.getNewsPublishUsers().then(response => {
      this.publishUsers = response.Value.data
    })
  }
}
</script>

