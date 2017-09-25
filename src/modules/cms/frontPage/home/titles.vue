<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in titles" v-bind:key="item.ID">
        <router-link :to="{path: '/cms/fp/news/detail', query: { ID: item.ID }}"> {{item.title}} </router-link>
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
    cmsApi.getNewsTitles().then(response => {
      this.titles = response.Value.data
    })
  }
}
</script>

