<template>
  <div>
    <span>God said:let there be error</span>
    <br/>
    <span>We say:There is an error</span>
    <br/>
    <span>{{msg}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: ''
    }
  },
  created() {
    this.msg = this.$route.query.msg
  }
}
</script>

