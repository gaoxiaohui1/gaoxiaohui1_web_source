<template>
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/cms/fp/home"><el-menu-item index="0">CMS</el-menu-item></router-link>
    <router-link to="/cms/fp/home"><el-menu-item index="1">Home</el-menu-item></router-link>
    <el-menu-item index="2"><router-link to="/cms/fp/news">News</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/cms/fp/about">About</router-link></el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'nav',
  data() {
    return {
      activeIndex: 1
    }
  },
  methods: {
    handleSelect: function(key, keyPath) {
      console.log(key)
      console.log(keyPath)
    }
  }
}
</script>

