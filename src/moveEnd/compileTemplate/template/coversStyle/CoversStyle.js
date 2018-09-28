import { styles, stylesData, setImg, compileDate, twoSave, deleteTemplates} from "@/apis/index";
// 引入裁剪
import VueCropper from '@/components/common/cropper'
// import centreCanvas from './centreCanvas/centreCanvas.vue'

export default {
  data() {
    return {
      isHtml: '',//点击获取样式

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


          // submitBtn: '', // 立即预约按钮的输入框
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
            houseInput: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        }
      },

      styleId: '',
      activeFormList: [],
      // 裁剪功能
      isSaveStyle: false,//判断样式库是否编辑保存过
      imgName: '',
      // 裁剪
      // CropId:0,//选择上传组件标识
      fullscreenLoading: false,
      dialogFormVisible: false,
      example2: {
        // img:'',
        img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=415293130,2419074865&fm=27&gp=0.jpg', // 图片的地址
        /*  autoCrop: true,
          info: true,
          // autoCropWidth: 550,
          // autoCropHeight: 200,
          fixedBox: true,*/
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        centerBox: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [4, 3]
      },
      imgRatio: [],
      imgUrl: '',
      // backgroundurl: '', // 背景图片的地址
      backgroundNum: 0,


      // // // 第二步保存的时候需要的参数
      // moduleLists: [],
      // // // 画布的数据
      // canvasData: [],  // 也是保存需要的参数

      // 联动删除的时候
      index: [],
      save: 'false',
      lackid: false,
      // 做为表单的数据过滤处理
      fromData: [],

      imgtColourInput: '7B175C', // 单图 和 颜色背景的 输入框的字体
      backgroundimg: '#fff', // 单图 和 颜色背景的 吸取笔
      textwodr: '',
      upimg: '0',
      changecolor: '',
      NewimgtColourInput: '',
      

      // 驻留按钮
      lingeringBtn: [
    {
      value: '4008888888',
      id: ''
    },
    {
      value: '输入手机',
      id: ''
    },
    {
      value: '输入姓名',
      // 是否显示 和 是否必选
      isVisual: '1',
      isMust: '1',
      id: ''
    },
    {
      value: '选择时间',
      isVisual: '1', // 预约输入框里面的是否显示与隐藏 显示为1 隐藏为2
      isMust: '1', // 预约输入框里面的是否必填
      checkType: '1', // 预约输入框里面的是否多选
      checkList: [], // 预约时间了吗的存储复选框 数据 数组
      id: ''
    },
    {
      value: '',
      isVisual: '1', // 户型是否显示
      isMust: '1', // 户型的是否必填
      checkType: '1', // 户型的是否多选
      // 下面是户型的input 框
      // houseInput: [1,2,3,4,5,6,7,8,9],
      input: ['一房一厅'],
      id: ''
    },
  ],
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(5321312123)
    console.log(to)
    localStorage.setItem('idData', '0')
    localStorage.setItem('edit', 'false')
    if (to.matched[0].path !== '/eoveEnd/compileTemplate/template/coversStyle') {
      // this.formLabelAlign = {}
      // console.log(this.formLabelAlign)
      this.$store.state.moveEnd.moveuuid = ''
      this.formLabelAlign.uuid = ''
      this.formLabelAlign.name = ''
      this.formLabelAlign.construction = ''
      this.formLabelAlign.constructionId = ''
      this.formLabelAlign.constructionID = ''
      this.formLabelAlign.project = ''
      this.formLabelAlign.projectId = ''
      this.formLabelAlign.phone1 = ''
      this.formLabelAlign.phone2 = ''
      this.formLabelAlign.webpageName = ''
      this.formLabelAlign.projectCode = ''
      this.formLabelAlign.deliveryManagements = []
      this.formLabelAlign.deliveryManagementsArr = []
      console.log(this.formLabelAlign)
    }
    next()
  },
  created() {
    console.log(this.$store.state.moveEnd.moduleList)
    if (localStorage.getItem('idData') === '1') {
      window.onunload = function () {
        localStorage.setItem('refresh', '1')
      }
    }
    console.log(this.$store.state.moveEnd.template.data.label)
    console.log(localStorage.getItem('idData'))
    // 样式库返回的代码块 和 图片
    console.log(this.$store.state.moveEnd.majorKeyId.styleType)
    styles(this.$store.state.moveEnd.majorKeyId.styleType)
      .then(res => {
        this.stylesArr = res.data.list
        this.$store.state.moveEnd.stylesCode = res.data.list
        console.log('样式库图片 和 代码块')
        console.log(res)
        // console.log(this.GLOBAL.config.html)
        // console.log(this.stylesArr[1].content)
        console.log(this.$store.state.moveEnd.moduleList !== [])
        if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
          this.$store.state.moveEnd.backgroundUrl = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].color
          console.log(this.$store.state.moveEnd.backgroundUrl)
          console.log(45.131341)

          this.$store.state.moveEnd.stylesCode.map((item, index) => {
            if (this.$store.state.moveEnd.moduleList[0].templateStyleId === item.id) {
              this.GLOBAL.config.html.htmlCode = item.content
              this.$store.state.moveEnd.elmentFormOne = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.template.num].fields
            }
          })
          this.$store.state.moveEnd.presentIndex = 0

          this.$store.state.moveEnd.html1.stylesActive = 1
          this.$store.state.moveEnd.html1.attribute = 1
          this.$store.state.moveEnd.html1.primary = 1
          this.$store.state.moveEnd.plugForm = false,
          this.$store.state.moveEnd.exploitData = false
          this.$store.state.moveEnd.styleCode = true
          this.$store.state.moveEnd.isLingeringBtn = false
          this.$router.push({
            path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
          })
        }
      })
    this.textword = this.$store.state.moveEnd.userDefinedForm.textarea
    this.upimg = this.$store.state.moveEnd.uploadImg
    this.NewimgtColourInput = this.imgtColourInput
  },
  methods: {
    // 颜色改变时
    // changecolor() {
    //   console.log('changecolor')
    // },
    // 取消按钮
    cansel() {
      console.log("取消按钮")
      // 文本
      console.log(this.$store.state.moveEnd.userDefinedForm.textarea)
      // 图片
      console.log(this.$store.state.moveEnd.uploadImg)
      if (this.textword != this.$store.state.moveEnd.userDefinedForm.textarea || this.upimg == '1' ||
      this.NewimgtColourInput != this.imgtColourInput
      ) {
        this.$confirm('确定放弃当前的编辑？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/LandingPageSetting'})
        }).catch(() => {

        });
      } else {
        console.log("页面未编辑直接跳转到课表页面")
        this.$router.push({ path: '/LandingPageSetting'})
      }
    },
    hue(val, index) {
      console.log(val)
      console.log(index)
      if (index === 1) {
        val.bColourInput = val.btnColor.replace('#', '')
      } else {
        val.tColourInput = val.txtColor.replace('#', '')
      }
    },
    // 表单的控制
    formMenu(num) {
      console.log(num)
      this.$store.state.moveEnd.isPitch = num
      this.$store.state.moveEnd.html1.attribute = 0
      this.$store.state.moveEnd.html1.stylesActive = 3
    },
    // 开发商信息控制
    exploit() {
      console.log(45313)
      this.$store.state.moveEnd.html1.attribute = 3
      this.$store.state.moveEnd.html1.stylesActive = 3
    },
    // 返回基本信息页面
    back() {
      this.$store.state.moveEnd.moveuuid = ''
      this.$router.push('/eoveEnd/essential/1')
    },
    // 联动删除
    deleteImg(index) {
      console.log(this.$store.state.moveEnd.uploadImg.length)
      if (localStorage.getItem('type') === '4' && this.$store.state.moveEnd.uploadImg.length !== 1) {
        this.$store.state.moveEnd.uploadImg.splice(index, 1)
        console.log(this.$store.state.moveEnd.uploadImg)
        this.imgUrl = this.$store.state.moveEnd.uploadImg[0].url
      } else {
        this.$store.state.moveEnd.uploadImg.splice(index, 1)
        this.$store.state.moveEnd.elmentFormOne[localStorage.getItem('index')].value = this.$store.state.moveEnd.elmentFormOne[localStorage.getItem('index')].defaultValue
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
                this.$store.state.moveEnd.backgroundimg = res.data.fileUrl
                this.$store.state.moveEnd.backgroundUrl = res.data.fileUrl
              } else {
                this.imgUrl = res.data.fileUrl
                if (localStorage.getItem('type') === '4') {
                  this.$store.state.moveEnd.uploadImg.push({
                    url: res.data.fileUrl
                  })
                } else {
                  this.$store.state.moveEnd.uploadImg[0] = {
                    url: res.data.fileUrl
                  }
                }
              }
              console.log(res.data.fileUrl)
              this.activeFormList.push({ name: this.imgName, url: res.data.fileUrl })
            }
          })
      })
    },
    // 上传背景图片的
    BCropState(file, fileList) {
      this.backgroundNum = 1
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
      console.log(this.imgRatio)
      console.log(parseInt(localStorage.getItem('index')))
      this.$store.state.moveEnd.elmentFormOne.map((item, index) => {
        if (item.order === parseInt(localStorage.getItem('index')) + 1) {
          console.log(item)
          let ratio = item.pixel.split('*')
          ratio[0] = ratio[0] / 100
          ratio[1] = ratio[1] / 100
          this.example2.fixedNumber[0] = ratio[0]
          this.example2.fixedNumber[1] = ratio[1]
          console.log(ratio)
          // this.$store.state.moveEnd.elmentFormOne[index].value = item.
        }
      })
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
      if (!this.$store.state.moveEnd.isBtn) {
        this.$store.state.moveEnd.html1.stylesActive = num
        // 更改样式的时候, 判断它是点击的那个插件, 让它的默认第一个按钮 点亮
        if (num === 1) {
          this.$store.state.moveEnd.html1.primary = 1
        } else {
          this.$store.state.moveEnd.html1.primary = 4
        }
      }
    },
    // 这是样式里面的按钮tab 栏动态更改
    btnType(num) {
      this.$store.state.moveEnd.html1.primary = num
    },
    // 这是清空画布内容(重置)
    coverEmpty() {
      this.$confirm('确定清空画布样式？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(41455)
        this.$store.state.moveEnd.backgroundUrl = ''
        this.$refs.codeChunk.innerHTML = ''
        this.$store.state.moveEnd.template.data.label.map((item, index) => {
          if (this.$store.state.moveEnd.presentIndex === index) {
            console.log(845132)
            item.img = '/template/images/style/1.jpg'
          }
        })
        console.log
        let data = {
          styleId: this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].styleId,
          plannInfoId: localStorage.getItem('id'),
          labelId: this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].mLabelId
        }
        deleteTemplates(data)
          .then(res => {
            console.log(res)
          })
        this.GLOBAL.config.html.htmlCode = ''
        this.$store.state.moveEnd.elmentFormOne = []

        console.log(this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img)
        console.log(this.$store.state.moveEnd.template.data.label)
        if (this.$store.state.moveEnd.moduleList.length !== 0) {
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = []
          console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields)
        }
        this.$store.state.moveEnd.html1.stylesActive = 1
        this.$store.state.moveEnd.hint = false
        this.$router.push({
          path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
        })
      }).catch(() => {

      })

    },
    // 这是上传背景图, 让它在样式属性里面 显示上传组件
    backgroundImg() {
      this.$store.state.moveEnd.html1.stylesActive = 3
      this.$store.state.moveEnd.html1.attribute = 9
      console.log(2)
    },
    // 这是删除模板页的
    deleteTemplate() {
      let name = this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].name;
      this.$confirm('确定删除落地页中的' + name + '标签模块？删除后落地页中将没有' + name + '模块的内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex])
        console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
        this.$store.state.moveEnd.template.data.label.splice(this.$store.state.moveEnd.presentIndex, 1)
        if (localStorage.getItem('idData') !== '1') {
          this.$store.state.moveEnd.moduleList.splice(this.$store.state.moveEnd.presentIndex, 1)
        }
        
        this.$store.state.moveEnd.typeSelect.map((item, index) => {
          
          // console.log(this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].order)
          // console.log('----------')
          // console.log(this.$store.state.moveEnd.typeSelect[index].order)
          if (this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].order === this.$store.state.moveEnd.typeSelect[index].order) {
            // console.log(item)
            // console.log('======')
            // console.log(this.$store.state.moveEnd.typeSelect[index - 1])
            this.$store.state.moveEnd.typeSelect[index - 1].active = 0
          }
        })

        console.log(this.$store.state.moveEnd.moduleList)
        console.log(this.$store.state.moveEnd.template.data.label)
        // this.$store.state.moveEnd.typeSelect[this.$store.state.moveEnd.presentIndex - 1].active = 0
        // this.$store.state.moveEnd.typeSelect.splice(this.$store.state.moveEnd.presentIndex - 1, 1)
        console.log(this.$store.state.moveEnd.typeSelect)
        this.$router.push({
          path: '/eoveEnd/compileTemplate/template/coversStyle'
        })
      }).catch(() => {

      });
    },
    // 选择户型里面的删除input
    deleteHouse(index) {
      this.$store.state.moveEnd.lingeringBtn[4].input.splice(index, 1)
    },
    // 选择户型里面的添加input
    addHouse(index) {
      console.log(index)
      if (this.lingeringBtn[4].input.length <= 9) {
        console.log(456)
        this.lingeringBtn[4].input.push('两房一厅')
        console.log(this.lingeringBtn[4].input)
      }
    },
    // 驻留按钮的切换
    clickElment(num) {
      this.$store.state.moveEnd.html1.stylesActive = 3
      this.$store.state.moveEnd.html1.attribute = ''
      this.$store.state.moveEnd.isPitch = ''
      console.log(123)
      console.log(this.$store.state.moveEnd.lingeringBtn)

      this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
        this.lingeringBtn[index].id = item.id
        this.lingeringBtn[index].value = item.value
        if (index === 4) {
           this.lingeringBtn[index].input = item.input
        }
        if (index === 2 || index === 3 || index === 4) {
          console.log(item.isVisual)
          item.isVisual = item.isVisual + ''
          item.isMust = item.isMust + ''
          this.lingeringBtn[index].isVisual = item.isVisual
          this.lingeringBtn[index].isMust = item.isMust
        }
        if (index === 3) {
          item.checkList = item.value.split(',')
          item.checkType = item.checkType + ''
          this.lingeringBtn[index].checkType = item.checkType
          this.lingeringBtn[index].checkList =  item.value.split(',')
        }
      })
      // this.lingeringBtn[index].input = this.lingeringBtn[index].value.
      console.log(this.lingeringBtn)
      if (num === 1) {
        this.$store.state.moveEnd.html1.isLingering = 1
      } else {
        this.$store.state.moveEnd.html1.isLingering = 2
      }
    },
    // 点击样式库的时候, 发起请求 获取到画布的数据
    getCanvasData(item) {
      localStorage.setItem('styleId', item.id)
      // console.log(this.$store.state.moveEnd.lingeringBtn)
      console.log(item.id)
      console.log(item)

      if (!this.$store.state.moveEnd.isBtn) {
        console.log('可以')
      }
      // console.log(item)
      console.log(localStorage.getItem('idData'))
      // this.moduleLists = this.$store.state.moveEnd.moduleListd
      // console.log(this.moduleLists)
      console.log(this.$store.state.moveEnd.moduleList)
      // // console.log( this.$store.state.moveEnd.fieldsData)
      // console.log(this.$store.state.moveEnd.fieldsData)

      // 清空图片的的数组
      this.activeFormList = []
      // 裁剪比例:
      //  1. 我利用返回的数据 循环每个数据判断是否有有图片图片,
      //  2. 在拿到图片的比例, 除以100, 然后更改裁剪图片的比例
      //  3. 如果是多张图片, 那么就再点击画布图片的时候, 判断 在进行判断
      // 把模板样式库id 加入指定的数组, 在第二步保存的时候 需要用

      if (item.type === 5) {
        this.$store.state.moveEnd.plugForm = true
        this.$store.state.moveEnd.styleCode = false
        this.$store.state.moveEnd.isLingeringBtn = false
        this.$store.state.moveEnd.exploitData = false
        console.log('表单')
        if (document.querySelectorAll('.codeChunk')[0].innerHTML !== '') {
          console.log(512)
          document.querySelectorAll('.codeChunk')[0].innerHTML = ''
        }
        console.log(this.$store.state.moveEnd.styleCode)
        return
      } if (item.type === 6) {
        console.log(4561231)
        console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
        this.$store.state.moveEnd.isLingeringBtn = true
        this.$store.state.moveEnd.plugForm = false
        this.$store.state.moveEnd.styleCode = false
        this.$store.state.moveEnd.exploitData = false
        document.querySelectorAll('.codeChunk')[0].innerHTML = ''
        this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
        this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
      } else {
        stylesData(item.id)
          .then(res => {
            if (res.code === 1) {
              this.imgRatio = []
              console.log('样式库数据')
              console.log(res)
              res.data.list.map((item, index) => {
                item.count = 0
                item.value = item.defaultValue
                // item.textColor = '#0bb2c5'
                if (item.type === 1 || item.type=== 5) {
                  item.defaultValue = this.GLOBAL.config.imgH + item.value
                  item.value = item.defaultValue
                }
                this.imgRatio = res.data.list
              })

              // 代码块
              this.GLOBAL.config.html.htmlCode = item.content
              // console.log(this.GLOBAL.config.html.htmlCode)


              // 判断以后是否是保存之后再次更改, 和在编辑的时候 进行的编辑判断
              console.log(this.$store.state.moveEnd.hint)
              if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
                console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId)
                if (this.$store.state.moveEnd.hint && this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0) {
                  this.$confirm('确定放弃当前编辑内容并覆盖样式', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    let data = {
                      styleId: this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].styleId,
                      plannInfoId: localStorage.getItem('id'),
                      labelId: this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].mLabelId
                    }
                    deleteTemplates(data)
                      .then(res => {
                        console.log(res)
                      })

                    this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id

                    // 以防用户 再次编辑 已经编辑过的s
                    if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex]) {

                      console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
                      console.log(45612398)

                      if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0 && this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId === item.id) {
                        console.log(531256896)
                        this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = res.data.list
                        this.$store.state.moveEnd.elmentFormOne = res.data.list
                        // this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
                        //   console.log(item)
                        //   }
                        // })
                      } else {
                        console.log(51265)
                        this.$store.state.moveEnd.elmentFormOne = res.data.list
                        this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = res.data.list
                      }
                    } else {

                      this.$store.state.moveEnd.elmentFormOne = res.data.list

                    }
                    this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                    this.$store.state.moveEnd.hint = false
                    this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url
                    this.$router.push({
                      path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                    })

                    this.$message({
                      type: 'success',
                      message: '已覆盖'
                    });
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    })
                  })
                } else {

                  // 以防用户 再次编辑 已经编辑过的s
                  if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex]) {

                    console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
                    console.log(45612398)

                    if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0 && this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId === item.id) {
                      console.log(531256896)
                      this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                      this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = res.data.list
                      this.$store.state.moveEnd.elmentFormOne = res.data.list
                      // this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.map((item, index) => {
                      //   console.log(item)
                      //   }
                      // })
                    } else {
                      console.log(51265)
                      this.$store.state.moveEnd.elmentFormOne = res.data.list
                      this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = res.data.list
                    }
                  } else {

                    this.$store.state.moveEnd.elmentFormOne = res.data.list

                  }
                  this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                  this.$store.state.moveEnd.hint = false
                  this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url;
                  this.$router.push({
                    path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                  })
                }
                // console.log(this.$store.state.moveEnd.moduleList)
                // console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields)
                // // 判断 数组是否为空 以便用户新增的时候 画布不是之前的数据
                // if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0 && this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId === item.id) {
                //   console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId === item.id)
                //   console.log(item.id)
                //   console.log(45645123)
                //   this.$store.state.moveEnd.elmentFormOne = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields
                // } else {
                //   // console.log(45645123)
                //   this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                //   this.$store.state.moveEnd.elmentFormOne = res.data.list
                //   console.log(this.$store.state.moveEnd.elmentFormOnes)
                //   console.log(res.data.list)
                // }
              } else {
                console.log(this.$store.state.moveEnd.moduleList)
                if (this.$store.state.moveEnd.moduleList.length !== 0) {
                  this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                  console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId)
                }
                console.log('没保存, 没数据')

                // 以防用户 再次编辑 已经编辑过的s
                if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex]) {

                  console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
                  console.log(45612398)

                  if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length !== 0 && this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId === item.id) {
                    if (this.$store.state.moveEnd.hint) {
                      this.$confirm('确定放弃当前编辑内容并覆盖样式', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                        this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                        this.$store.state.moveEnd.elmentFormOne = res.data.list
                        this.$store.state.moveEnd.hint = false
                        this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url
                        this.$router.push({
                          path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                        })
                        this.$message({
                          type: 'success',
                          message: '已覆盖!'
                        });
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消删除'
                        })
                      })
                    } else {
                      this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                      this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                      this.$store.state.moveEnd.elmentFormOne = res.data.list
                      this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url
                      this.$router.push({
                        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                      })
                    }
                  } else {
                    this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                    console.log(51265)
                    this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                    this.$store.state.moveEnd.elmentFormOne = res.data.list
                    this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url;
                    this.$router.push({
                      path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                    })
                  }
                } else {
                  this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId = item.id
                  this.$store.state.moveEnd.backgroundUrl = this.GLOBAL.config.imgH + item.bgColor
                  this.$store.state.moveEnd.elmentFormOne = res.data.list
                  this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].img = item.url;
                  this.$router.push({
                    path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
                  })
                }
              }

              console.log(this.$store.state.moveEnd.elmentFormOne)
              this.$store.state.moveEnd.canvasData = res.data.list
              // this.GLOBAL.config.html.htmlData = res.data.list
              this.$store.state.moveEnd.plugForm = false
              this.$store.state.moveEnd.isLingeringBtn = false
              this.$store.state.moveEnd.styleCode = true
              this.$store.state.moveEnd.exploitData = false
              // this.$router.push({
              //   path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
              // })
            }
            console.log(this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].templateStyleId)
          })
      }
      if (this.styleId !== '' && this.styleId !== item.id) {
        this.$store.state.moveEnd.fieldsData = []
        localStorage.setItem('headline', 0)
        localStorage.setItem('main', 0)
        localStorage.setItem('imgNum', 0)
      }
      console.log(this.$store.state.moveEnd.template.data.label)
      this.styleId = item.id
      // this.$store.state.moveEnd.hint = false


    },
    // 保存
    next(type, link) {
      console.log(this.$store.state.moveEnd.lingeringBtn)
      console.log(this.$store.state.moveEnd.moveuuid)
      console.log(this.$store.state.moveEnd.moduleList)
      console.log(this.$store.state.moveEnd.isBtn)


      let isTotal = localStorage.getItem('total')
      let isHeadline = localStorage.getItem('headline')
      let isMain = localStorage.getItem('main')



      // 第二步保存的参数获取
      if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
        // 判断是否已经保存 上传, 如果存储, 那么就更改参数数组对应的数据, 而不是全部更改, 如果没有上传, 那么就把数据加入参数数组中
        if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length === 0) {
          if (this.$store.state.moveEnd.isImgs) {
            console.log(this.$store.state.moveEnd.uploadImg)
            let styleFieldId = this.$store.state.moveEnd.elmentFormOne[1].styleFieldId
            let minImage = this.$store.state.moveEnd.elmentFormOne[1].minImage
            this.$store.state.moveEnd.elmentFormOne.splice(1, this.$store.state.moveEnd.elmentFormOne.length-1)
            console.log(this.$store.state.moveEnd.elmentFormOne)
            this.$store.state.moveEnd.uploadImg.map((item, index) => {
              this.$store.state.moveEnd.elmentFormOne.push({
                value: item.url,
                styleFieldId: styleFieldId,
                minImage: minImage,
                sowType:2,
                type: 5,
                order: index + 2,
                pixel: '550*700'
              })
            })
            console.log(this.$store.state.moveEnd.elmentFormOne)
            this.$store.state.moveEnd.isImgs = false
          }

          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.elmentFormOne
        } else {

          if (this.$store.state.moveEnd.isImgs) {
            console.log(this.$store.state.moveEnd.uploadImg)
            let styleFieldId = this.$store.state.moveEnd.elmentFormOne[1].styleFieldId
            let minImage = this.$store.state.moveEnd.elmentFormOne[1].minImage
            this.$store.state.moveEnd.elmentFormOne.splice(1, this.$store.state.moveEnd.elmentFormOne.length-1)
            console.log(this.$store.state.moveEnd.elmentFormOne)
            this.$store.state.moveEnd.uploadImg.map((item, index) => {
              this.$store.state.moveEnd.elmentFormOne.push({
                value: item.url,
                styleFieldId: styleFieldId,
                minImage: minImage,
                sowType:2,
                type: 5,
                order: index + 2,
                pixel: '550*700'
              })
            })
            console.log(this.$store.state.moveEnd.elmentFormOne)
            this.$store.state.moveEnd.isImgs = false
          }

            if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type === 3) {
              this.$store.state.moveEnd.lingeringBtn = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields
            } else if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type === 8) {
              this.$store.state.moveEnd.exploitInput = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields
            } else {
              this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.elmentFormOne
            }
        }
      } else {

        if (this.$store.state.moveEnd.isImgs) {
          console.log(this.$store.state.moveEnd.uploadImg)
          let styleFieldId = this.$store.state.moveEnd.elmentFormOne[1].styleFieldId
          let minImage = this.$store.state.moveEnd.elmentFormOne[1].minImage
          this.$store.state.moveEnd.elmentFormOne.splice(1, this.$store.state.moveEnd.elmentFormOne.length-1)
          console.log(this.$store.state.moveEnd.elmentFormOne)
          this.$store.state.moveEnd.uploadImg.map((item, index) => {
            this.$store.state.moveEnd.elmentFormOne.push({
              value: item.url,
              styleFieldId: styleFieldId,
              minImage: minImage,
              sowType:2,
              type: 5,
              order: index + 2,
              pixel: '550*700'
            })
          })
          console.log(this.$store.state.moveEnd.elmentFormOne)
          this.$store.state.moveEnd.isImgs = false
        }

        if (this.$store.state.moveEnd.plugForm) {
          this.$store.state.moveEnd.fromMenuData.map((item, index) => {
            item.type = 2
            this.fromData.push(item)
          })
          this.canvasData = this.fromData
          this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].type = 2
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type = 2
        } else if (this.$store.state.moveEnd.isBtn) {
          this.$store.state.moveEnd.lingeringBtn.map((item, index) => {
            item.type = 6
            console.log(item.checkType)
            if (item.checkType === 0) {
              console.log(item.value)
              item.value = item.checkList.join(',')
              console.log(item.value)
            } else if (index === 4) {
              item.value = item.input.toString()
            }
            if (index === 2 || index === 3 || index === 4) {
              console.log(item.isVisual)
              item.isVisual = parseInt(item.isVisual )
              item.isMust = parseInt(item.isMust)
            }
            if (index === 3) {
              item.checkType = parseInt(item.checkType)
            }
          })
          this.canvasData = this.$store.state.moveEnd.lingeringBtn
        } else if (this.$store.state.moveEnd.exploitData) {
          this.canvasData =  this.$store.state.moveEnd.exploitInput
        } else{
          this.canvasData = this.$store.state.moveEnd.elmentFormOne
        }
        // console.log(this.canvasData)
        if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.canvasData
        } else {
          console.log(123465)
          console.log(this.canvasData)
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
                  fields: [],
                }
              }
            }
          })
        }
      }
      this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].color = this.$store.state.moveEnd.backgroundUrl

      console.log(this.$store.state.moveEnd.moduleList)
      // return
      let list = []
      this.$store.state.moveEnd.moduleList.map((item, index) => {
        if (item.labelName === '开发商信息') {
          console.log(item.fields.id)
          console.log(74856123)
          item.fields = this.$store.state.moveEnd.exploitInput
        }
        list.push(item)
      })

      this.lingeringBtn.map((item, index) => {
        if (index === 2 || index === 3 || index === 4) {
          console.log(item.isVisual)
          item.isVisual = item.isVisual + ''
          item.isMust = item.isMust + ''
        }
        if (index === 3) {
          item.checkType = item.checkType + ''
        }
      })

      this.$store.state.moveEnd.moduleList.map((item, index) => {
        if (item.labelName === '驻留插件') {
          console.log(item.fields.id)
          // item.fields.value = this.$store.state.moveEnd.exploitInput
          this.lingeringBtn[3].value = this.lingeringBtn[3].checkList.join(',')
          this.lingeringBtn[4].value =this.lingeringBtn[4].input.join(',')
        }
      })
      this.$store.state.moveEnd.moduleList[12].fields = this.lingeringBtn
      twoSave({
        uuid: localStorage.getItem('id'),
        moduleList: list
      })
        .then(res => {
          console.log(res)
          if (res.code === -1) {
            this.lackid = true
            this.$message({
              showClose: true,
              message: res.message,
              type: 'warning'
            })
          }
          let listId = []
          res.data.labels.map((item, index) => {
            listId.push(item)
            // console.log(item)
            // this.$store.state.moveEnd.moduleList[index].htmlId = item.htmlId
            // this.$store.state.moveEnd.moduleList[index].mLabelId = item.id
            // // console.log(item.fields)
            // if (item.fields === null) {
            //   item.fields = []
            // }
            // let _index = index
            // item.fields.map((item, index) => {
            //   this.$store.state.moveEnd.moduleList[_index].fields[index].id = item.id
            // })
          })
          res.data.plugins.map((item, index) => {
            listId.push(item)
            // console.log(item)
            // this.$store.state.moveEnd.moduleList[index].htmlId = item.htmlId
            // this.$store.state.moveEnd.moduleList[index].mLabelId = item.id
            // // console.log(item.fields)
            // if (item.fields === null) {
            //   item.fields = []
            // }
            // let _index = index
            // item.fields.map((item, index) => {
            //   this.$store.state.moveEnd.moduleList[_index].fields[index].id = item.id
            // })
          })

          listId.map((item, index) => {
            console.log(item)
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
          if (res.code === 1) {
            console.log(523568)
            this.save = 'true'
            if (type === 1) {
              window.open(link + '/admin/#/eoveEnd/Preview/' + this.$store.state.moveEnd.moveuuid);
              // return;
            }

            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
            // res.data.labels.map((item, index) => {
            //   // console.log(item)
            //   list[index].htmlId = item.htmlId
            //   list[index].mLabelId = item.id
            //   // console.log(item.fields)
            //   if (item.fields === null) {
            //     item.fields = []
            //   }
            //   let _index = index
            //   item.fields.map((item, index) => {
            //     list[_index].fields[index].id = item.id
            //   })
            // })

            // 用来判断是否添加成功 以便不跳转页面用户再次更不跳转页面用户再次更改
            localStorage.setItem('idData', '1')
            console.log(this.$store.state.moveEnd.moduleList)
            this.$store.state.moveEnd.moduleList = list
            console.log(this.$store.state.moveEnd.moduleList)
          }
        })
    },
    // 重置
    reset() {
      let oldId = localStorage.getItem('styleId')
      let newId = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId

      let id = oldId === ''? newId: oldId
      stylesData(id)
        .then(res => {
          console.log(res.data.list)
          console.log(74564)
          res.data.list.map((item, index) => {
            item.count = 0
            item.value = item.defaultValue
            // item.textColor = '#0bb2c5'
            if (item.type === 1 || item.type=== 5) {
              item.defaultValue = this.GLOBAL.config.imgH + item.value
              item.value = item.defaultValue
            }
            this.imgRatio = res.data.list
          })
          this.$store.state.moveEnd.elmentFormOne = res.data.list
          console.log(this.GLOBAL.config.html.htmlCode)
          console.log(45)
          this.GLOBAL.config.html.htmlCode = this.GLOBAL.config.html.htmlCode
          this.$router.push({
            path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
          })
        })
    },
    //预览
    previewLandingPage(link) {


      this.$confirm('是否保存当前内容？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.next(1, link)
      }).catch(() => {

      })
    },
  },
  beforeRouteLeave(to, from, next) {
    // document.querySelectorAll('.codeChunk')[0].innerHTML = ''
    console.log(this.$store.state.moveEnd.moduleList)
    console.log(this.$store.state.moveEnd.elmentFormOne)
    console.log(to)
    localStorage.setItem('edit', 'false')
    // console.log('触发')
    this.$store.state.moveEnd.template.data = {}
    this.$store.state.moveEnd.moduleList = []
    this.$store.state.moveEnd.moveuuid = ''
    this.$store.state.moveEnd.elmentFormOne = []
    this.$store.state.moveEnd.uploadImg = []
    this.$store.state.moveEnd.hint = false
    this.$store.state.moveEnd.backgroundUrl = ''
    this.$store.state.moveEnd.exploitData = false
    this.$store.state.moveEnd.isBtn = false
    localStorage.setItem('styleId', '')
    this.$store.state.moveEnd.userDefinedForm.exploitInput = '地址:广州市天河区林和西路161号中泰国际广场B座28楼\n地址:广州市天河区林和西路161号中泰国际广场B座28楼\n粤ICP备13083997号-2'
    localStorage.setItem('id', '')

    this.$store.state.moveEnd.html1.stylesActive = 1
    this.$store.state.moveEnd.html1.property = 1
    this.$store.state.moveEnd.html1.primary = 1
    this.$store.state.moveEnd.html1.attribute = 1
    this.$store.state.moveEnd.html1.isLingering = 3
    this.$store.state.moveEnd.template.num = 0
    localStorage.setItem('idData', '0')
    this.$store.state.moveEnd.presentIndex = 0
    console.log(from)
    console.log(localStorage.getItem('idData'))
    console.log(this.$store.state.moveEnd.moduleList)
    console.log(this.$store.state.moveEnd.elmentFormOne)
    next()
  },
  computed: {
    // 让属性文本框背景色实时更新
    color() {
      return 'background:' + this.$store.state.moveEnd.userDefinedForm.colourInput
    },
    // 表单背景色实时更新
    btnColor() {
      return 'background:' + this.$store.state.moveEnd.fromMenuData[5].btnColor
    },
    // 表单字体实时更新
    textColor() {
      return 'background:' + this.$store.state.moveEnd.fromMenuData[5].txtColor
    },
    // 表单字体的实时更新
    Color() {
      return 'color:' + this.$store.state.moveEnd.fromMenuData[5].txtColor
    },
    dialbColor() {
      return 'background:' + this.$store.state.moveEnd.fromMenuData[6].btnColor
    },
    dialtColor() {
      return 'background:' + this.$store.state.moveEnd.fromMenuData[6].txtColor
    },
    dialColor() {
      return 'color:' + this.$store.state.moveEnd.fromMenuData[6].txtColor
    },
    // 上传图片 或是 背景设置背景颜色事实更新
    imgbColor() {
      return 'background:' + this.backgroundimg
    },
    houseIsinput() {

    }
  },
  watch: {
    // 让属性文本框颜色的数值事实更新
    '$store.state.moveEnd.userDefinedForm.colourInput'(val) {
      // this.$store.getters.txtColor()
      this.userDefinedForm.colourInput = val.replace('#', '')
      this.$store.state.moveEnd.userDefinedForm.colourInput = val
      this.$store.state.moveEnd.elmentFormOne[localStorage.getItem('index')].textColor = val
      console.log(this.$store.state.moveEnd.elmentFormOne)
      console.log(475)
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })
    },
    // 监听vuex 里面的数据, 让它在更改的时候就跳转页面, 然后在那个页面再跳转回来本来的页面, 达到时实更新的效果
    '$store.state.moveEnd.userDefinedForm.textarea'(val) {
      // console.log(val)
      this.$store.state.moveEnd.elmentFormOne[localStorage.getItem('index')].value = val
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })
    },
    // 中间画布清除, 以便第二步的保存
    '$store.state.moveEnd.template.num'(val) {
      console.log(79631)
      console.log(document.querySelectorAll('.codeChunk')[0].innerHTML)
      document.querySelectorAll('.codeChunk')[0].innerHTML = ''
      console.log( document.querySelectorAll('.codeChunk')[0].innerHTML)
    },
    imgUrl(val) {
      console.log('跳')
      this.upimg = '1'
      // if (localStorage.getItem('type') === '4') {
      //   this.$store.state.moveEnd.elmentFormOne.splice(1, 0, this.$store.state.moveEnd.elmentFormOne[1])
      //   this.$store.state.moveEnd.elmentFormOne[1].value = val
      // }
      this.$store.state.moveEnd.elmentFormOne[localStorage.getItem('index')].value = val
      // this.$store.state.moveEnd.userDefinedForm.imgUrl = val
      this.$router.push({
        path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      })
    },
    //  下面三个是背景图片和背景色
    '$store.state.moveEnd.backgroundUrl'(val) {
      console.log(val)
      console.log(23683)
      if (val) {
        if (val.charAt(0) === '#') {
          this.$store.state.moveEnd.backgroundimg = ''
        }
      }
      console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex])
    },
    backgroundimg(val) {
      this.imgtColourInput = val.replace('#', '')
      // this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].color = val
    },
    // backgroundurl(val) {
    //   // this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].color = val
    // }
    '$store.state.moveEnd.exploitData'(val) {
      if (val) {
        this.$store.state.moveEnd.plugForm = false
        this.$store.state.moveEnd.styleCode = false
        this.$store.state.moveEnd.isLingeringBtn = false
        if (document.querySelectorAll('.codeChunk')[0].innerHTML !== '') {
          console.log(512)
          document.querySelectorAll('.codeChunk')[0].innerHTML = ''
        }
      }
    },
    '$store.state.moveEnd.isLingering'() {
      this.$store.state.moveEnd.lingeringBtn = this.lingeringBtn
    }
  },
  // this.$store.state.moveEnd.html1
  components: {
    VueCropper,
  }
}
