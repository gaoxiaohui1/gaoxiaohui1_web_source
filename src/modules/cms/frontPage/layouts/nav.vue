<template>
  <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/cms/fp/home">
      <el-menu-item index="0"><img :src="logoUrl" alt="cms-logo" style="width:180px;height:80px"></el-menu-item>
    </router-link>
    <router-link to="/cms/fp/home">
      <el-menu-item index="1">Home</el-menu-item>
    </router-link>
    <router-link to="/cms/fp/news">
      <el-menu-item index="2">News</el-menu-item>
    </router-link>
    <router-link to="/cms/fp/about">
      <el-menu-item index="3">About</el-menu-item>
    </router-link>
  </el-menu>
</template>
<script>
import logo from '@/assets/cms.jpg'
export default {
  name: 'nav',
  data() {
    return {
      activeIndex: 1,
      logoUrl: logo
    }
  },
  methods: {
    handleSelect: function(key, keyPath) {
      console.log(key)
      console.log(keyPath)
      console.log(this.$route)
      document.title = this.$route.name
    }
  }
}
</script>

