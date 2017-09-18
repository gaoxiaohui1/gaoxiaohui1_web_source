<template>
  <div class="app-wrapper">
    <nav></nav>
    <app-main></app-main>
  </div>
</template>
<script>
import nav from './nav'
import appMain from './appMain'
export default {
  name: 'Layout',
  data() {
    return {

    }
  },
  components: {
    nav,
    appMain
  }
}
</script>

