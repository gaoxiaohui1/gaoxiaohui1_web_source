<template>
  <section>
    <ul v-if="isShowList">
      <li v-for="item in types" v-bind:key="item.value">
        <router-link :to="{path: '/cms/fp/news/list', query: { type: item.value }}"> {{item.label}} </router-link>
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
    this.types.push(...cmsApi.getNewsTye())
  }
}
</script>

