<template>
  <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/cms/bp/home">
      <el-menu-item index="0"><img :src="logoUrl" alt="cms-logo" style="width:180px;height:80px"></el-menu-item>
    </router-link>
    <router-link to="/cms/bp/home">
      <el-menu-item index="1">Home</el-menu-item>
    </router-link>
    <router-link to="/cms/bp/news">
      <el-menu-item index="2">News</el-menu-item>
    </router-link>
    <el-menu-item index="3">hello {{nickName}}</el-menu-item>
    <el-menu-item index="4">
      <span @click="doLogout()">登出</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import logo from '@/assets/cms.jpg'
export default {
  name: 'nav',
  data() {
    return {
      activeIndex: '1',
      logoUrl: logo,
      nickName: 'this is not right nickName'
    }
  },
  methods: {
    handleSelect: function(key, keyPath) {
      document.title = this.$route.name
    },
    doLogout() {
      this.$store.dispatch('LogOutCMS').then(response => {
        this.$router.push({ path: '/cms/bp/login' })
      }).catch(error => {
        console.log(error)
        this.$router.push({ path: '/cms/bp/login' })
      })
    }
  },
  created() {
    console.log(this.$store.getters.cmsUser)
    this.nickName = this.$store.getters.cmsUser.nickName
  }
}
</script>

