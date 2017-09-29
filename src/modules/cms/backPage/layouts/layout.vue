<template>
  <div class="layout">
    <nav-bar></nav-bar>
    <app-main></app-main>
  </div>
</template>
<script>
import navBar from './nav'
import appMain from './appMain'
export default {
  name: 'Layout',
  data() {
    return {

    }
  },
  components: {
    navBar,
    appMain
  }
}
</script>

