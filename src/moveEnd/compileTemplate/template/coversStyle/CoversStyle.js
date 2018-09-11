import { styles, stylesData, setImg, deleteTemplates, twoSave} from "@/apis/index";
// 引入裁剪
import VueCropper from '@/components/common/cropper'
// import centreCanvas from './centreCanvas/centreCanvas.vue'

export default {
  data () {
    return {
      stylesArr: [], // 这是样式库的的数据, 里面有代码块
      // 这是自定义表单里面的内容
      userDefinedForm: {
        textarea: '这是输入框', // 属性里面的文本框数据
        colourInput: '25B7ED', // 颜色输入框的6进制颜色
        color4: '#F926B7', // 颜色吸取笔的6进制颜色

        formName: {
          reserveNum: '', // 这是驻留按钮的合成表单 里面的 预约按钮

          phoneNumber: '', // 手机输入框的数据

          nameIsShow: '1', // 姓名输入框里面的是否显示与隐藏 显示为1 隐藏为2
          nameIsRequired: '1', // 这是姓名输入框里面的是否必填
          name: '', // 姓名输入框数据

          appointmentIsShow: '1', // 预约输入框里面的是否显示与隐藏 显示为1 隐藏为2
          appointmentIsRequired: '1', // 预约输入框里面的是否必填
          appointmentIsmultiple: '1', // 预约输入框里面的是否多选
          single: '1', // 这是预约输入框 单选 里面的预约时间数据, 为1 到七, 周一 到 周日
          checkList: [], // 预约时间了吗的存储复选框 数据 数组

          submitBtn: '', // 立即预约按钮的输入框
          bColourInput: 'ED19AA', // 立即预约按钮的颜色 输入框的字体
          bColor4: '#ED19AA', // 立即预约按钮的颜色 吸取笔
          // 别搞混乱, 一个是背景颜色  一个是字体颜色
          tColourInput: '25A3F1',
          tColor4: '#25A3F1',
          // 由于户型的input 框多, 重置一个对象给它
          house: {
            houseIsShow: '1', // 户型是否显示
            houseIsRequired: '1', // 户型的是否必填
            houseIsmultiple: '1', // 户型的是否多选
            // 下面是户型的input 框
            houseInput: [1,2,3,4,5,6,7,8,9],
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            // 下面是户型的input 框 是否显示
            isinput1: true,
            isinput2: true,
            isinput3: true,
            isinput4: true,
            isinput5: true,
            isinput6: true,
            isinput7: true,
            isinput8: true,
            isinput9: true,
          },

          dialBtnName: '', // 拨打电话的按钮名称
          dialPhoneName: '', // 拨打电话的电话号码
          dialBColourInput: '', // 拨打电话按钮的颜色 输入框的字体
          dialBColor4: '', // 拨打电话按钮的颜色 吸取笔
          dialbColourInput: '', // 拨打电话字体的颜色 输入框的字体
          dialbColor4: '', // 拨打电话字体的颜色 吸取笔

          imgtColourInput: '7B175C', // 单图 和 颜色背景的 输入框的字体
          imgbColor4: '#fff', // 单图 和 颜色背景的 吸取笔
        }
      },

      styleId: '',
      activeFormList: [],
      // 裁剪功能
      isSaveStyle:false,//判断样式库是否编辑保存过
      imgName:'',
      // 裁剪
      // CropId:0,//选择上传组件标识
      fullscreenLoading:false,
      dialogFormVisible: false,
      example2: {
        // img:'',
        img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=415293130,2419074865&fm=27&gp=0.jpg', // 图片的地址
      /*  autoCrop: true,
        info: true,
        autoCropWidth: 550,
        autoCropHeight: 200,
        fixedBox: true,*/
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        centerBox:true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [4, 3]
      },
      imgRatio: [],
      imgUrl: '',
      backgroundurl: '', // 背景图片的地址
      backgroundNum: 0,


      // // 第二步保存的时候需要的参数
      moduleLists: [],
      // // 画布的数据
      canvasData: [],  // 也是保存需要的参数
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.moveEnd.isData = 0
    next()
  },
  mounted() {
    console.log(this.$store.state.moveEnd.isData)
    console.log(this.$store.state.moveEnd.moduleList)
    // 样式库返回的代码块 和 图片
    styles()
      .then(res => {
        this.stylesArr = res.data.list
        console.log('样式库图片 和 代码块')
        console.log(res)
        // console.log(this.GLOBAL.config.html)
        // console.log(this.stylesArr[1].content)
      });

  },

  methods: {
    // 我
    // 返回基本信息页面
    back() {
      this.$store.state.moveEnd.moveuuid= ''
      this.$router.push('/eoveEnd/essential/1')
    },
    // 联动删除
    deleteImg(file, fileList) {
      console.log(file)
      console.log(fileList)
      console.log(this.activeFormList)
      // for (var i = 0; i < this.activeFormList.length; i++) {
        // console.log(this.activeFormList[i].url)
        if (file.url === this.$store.state.moveEnd.dataStorage.imgs1) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 1
        } else if (file.url === this.$store.state.moveEnd.dataStorage.imgs2) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 2
        } else if (file.url === this.$store.state.moveEnd.dataStorage.imgs3) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 3
        }else if (file.url === this.$store.state.moveEnd.dataStorage.imgs4) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 4
        }else if (file.url === this.$store.state.moveEnd.dataStorage.imgs5) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 5
        }else if (file.url === this.$store.state.moveEnd.dataStorage.imgs6) {
          this.$store.state.moveEnd.userDefinedForm.imgnum = 6
        }else if (file.url === this.$store.state.moveEnd.dataStorage.imgs7) {
          this.$store.state.moveEnd.userDefinedForm.imgnum =7
        }

      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })

    },
    uploading() {
      this.$refs.cropper.getCropData(data => {
        // console.log(data)
        setImg({ imgStr: data, fileName: this.imgName })
          .then(res => {
            this.dialogFormVisible = false;
            if (res.code === 1) {
              console.log(256)
              if (this.backgroundNum === 1) {
                this.backgroundurl = res.data.fileUrl
              } else {
                this.imgUrl = res.data.fileUrl
              }
              console.log(res.data.fileUrl)
              this.activeFormList.push({name: this.imgName, url: res.data.fileUrl})
            }
          })
      })
    },
    // 上传背景图片的
    BCropState(file, fileList) {
      this.backgroundNum =1
      // 把更改裁剪
      this.example2.fixedNumber[0] = 3.75
      this.example2.fixedNumber[1] = 6.67
      console.log(3)
      this.imgName = file.name

      // 拿到图片本地地址, 进行渲染裁剪, 把上传功能截掉, 然后重新定义一个axios 请求, 发送请求
      console.log('状态更改时')
      // console.log(this.activeFormList)
      this.example2.img = file.url
      // console.log(file)
      this.fileName = file.name;
      this.dialogFormVisible = true;

      setTimeout(() => {
        this.$refs.cropper.refresh();
      }, 110)
    },
    // 将图片转化成base64
    CropState(file, fileList) {
      // 把更改裁剪框
      // console.log(this.example2.fixedNumber)
      // console.log(this.imgRatio)
      let imgNum = parseInt(localStorage.getItem('imgNum')) -1
      this.example2.fixedNumber[0] = this.imgRatio[imgNum].width
      this.example2.fixedNumber[1] = this.imgRatio[imgNum].height
      // console.log(this.example2.fixedNumber)
      // console.log(this.imgRatio)
      console.log(file)
      console.log(3)
      this.imgName = file.name

      // 拿到图片本地地址, 进行渲染裁剪, 把上传功能截掉, 然后重新定义一个axios 请求, 发送请求
      console.log('状态更改时')
      // console.log(this.activeFormList)
      this.example2.img = file.url
      // console.log(file)
      this.fileName = file.name;
      this.dialogFormVisible = true;

      setTimeout(() => {
        this.$refs.cropper.refresh();
      }, 110)
    },
    // 样式 插件 属性tab 栏的动态更改
    actives(num) {
      this.$store.state.moveEnd.html1.stylesActive = num
      // 更改样式的时候, 判断它是点击的那个插件, 让它的默认第一个按钮 点亮
      if (num === 1) {
        this.$store.state.moveEnd.html1.primary = 1
      } else {
        this.$store.state.moveEnd.html1.primary = 4
      }
    },
    // 这是样式里面的按钮tab 栏动态更改
    btnType(num) {
      this.$store.state.moveEnd.html1.primary = num
    },
    // 这是清空画布内容(重置)
    coverEmpty() {
      console.log(1)
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle'
      })
      this.$refs.codeChunk.innerHTML=''
      console.log(this.$refs.codeChunk.innerHTML)
    },
    // 这是上传背景图, 让它在样式属性里面 显示上传组件
    backgroundImg() {
      this.$store.state.moveEnd.html1.stylesActive = 3
      this.$store.state.moveEnd.html1.attribute = 9
      console.log(2)
    },
    // 这是删除模板页的
    deleteTemplate() {
      // if (this.$store.state.moveEnd.templateId) {
      //   deleteTemplates({
      //     styleId: this.styleId,
      //     plannInfoId: this.$store.state.moveEnd.moveuuid,
      //     labelId: this.$store.state.moveEnd.template.templateId
      //   })
      //     .then(res => {
      //       console.log(res)
      //     })
      // } else {
      this.$store.state.moveEnd.template.data.label.splice(this.$store.state.moveEnd.template.num, 1)
      this.$store.state.moveEnd.moduleList.splice(this.$store.state.moveEnd.presentIndex, 1)
      // }
    },
    // 选择户型里面的删除input
    deleteHouse(index) {
      this.userDefinedForm.formName.house.houseInput.pop()
      if (index === 1) {
        this.userDefinedForm.formName.house.isinput1 = false
      } else if (index === 2) {
        this.userDefinedForm.formName.house.isinput2 = false
      } else if (index === 3) {
        this.userDefinedForm.formName.house.isinput3 = false
      } else if (index === 4) {
        this.userDefinedForm.formName.house.isinput4 = false
      } else if (index === 5) {
        this.userDefinedForm.formName.house.isinput5 = false
      } else if (index === 6) {
        this.userDefinedForm.formName.house.isinput6 = false
      } else if (index === 7) {
        this.userDefinedForm.formName.house.isinput7 = false
      } else if (index === 8) {
        this.userDefinedForm.formName.house.isinput8 = false
      } else {
        this.userDefinedForm.formName.house.isinput9 = false
      }
    },
    // 选择户型里面的添加input
    addHouse(index) {
      console.log(index)
      this.userDefinedForm.formName.house.houseInput.push(index)
      if (index === 1) {
        this.userDefinedForm.formName.house.isinput1 = true
      } else if (index === 2) {
        this.userDefinedForm.formName.house.isinput2 = true
      } else if (index === 3) {
        this.userDefinedForm.formName.house.isinput3 = true
      } else if (index === 4) {
        this.userDefinedForm.formName.house.isinput4 = true
      } else if (index === 5) {
        this.userDefinedForm.formName.house.isinput5 = true
      } else if (index === 6) {
        this.userDefinedForm.formName.house.isinput6 = true
      } else if (index === 7) {
        this.userDefinedForm.formName.house.isinput7 = true
      } else if (index === 8) {
        this.userDefinedForm.formName.house.isinput8 = true
      } else {
        this.userDefinedForm.formName.house.isinput9 = true
      }
    },
    // 点击样式库的时候, 发起请求 获取到画布的数据
    getCanvasData(item) {
      console.log( this.$store.state.moveEnd.presentIndex)
      this.moduleLists = this.$store.state.moveEnd.moduleList
      console.log(this.moduleLists)
      console.log(this.$store.state.moveEnd.moduleList)
      // console.log( this.$store.state.moveEnd.fieldsData)
      console.log(this.$store.state.moveEnd.fieldsData)
      this.activeFormList = []
      // 裁剪比例:
      //  1. 我利用返回的数据 循环每个数据判断是否有有图片图片,
      //  2. 在拿到图片的比例, 除以100, 然后更改裁剪图片的比例
      //  3. 如果是多张图片, 那么就再点击画布图片的时候, 判断 在进行判断
      console.log(item.id)
      // 把模板样式库id 加入指定的数组, 在第二步保存的时候 需要用
      this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.template.num].templateStyleId = item.id

      // 让图片还原
      this.$store.state.moveEnd.userDefinedForm.imgUrl= 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs1 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs2 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs3 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs4 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs5 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs6 = 'http://182.61.33.241:8086/template/images/style/21.png'
      this.$store.state.moveEnd.dataStorage.imgs7 = 'http://182.61.33.241:8086/template/images/style/21.png'
      stylesData(item.id)
        .then(res => {
          if (res.code === 1) {
            this.imgRatio = []
            console.log('样式库数据')
            console.log(res)
            res.data.list.map((item, index) => {
              if (item.type === 1) {
                console.log(item)
                let ratio = item.pixel.split('*')
                ratio[0] = ratio[0] / 100
                ratio[1] = ratio[1] / 100
                 let ratioStr = {
                  width: ratio[0],
                  height: ratio[1]
                }
                this.imgRatio.push(ratioStr)
              }
            })
            console.log(this.imgRatio)
            // 代码块
            this.GLOBAL.config.html.htmlCode = item.content

            // 判断以后是否是保存之后再次更改, 和在编辑的时候 进行的编辑判断
            if (this.$store.state.moveEnd.isData === 1) {
              console.log('保存, 有数据')
              console.log(this.$store.state.moveEnd.moduleList)
              console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields)
              // 判断 数组是否为空 以便用户新增的时候 画布不是之前的数据
              if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length === 0) {
              this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                res.data.list.map((item, index) => {
                  console.log(item)
                  if (item.type === 2) {
                    if (item.titleType === 1) {
                      this.$store.state.moveEnd.dataStorage.text2H1 = item.defaultValue
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                    } else {
                      this.$store.state.moveEnd.dataStorage.text2H3 = item.defaultValue
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                    }
                  } else if (item.type === 3) {
                    this.$store.state.moveEnd.dataStorage.textSpan1 = item.defaultValue
                    this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                  } else if (item.type === 1) {
                      let isImg = localStorage.getItem('imgNum')
                      // console.log('这是图片')
                      if (isImg === '1') {
                        console.log('图片1')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl1 =item.defaultValue
                      } else if (isImg === '2') {
                        console.log('图片2')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl2 =item.defaultValue
                      } else if (isImg === '3') {
                        console.log('图片3')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl3 =item.defaultValue
                      } else if (isImg === '4') {
                        console.log('图片4')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl4 =item.defaultValue
                      } else if (isImg === '5') {
                        console.log('图片5')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl5 =item.defaultValue
                      } else if (isImg === '6') {
                        console.log('图片6')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl6 =item.defaultValue
                      } else if (isImg === '7') {
                        console.log('图片7')
                        this.$store.state.moveEnd.userDefinedForm.imgUrl7 =item.defaultValue
                      }
                    }
                })
              }
              this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
                console.log(item)
                if (item.type === 2) {
                  if (parseInt(item.titleType) === 1) {
                    console.log(localStorage.getItem('headline'))
                    this.$store.state.moveEnd.dataStorage.text2H1 = item.value
                    if (localStorage.getItem('headline') === '1') {
                      console.log(item)
                      this.$store.state.moveEnd.userDefinedForm.textarea = item.value
                      console.log( this.$store.state.moveEnd.userDefinedForm.textarea)
                    }
                  } else {
                    this.$store.state.moveEnd.dataStorage.text2H3 = item.value
                    if (localStorage.getItem('headline') === '2') {
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                    }
                    this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                  }
                } else if (item.type === 3) {
                  this.$store.state.moveEnd.dataStorage.textSpan1 = item.value
                  if (localStorage.getItem('main') === '1') {
                    this.$store.state.moveEnd.userDefinedForm.textarea = item.value
                  }
                  this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                } else if (item.type === 1) {
                    let isImg = localStorage.getItem('imgNum')
                    // console.log('这是图片')
                    if (isImg === '1') {
                      console.log('图片1')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl1 =item.value
                    } else if (isImg === '2') {
                      console.log('图片2')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl2 =item.value
                    } else if (isImg === '3') {
                      console.log('图片3')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl3 =item.value
                    } else if (isImg === '4') {
                      console.log('图片4')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl4 =item.value
                    } else if (isImg === '5') {
                      console.log('图片5')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl5 =item.value
                    } else if (isImg === '6') {
                      console.log('图片6')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl6 =item.value
                    } else if (isImg === '7') {
                      console.log('图片7')
                      this.$store.state.moveEnd.userDefinedForm.imgUrl7 =item.value
                    }
                      }
                  })
            } else {
              console.log('没保存, 没数据')

              // 以防用户 再次编辑 已经编辑过的
              if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex]) {
                console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
                if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0) {
                  console.log('会编')
                  this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
                    console.log(item)
                    if (item.type === 2) {
                      if (item.titleType === 1) {
                        this.$store.state.moveEnd.dataStorage.text2H1 = item.value
                        if (localStorage.getItem('total') === 'headline' && localStorage.getItem('headline') === '1') {
                          this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                        }
                      } else {
                        this.$store.state.moveEnd.dataStorage.text2H3 = item.value
                        if (localStorage.getItem('total') === 'headline' && localStorage.getItem('headline') === '2') {
                          this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                        }
                      }
                    } else if (item.type === 3) {
                      this.$store.state.moveEnd.dataStorage.textSpan1 = item.value
                      if (localStorage.getItem('total') === 'main' && localStorage.getItem('main') === '1') {
                        this.$store.state.moveEnd.userDefinedForm.textarea =item.value
                      }
                    } else if (item.type === 1) {
                      // console.log('这是图片')
                    }
                  })
                } else {
                  res.data.list.map((item, index) => {
                    // console.log(item)
                    if (item.type === 2) {
                      if (item.titleType === 1) {
                        this.$store.state.moveEnd.dataStorage.text2H1 = item.defaultValue
                        this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                      } else {
                        this.$store.state.moveEnd.dataStorage.text2H3 = item.defaultValue
                        this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                      }
                    } else if (item.type === 3) {
                      this.$store.state.moveEnd.dataStorage.textSpan1 = item.defaultValue
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                    } else if (item.type === 1) {
                      // console.log('这是图片')
                    }
                  })
                }
              } else {
                res.data.list.map((item, index) => {
                  // console.log(item)
                  if (item.type === 2) {
                    if (item.titleType === 1) {
                      this.$store.state.moveEnd.dataStorage.text2H1 = item.defaultValue
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                    } else {
                      this.$store.state.moveEnd.dataStorage.text2H3 = item.defaultValue
                      this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                    }
                  } else if (item.type === 3) {
                    this.$store.state.moveEnd.dataStorage.textSpan1 = item.defaultValue
                    this.$store.state.moveEnd.userDefinedForm.textarea =item.defaultValue
                  } else if (item.type === 1) {
                    // console.log('这是图片')
                  }
                })
              }
            }
            this.$store.state.moveEnd.canvasData = res.data.list
            // this.GLOBAL.config.html.htmlData = res.data.list
            this.$router.push({
              path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
            })
          }
        })
        if (this.styleId !== '' && this.styleId !== item.id) {
          this.$store.state.moveEnd.fieldsData = []
          localStorage.setItem('headline', 0)
          localStorage.setItem('main', 0)
          localStorage.setItem('imgNum', 0)
        }

        this.styleId = item.id
    },
    // 保存
    next() {
      console.log(this.$store.state.moveEnd.moveuuid)
      console.log(this.$store.state.moveEnd.moduleList)


      let isTotal = localStorage.getItem('total')
      let isHeadline = localStorage.getItem('headline')
      let isMain = localStorage.getItem('main')




      // 第二步保存的参数获取
      if (this.$store.state.moveEnd.isData === 1) { // 判断是否已经保存 上传, 如果存储, 那么就更改参数数组对应的数据, 而不是全部更改, 如果没有上传, 那么就把数据加入参数数组中
        if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length === 0) {
          this.$store.state.moveEnd.canvasData.map((item, index) => {
            // console.log(item)
            item.count = 1
            item.sowType = 1
            // console.log(item)
            if (item.type === 2) {
              if (item.titleType === 1) {
                item.value = this.$store.state.moveEnd.dataStorage.text2H1
              } else {
                item.value = this.$store.state.moveEnd.dataStorage.text2H3
              }
            } else if (item.type === 3) {
              item.value = this.$store.state.moveEnd.dataStorage.textSpan1
            } else if (item.type === 1) {
              if (item.imageOrder === 1) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs1
              } else if (item.imageOrder === 2) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs2
              } else if (item.imageOrder === 3) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs3
              } else if (item.imageOrder === 4) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs4
              } else if (item.imageOrder === 5) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs5
              } else if (item.imageOrder === 6) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs6
              } else if (item.imageOrder === 7) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs7
              }
            }
          })
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.canvasData
        } else {
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
            // console.log(item)
          console.log(this.$store.state.moveEnd.dataStorage.imgs3)
            if (item.type === 2) {
              if (item.titleType === 1) {
                item.value = this.$store.state.moveEnd.dataStorage.text2H1
              } else {
                item.value = this.$store.state.moveEnd.dataStorage.text2H3
              }
            } else if (item.type === 3) {
              item.value = this.$store.state.moveEnd.dataStorage.textSpan1
            } else if (item.type === 1) {
              if (item.imageOrder === 1) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs1
              } else if (item.imageOrder === 2) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs2
              } else if (item.imageOrder === 3) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs3
              } else if (item.imageOrder === 4) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs4
              } else if (item.imageOrder === 5) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs5
              } else if (item.imageOrder === 6) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs6
              } else if (item.imageOrder === 7) {
                item.value = this.$store.state.moveEnd.dataStorage.imgs7
              }
            }
            })
        }
      } else {
        // console.log(561230.)
        this.$store.state.moveEnd.canvasData.map((item, index) => {
          // console.log(item)
          item.count = 1
          item.sowType = 1
          // console.log(item)
          if (item.type === 2) {
            if (item.titleType === 1) {
              item.value = this.$store.state.moveEnd.dataStorage.text2H1
            } else {
              item.value = this.$store.state.moveEnd.dataStorage.text2H3
            }
          } else if (item.type === 3) {
            item.value = this.$store.state.moveEnd.dataStorage.textSpan1
          } else if (item.type === 1) {
            if (item.imageOrder === 1) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs1
            } else if (item.imageOrder === 2) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs2
            } else if (item.imageOrder === 3) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs3
            } else if (item.imageOrder === 4) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs4
            } else if (item.imageOrder === 5) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs5
            } else if (item.imageOrder === 6) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs6
            } else if (item.imageOrder === 7) {
              item.value = this.$store.state.moveEnd.dataStorage.imgs7
            }
          }
        })
        this.canvasData = this.$store.state.moveEnd.canvasData
        // console.log(this.canvasData)
        if (this.$store.state.moveEnd.isData === 1) {
          this.$store.state.moveEnd.moduleList[index].fields = this.canvasData
        } else {
          // console.log(123465)
          // console.log(this.canvasData)
          this.$store.state.moveEnd.template.data.label.map((item, index) => {
            // console.log(item.templateStyleId)
            if (item.id === this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].id) {
                this.$store.state.moveEnd.moduleList[index] = {
                  labelName: item.name,
                  templateLabelId: item.id,
                  templateStyleId: item.templateStyleId,
                  htmlId: item.htmlId,
                  mLabelId: item.mLabelId,
                  type: item.type,
                  order: index + 1,
                  fields: this.canvasData,
                }
              item.fields = this.canvasData
              // console.log(this.$store.state.moveEnd.moduleList[index])
              this.$store.state.moveEnd.moduleListNum.push(index)
            } else {
              if (!item.fields) {
                // console.log(index+'有')
                this.$store.state.moveEnd.moduleList[index] = {
                  labelName: item.name,
                  templateLabelId: item.id,
                  templateStyleId: item.templateStyleId,
                  htmlId: item.htmlId,
                  mLabelId: item.mLabelId,
                  type: item.type,
                  order: index + 1,
                  fields:[],
                }
              }
            }
          })
        }
      }




      // // 第二步保存的参数获取
      // this.$store.state.moveEnd.canvasData.map((item, index) => {

      //   if (isTotal === 'headline') {
      //     if (isHeadline === '1') {
      //       if (item.type === 2 && item.titleType === 1) {
      //         item.txtColor = this.$store.state.moveEnd.userDefinedForm.colourInput
      //         console.log(item)
      //       }
      //     } else if (isHeadline === '2') {
      //       if (item.type === 2 && item.titleType === 0) {
      //         item.txtColor = this.$store.state.moveEnd.userDefinedForm.colourInput
      //         // console.log(item)
      //       }
      //     }
      //   } else if (isTotal === 'main'){
      //     item.txtColor = this.$store.state.moveEnd.userDefinedForm.colourInput
      //   }
      //   item.count =1
      //   item.sowType = 1
      //   // console.log(item)
      //   if (item.type === 2) {
      //     if (item.titleType === 1) {
      //       item.value = this.$store.state.moveEnd.dataStorage.text2H1
      //     } else {
      //       item.value = this.$store.state.moveEnd.dataStorage.text2H3
      //     }
      //   } else if (item.type === 3) {
      //     item.value = this.$store.state.moveEnd.dataStorage.textSpan1
      //   } else if (item.type === 1) {
      //     if (item.order === 1) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs1
      //     } else if (item.order === 2) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs2
      //     } else if (item.order === 3) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs3
      //     } else if (item.order === 4) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs4
      //     } else if (item.order === 5) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs5
      //     } else if (item.order === 6) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs6
      //     } else if (item.order === 7) {
      //       item.value = this.$store.state.moveEnd.dataStorage.imgs7
      //     }
      //   }
      // })
      // this.canvasData = this.$store.state.moveEnd.canvasData
      // this.$store.state.moveEnd.template.data.label.map((item, index) => {
      //   // console.log(this.$store.state.moveEnd.moduleList)
      //   if (item.id === this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].id) {
      //     console.log(item)
      //     this.$store.state.moveEnd.moduleList[index] = {
      //       labelName: item.name,
      //       templateLabelId: item.id,
      //       templateStyleId: item.templateStyleId,
      //       htmlId:  item.htmlId,
      //       mLabelId: item.mLabelId,
      //       type: item.type,
      //       order: index + 1,
      //       fields: this.canvasData,
      //     }
      //     this.$store.state.moveEnd.moduleListNum.push(index)
      //   } else {
      //     let _index = index
      //     let _item = item
      //     this.$store.state.moveEnd.moduleListNum.map(item=> {
      //       if (this.$store.state.moveEnd.moduleListNum[index] === _index) {
      //         // console.log(this.$store.state.moveEnd.moduleList[index])
      //         // console.log(this.$store.state.moveEnd.moduleListNum[index])
      //       } else {
      //         this.$store.state.moveEnd.moduleList[index] = {
      //           labelName: _item.name,
      //           templateLabelId: _item.id,
      //           templateStyleId: _item.templateStyleId,
      //           htmlId: _item.htmlId,
      //           mLabelId: _item.mLabelId,
      //           type: _item.type,
      //           order: _index + 1,
      //           fields: [],
      //         }
      //       }
      //     })
      //     // console.log(this.$store.state.moveEnd.moduleList[index].fields)

        // }
      // })

      console.log(this.$store.state.moveEnd.moduleList)
      twoSave({
        uuid: this.$store.state.moveEnd.moveuuid,
        moduleList: this.$store.state.moveEnd.moduleList
      })
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            res.data.labels.map((item, index) => {
              // console.log(item)
              this.$store.state.moveEnd.moduleList[index].htmlId = item.htmlId
              this.$store.state.moveEnd.moduleList[index].mLabelId = item.id
              // console.log(item.fields)
              if (item.fields === null) {
                item.fields = []
              }
              let _index = index
              item.fields.map((item, index) => {
                this.$store.state.moveEnd.moduleList[_index].fields[index].id = item.id
              })
            })
            // 用来判断是否添加成功 以便不跳转页面用户再次更改
            this.$store.state.moveEnd.isData = 1
            console.log(this.$store.state.moveEnd.moduleList)
          }
        })
    }
  },
  computed: {
    // 让属性文本框背景色事实更新
    color() {
      return 'background:'+this.userDefinedForm.color4
    },
    // 表单背景色事实更新
    btnColor() {
      return 'background:'+this.userDefinedForm.formName.bColor4
    },
    // 表单字体事实更新
    textColor() {
      return 'background:'+this.userDefinedForm.formName.tColor4
    },
    // 上传图片 或是 背景设置背景颜色事实更新
    imgbColor() {
      return 'background:'+this.userDefinedForm.formName.imgbColor4
    },
    // 以下9个都是户型里面的input 框的字符串监听
    houseIsinput1() {
      return this.userDefinedForm.formName.house.input1.length
    },
    houseIsinput2() {
      return this.userDefinedForm.formName.house.input2.length
    },
    houseIsinput3() {
      return this.userDefinedForm.formName.house.input3.length
    },
    houseIsinput4() {
      return this.userDefinedForm.formName.house.input4.length
    },
    houseIsinput5() {
      return this.userDefinedForm.formName.house.input5.length
    },
    houseIsinput6() {
      return this.userDefinedForm.formName.house.input6.length
    },
    houseIsinput7() {
      return this.userDefinedForm.formName.house.input7.length
    },
    houseIsinput8() {
      return this.userDefinedForm.formName.house.input8.length
    },
    houseIsinput9() {
      return this.userDefinedForm.formName.house.input9.length
    },
    backgroundimg() {
      console.log(5698)
      console.log(this.backgroundurl)
      return `background-image: url(${this.backgroundurl})`
    }
  },
  watch: {
    // 让属性文本框颜色的数值事实更新
    'userDefinedForm.color4'(val) {
      this.userDefinedForm.colourInput = val.replace('#','')
      this.$store.state.moveEnd.userDefinedForm.colourInput = val
    },
    // 监听的是表单按钮里面的颜色数值事实更新
    'userDefinedForm.formName.bColor4'(val) {
      this.userDefinedForm.formName.bColourInput = val.replace('#','')
    },
    'userDefinedForm.formName.tColor4'(val) {
      this.userDefinedForm.formName.tColourInput = val.replace('#','')
    },
    'userDefinedForm.formName.imgbColor4'(val) {
      this.userDefinedForm.formName.imgtColourInput = val.replace('#','')
    },
    // 监听vuex 里面的数据, 让它在更改的时候就跳转页面, 然后在那个页面再跳转回来本来的页面, 达到时实更新的效果
    '$store.state.moveEnd.userDefinedForm.textarea'(val) {
      // console.log(val)
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })
    },
    // 中间画布清除, 以便第二步的保存
    '$store.state.moveEnd.canvasNum'(val) {
      document.querySelectorAll('.codeChunk')[0].innerHTML = ''
    },
    imgUrl(val) {
      console.log('跳')
      // console.log(val)
      let isImg = localStorage.getItem('imgNum')
      if (isImg === '1') {
        this.$store.state.moveEnd.userDefinedForm.imgUrl1 = val
      } else if (isImg === '2') {
       this.$store.state.moveEnd.userDefinedForm.imgUrl2 = val
      } else if (isImg === '3') {
        this.$store.state.moveEnd.userDefinedForm.imgUrl3 = val
      } else if (isImg === '4') {
       this.$store.state.moveEnd.userDefinedForm.imgUrl4 = val
      } else if (isImg === '5') {
        this.$store.state.moveEnd.userDefinedForm.imgUrl5 = val
      } else if (isImg === '6') {
       this.$store.state.moveEnd.userDefinedForm.imgUrl6 = val
      } else if (isImg === '7') {
        this.$store.state.moveEnd.userDefinedForm.imgUrl7 = val
      }
      // this.$store.state.moveEnd.userDefinedForm.imgUrl = val
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })
    },
  },
  // this.$store.state.moveEnd.html1
  components: {
    VueCropper
  }
}
