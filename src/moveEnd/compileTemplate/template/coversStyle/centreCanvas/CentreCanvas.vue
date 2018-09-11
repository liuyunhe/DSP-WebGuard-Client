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
      // console.log(  GLOBAL.config.html.htmlCode)
        var _this = this
        var MyComponent = Vue.extend({
          template: GLOBAL.config.html.htmlCode ,
          data(){
            return {
              this_: _this,
              imgs7:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs6:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs5:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs4:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs3:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs2:'http://182.61.33.241:8086/template/images/style/21.png',
              imgs1:'http://182.61.33.241:8086/template/images/style/21.png',
              text2H1:'加油! 不要为五斗米折腰',
              text2H3: '希望! 你永远有一颗年轻的心, 永远热泪眶溢',
              textSpan1: '年轻! 不拼 你想什么时候拼?',
              textSpan2: '中国! 它禁枪, 那么你就爱我吧',
              textSpan3: '为你! 我愿意热爱整个世界',
            }
          },
          methods: {
            // 图片公共
            img(num) {
              this.this_.$store.state.moveEnd.html1.stylesActive = 3
              this.this_.$store.state.moveEnd.html1.attribute = 2
              // console.log(this.this_.$store.state.moveEnd.html1)
              // console.log(this.GLOBAL.config.styleControl.stylesActive)
              // this.GLOBAL.config.styleControl.stylesActive=2
              // console.log(this.GLOBAL.config.styleControl.stylesActive)

              // 把页面数值 存储至本地, 让再裁剪需要
              localStorage.setItem('total', 'img')
              localStorage.setItem('imgNum', num)
              console.log(num)
              // this.textSpan1 = '1'
              // localStorage.setItem('imgs', num)
            },

            color (type) {
              let isTotal = localStorage.getItem('total')
              let isHeadline = localStorage.getItem('headline')
              let isMain = localStorage.getItem('main')
              let isImg = localStorage.getItem('imgNum')

              if (isHeadline !== '0' || isMain !== '0' || isImg !== '0') {
                _this.$store.state.moveEnd.canvasData.map((item, index) => {
                  if (isTotal === 'headline') {
                    if (isHeadline === '1') {
                      if (item.type === 2 && item.titleType === 1) {
                        item.txtColor = _this.$store.state.moveEnd.userDefinedForm.colourInput
                        console.log(item)
                      }
                    } else if (isHeadline === '2') {
                      if (item.type === 2 && item.titleType === 0) {
                        item.txtColor = _this.$store.state.moveEnd.userDefinedForm.colourInput
                        console.log(item)
                      }
                    }
                  } else if (isTotal === 'main'){
                    item.txtColor = _this.$store.state.moveEnd.userDefinedForm.colourInput
                  }
                })
              }
            },
          // 大标题公共
            headline1(num) {

              this.color('headline')
              console.log(_this.$store.state.moveEnd.canvasData)


              // 先存储一个大的数值进行 判断, 把各大数据存储分布, 在进行小数据的判断, 再进行判断
              this.this_.$store.state.moveEnd.html1.stylesActive = 3
              this.this_.$store.state.moveEnd.html1.attribute = 1
              this.this_.$store.state.moveEnd.userDefinedForm.textarea = this.text2H1
              this.this_.$store.state.moveEnd.html1.isLingering = 2
              localStorage.setItem('total', 'headline')
              localStorage.setItem('headline', '1')
            },
            // 小标题公共
            headline3(num) {

              this.color('headline')
              console.log(_this.$store.state.moveEnd.canvasData)

              this.this_.$store.state.moveEnd.html1.stylesActive = 3
              this.this_.$store.state.moveEnd.html1.attribute = 1
              this.this_.$store.state.moveEnd.userDefinedForm.textarea = this.text2H3
              this.this_.$store.state.moveEnd.html1.isLingering = 2
              localStorage.setItem('total', 'headline')
              localStorage.setItem('headline', '2')
            },
            // 文字公共
            main(num) {

              this.color('main')
              console.log(_this.$store.state.moveEnd.canvasData)

              this.this_.$store.state.moveEnd.html1.stylesActive = 3
              this.this_.$store.state.moveEnd.html1.attribute = 1
              this.this_.$store.state.moveEnd.userDefinedForm.textarea = this.textSpan1
              this.this_.$store.state.moveEnd.html1.isLingering = 2
              console.log(num)
              localStorage.setItem('total', 'main')
              localStorage.setItem('main', num)
              localStorage.setItem('headline', '0')
            },
            // 驻留按钮公共
            lingering(num) {
              this.this_.$store.state.moveEnd.html1.attribute = 0
              this.this_.$store.state.moveEnd.html1.stylesActive = 3
              this.this_.$store.state.moveEnd.html1.isLingering = 1
              console.log(num)
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
            let isTotal = localStorage.getItem('total')
            let isHeadline = localStorage.getItem('headline')
            let isMain = localStorage.getItem('main')
            let isImg = localStorage.getItem('imgNum')
            console.log(isTotal)
            console.log(_this.$store.state.moveEnd.userDefinedForm.imgUrl)
            console.log(_this.$store.state.moveEnd.userDefinedForm.textarea )


            let fieds = {
              id: '',
              styleFieldId: '',
              value: '',
              txtColor: '',
              btnColor: '',
              btnName: '',
              tel: '',
              isVisual: '',
              isMust: '',
              checkType: '',
              order: '',
              name: '',
              color: '',
              minImage: '',
              sowType: '',
              type:'',
              // dataType: '',
            }

            if (isTotal === 'headline') {
              console.log('headline')
              // 判断 把输入框的值 放入那个vuex 放在那个对象里面, 然后再离开的时候, 把数据存储到当前页面, 在另一个判断的时候 再进行存储, 这样就不会出现 数据 混乱
              if (localStorage.getItem('headline') === '1') {

                _this.$store.state.moveEnd.dataStorage.text2H1 = _this.$store.state.moveEnd.userDefinedForm.textarea
                this.text2H1 = _this.$store.state.moveEnd.dataStorage.text2H1

                // fieds.dataType = 1
                // fieds.value = _this.$store.state.moveEnd.dataStorage.text2H1
                // _this.$store.state.moveEnd.fieldsData[0] = fieds
                console.log(_this.$store.state.moveEnd.userDefinedForm.textarea)
                console.log(_this.$store.state.moveEnd.dataStorage.text2H1)
                console.log('大标题')
                // console.log(this._this.$store.state.moveEnd.userDefinedForm.textarea)
              } else if (localStorage.getItem('headline') === '2') {

                _this.$store.state.moveEnd.dataStorage.text2H3 = _this.$store.state.moveEnd.userDefinedForm.textarea

                // fieds.dataType = 2
                // fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                // _this.$store.state.moveEnd.fieldsData[1] = fieds
                console.log('小标题')
              }
            } else if (isTotal === 'main') {
              console.log('main')
              if (isMain === '1') {
                // this.textSpan1 = _this.$store.state.moveEnd.dataStorage.textSpan1
                _this.$store.state.moveEnd.dataStorage.textSpan1 = _this.$store.state.moveEnd.userDefinedForm.textarea

                // fieds.dataType = 3
                // fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                // _this.$store.state.moveEnd.fieldsData[2] = fieds
              }
            } else if (isTotal === 'img') {
              if (isImg === '1') {
                console.log('图片1')
                _this.$store.state.moveEnd.dataStorage.imgs1 = _this.$store.state.moveEnd.userDefinedForm.imgUrl1

                fieds.dataType = 4
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[3] = fieds
              } else if (isImg === '2') {
                console.log('图片2')
                _this.$store.state.moveEnd.dataStorage.imgs2 = _this.$store.state.moveEnd.userDefinedForm.imgUrl2

                fieds.dataType = 5
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[4] = fieds
              } else if (isImg === '3') {
                console.log('图片3')
                _this.$store.state.moveEnd.dataStorage.imgs3 = _this.$store.state.moveEnd.userDefinedForm.imgUrl3

                fieds.dataType = 6
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[5] = fieds
              } else if (isImg === '4') {
                console.log('图片4')
                _this.$store.state.moveEnd.dataStorage.imgs4 = _this.$store.state.moveEnd.userDefinedForm.imgUrl4

                fieds.dataType = 7
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[6] = fieds
              } else if (isImg === '5') {
                console.log('图片5')
                _this.$store.state.moveEnd.dataStorage.imgs5 = _this.$store.state.moveEnd.userDefinedForm.imgUrl5

                fieds.dataType = 8
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[7] = fieds
              } else if (isImg === '6') {
                console.log('图片6')
                _this.$store.state.moveEnd.dataStorage.imgs6 = _this.$store.state.moveEnd.userDefinedForm.imgUrl6

                fieds.dataType = 9
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[8] = fieds
              } else if (isImg === '7') {
                console.log('图片7')
                _this.$store.state.moveEnd.dataStorage.imgs7 = _this.$store.state.moveEnd.userDefinedForm.imgUrl7

                fieds.dataType = 10
                fieds.value = _this.$store.state.moveEnd.dataStorage.text2H3
                _this.$store.state.moveEnd.fieldsData[9] = fieds
              }
            }


            // console.log(170)
            console.log(_this.$store.state.moveEnd.userDefinedForm.imgUrl)
            this.imgs1 = _this.$store.state.moveEnd.dataStorage.imgs1
            this.imgs2 = _this.$store.state.moveEnd.dataStorage.imgs2
            this.imgs3 = _this.$store.state.moveEnd.dataStorage.imgs3
            this.imgs4 = _this.$store.state.moveEnd.dataStorage.imgs4
            this.imgs5 = _this.$store.state.moveEnd.dataStorage.imgs5
            this.imgs6 = _this.$store.state.moveEnd.dataStorage.imgs6
            this.imgs7 = _this.$store.state.moveEnd.dataStorage.imgs7

            this.text2H1 = _this.$store.state.moveEnd.dataStorage.text2H1
            this.textSpan1 = _this.$store.state.moveEnd.dataStorage.textSpan1
            this.text2H3 = _this.$store.state.moveEnd.dataStorage.text2H3
            // this.img7 = _this.$store.state.moveEnd.dataStorage.imgNum

            console.log('数字')
            console.log(_this.$store.state.moveEnd.userDefinedForm.imgnum )
             if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 1) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl1 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs1 = 'http://182.61.33.241:8086/template/images/style/21.png'
              this.imgs1 = 'http://182.61.33.241:8086/template/images/style/21.png'
            } else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 2) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl2 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs2 = 'http://182.61.33.241:8086/template/images/style/21.png'
              this.imgs2 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 3) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl3 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs3 = 'http://182.61.33.241:8086/template/images/style/21.png'
              this.imgs3 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 4) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl4 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs4 = 'http://182.61.33.241:8086/template/images/style/21.png'
               this.imgs4 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 5) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl5 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs5 = 'http://182.61.33.241:8086/template/images/style/21.png'
               this.imgs5 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 6) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl6 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs6 = 'http://182.61.33.241:8086/template/images/style/21.png'
               this.imgs6 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }else if (_this.$store.state.moveEnd.userDefinedForm.imgnum === 7) {
              _this.$store.state.moveEnd.userDefinedForm.imgUrl7 = 'http://182.61.33.241:8086/template/images/style/21.png'
              _this.$store.state.moveEnd.dataStorage.imgs7 = 'http://182.61.33.241:8086/template/images/style/21.png'
               this.imgs7 = 'http://182.61.33.241:8086/template/images/style/21.png'
            }

          },
          watch: {
            text2H1(val){
              console.log('监听text2H1')

              console.log(val)
            }
          }
        })
    var component = new MyComponent().$mount()
    // console.log(document.getElementById('parent').innerHTML)
    // console.log(1023)
    // console.log(GLOBAL.config.html)
    document.getElementById('parent').innerHTML = ''
    document.getElementById('parent').appendChild(component.$el);
  }
}
</script>
