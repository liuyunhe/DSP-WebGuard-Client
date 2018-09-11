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
      imgs1: ''
    }
  },
  methods: {
    yang() {
      console.log('哈哈哈 我喜欢你')
    }
  },
  mounted () {
    this.html = this.$store.state.moveEnd.html1
  },
   props: ['mysonName']
}
</script>
