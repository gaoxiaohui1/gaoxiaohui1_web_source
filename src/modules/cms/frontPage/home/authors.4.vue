<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in authors" v-bind:key="item.ID">
        <router-link :to="{path: '/cms/fp/news/detail', query: { ID: item.ID }}"> {{item.author}} </router-link>
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
  name: 'authors',
  data() {
    return {
      authors: []
    }
  },
  computed: {
    isShowList() {
      return this.authors.length > 0
    }
  },
  created() {
    cmsApi.getNewsAuthors().then(response => {
      this.authors = response.Value.data
    })
  }
}
</script>

