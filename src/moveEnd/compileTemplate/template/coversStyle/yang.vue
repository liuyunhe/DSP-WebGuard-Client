<template>
  <div class="yang">
    <div ></div>
  </div>
</template>
<script>
export default {


  data () {
    return {
      html: '' ,
      imgs1: '',
      Newid:''
    }
  },
  methods: {
    yang() {
      console.log('哈哈哈 我喜欢你')
    }
  },
  mounted () {
    console.log("7777777777777777777777777777777777")
    this.Newid = this.$store.state.moveEnd.moveuuid
    this.$router.push({
      path: '/eoveEnd/compileTemplate/template/coversStyle/centreCanvas/' + this.Newid
    })
    this.html = this.$store.state.moveEnd.html1
  },
   props: ['mysonName']
}
</script>
