<template>
  <div class="centreCanvas" id="parent">
  </div>
</template>
<style lang="scss" scoped src="./centreCanvas.scss">
</style>
<script>
import Vue from 'vue';
import GLOBAL from '@/config/Global';
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created() {
      // console.log(12345)
      // console.log(this.html)
      console.log(  GLOBAL.config.html.htmlCode)
        var _this = this
      // setTimeout( function () {
        var MyComponent = Vue.extend({
          template: GLOBAL.config.html.htmlCode ,
          data(){
            return {
              this_: _this,
              elmentForm: []
            }
          },
          methods: {
        // 重构的样式库事件
            clickElment(type, index,e) {
              this.this_.$store.state.moveEnd.html1.isLingering = 3
              console.log(type)
              // console.log(_this.$store.state.moveEnd.elmentFormOne.length)
              console.log(e.target.className)
              console.log(e)
              // let dom = document.getElementsByClassName(e.target.className)[0].parentNode.parentNode.children

              // console.log(dom)
              if (type === '4') {
                _this.$store.state.moveEnd.isImgs = true
                for(var i = 0; i <= 2 -1; i++) {
                  console.log(document.getElementsByClassName(i + '')[0])
                  document.getElementsByClassName(i +1 + '')[0].style.border = 'none'
                }
              } else {
                for(var i = 0; i <= _this.$store.state.moveEnd.elmentFormOne.length -1; i++) {
                  console.log(document.getElementsByClassName(i + 1 +'')[0])
                  document.getElementsByClassName(i +1 + '')[0].style.border = 'none'

                }
              }
              console.log( document.getElementsByClassName(e.target))
              document.getElementsByClassName(parseInt(index) + 1 + '')[0].style.border = '2px solid #409EFF'

              // e.target.className

              console.log(_this.$store.state.moveEnd.uploadImg)
              console.log('类型'+ type)
              console.log('索引'+ index)
              if (type === '1' || type === '4') {
                _this.$store.state.moveEnd.uploadImg = []
                localStorage.setItem('type', type)
                localStorage.setItem('index', index)
                console.log(_this.$store.state.moveEnd.elmentFormOne)
                // console.log(_this.$store.state.moveEnd.elmentFormOne[index])
                // console.log(_this.$store.state.moveEnd.elmentFormOne[index].value)
                // console.log(_this.$store.state.moveEnd.elmentFormOne[index].defaultValue)
                if (type === '1' ) {
                this.this_.$store.state.moveEnd.html1.stylesActive = 3
                this.this_.$store.state.moveEnd.html1.attribute = 2
                  if (_this.$store.state.moveEnd.elmentFormOne[index].value !== _this.$store.state.moveEnd.elmentFormOne[index].defaultValue) {
                    _this.$store.state.moveEnd.uploadImg[0] = {
                    url: _this.$store.state.moveEnd.elmentFormOne[index].value
                  }
                  }
                } else {
                this.this_.$store.state.moveEnd.html1.stylesActive = 3
                this.this_.$store.state.moveEnd.html1.attribute = 4
                console.log(_this.$store.state.moveEnd.uploadImg)
                  _this.$store.state.moveEnd.elmentFormOne.map((item, index) => {
                    console.log(item.type)
                    console.log(item)
                    if (item.type === 5 && _this.$store.state.moveEnd.elmentFormOne[index].value !== _this.$store.state.moveEnd.elmentFormOne[index].defaultValue) {
                      _this.$store.state.moveEnd.uploadImg.push({
                        url: item.value
                      })
                    }
                  })
                console.log(_this.$store.state.moveEnd.uploadImg)
                }
              }
               else {
                 _this.$store.state.moveEnd.userDefinedForm.colourInput= this.this_.$store.state.moveEnd.elmentFormOne[index].textColor
                this.this_.$store.state.moveEnd.userDefinedForm.textarea = this.this_.$store.state.moveEnd.elmentFormOne[index].value
                this.this_.$store.state.moveEnd.html1.stylesActive = 3
                this.this_.$store.state.moveEnd.html1.attribute = 1
                localStorage.setItem('type', type)
                localStorage.setItem('index', index)
              }
            },

            // 轮播图按钮
            imgL(num) {
              console.log(num)
            },
            imgR(num) {
              console.log(num)
            }
          },
          created() {
            console.log(_this.$store.state.moveEnd.elmentFormOne)

            this.elmentForm = _this.$store.state.moveEnd.elmentFormOne

            console.log(this.elmentForm)
            // console.log(this.$root._data)
            // this.$set(this.data, elmentForm, _this.$store.state.moveEnd.elmentFormOne)
          },
          watch: {
            // text2H1(val){
            //   console.log('监听text2H1')

            //   console.log(val)
            // }
          }
        })
        var component = new MyComponent().$mount()
        document.getElementById('parent').innerHTML = ''
        document.getElementById('parent').appendChild(component.$el);
          let index = parseInt(localStorage.getItem('index')) +1
          console.log(index +'')
          document.getElementsByClassName(index + '')[0].style.border = '2px solid #409EFF'
          console.log(document.getElementsByClassName(index + '')[0])
  }
}
</script>
<style>
.imgText22{
    color: red !important;
  }
  .classNameActive{
    border: 1px solid #0077FF;
  }
.swiper-button-next{background-image:none !important;}
.swiper-button-prev{background-image:none !important;}

</style>
