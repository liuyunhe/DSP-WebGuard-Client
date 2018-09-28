<template>
  <div class="yang"></div>
</template>
<script>
export default {
  data () {
    return {
      id:''
    }
  },
  mounted() {
    console.log(54621356)
    // this.Newid = this.$store.state.moveEnd.moveuuid
    //  localStorage.setItem('id',this.$store.state.moveEnd.moveuuid)
    this.id = localStorage.getItem('id')
    this.$router.push({
      path: '/eoveEnd/compileTemplate/template/coversStyle/centreCanvas/' + this.id
    })
  }
}
</script>


