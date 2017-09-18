<template>
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Home</el-menu-item>
    <el-menu-item index="2">News</el-menu-item>
    <el-menu-item index="3">About</el-menu-item>
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

