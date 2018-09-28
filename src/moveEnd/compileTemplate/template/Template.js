import { templates, compileDate} from '@/apis/index.js';
import draggable from 'vuedraggable';
import Sortable from 'sortablejs';
export default {
  data () {
    return {
      data: [],
      myArray: [],
      uuid: '',
      // template: {}, // 右边模板请求返回的数据, 里面有两个对象
      // presentIndex: 0, // 模板边框颜色的控制变量
      moduleList: [],
      canvasData: [],
      dialogFormVisible: false, // 选择插入类型模态框的显示与隐藏
      typeSelect: [
      ],
      template: [],
      fromData: [],
      oldIndex:0,//拖动前排序
      newIndex:0,
    }
  },
  mounted() {
    console.log(this.$store.state.moveEnd.moduleList)
    console.log(this.$store.state.moveEnd.template.data.label)
    this.$store.state.moveEnd.presentIndex = 0
    localStorage.setItem('saveNum', '1')
    this.getTemplate()
    // console.log(123)
    console.log( this.$store.state.moveEnd.majorKeyId)
  // this,uuid = this.$store.state.moveEnd.moveuuid
  },
  methods: {
    datadragEnd(evt) {
      console.log(this.$store.state.moveEnd.template.num)
      console.log(this.$store.state.moveEnd.template.data.label)
      console.log(this.$store.state.moveEnd.moduleList)
      if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length === 0 && this.$store.state.moveEnd.elmentFormOne.length !== 0) {
        this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.elmentFormOne
      }
      if (this.$store.state.moveEnd.moduleList.length > 1) {
        console.log(this.$store.state.moveEnd.moduleList)
        console.log(this.$store.state.moveEnd.template.data.label)
        // 拿到数组的拖动前的数据 和 拖动后的 更改
        let oldData = this.$store.state.moveEnd.moduleList[evt.oldIndex]
        let newData = this.$store.state.moveEnd.moduleList[evt.newIndex]
        console.log(oldData)
        console.log(newData)
        this.$store.state.moveEnd.moduleList[evt.oldIndex] = newData
        this.$store.state.moveEnd.moduleList[evt.newIndex] = oldData

        let oldOrder = this.$store.state.moveEnd.moduleList[evt.oldIndex].order
        let newOrder = this.$store.state.moveEnd.moduleList[evt.newIndex].order
        console.log(oldOrder)
        console.log(newOrder)
        this.$store.state.moveEnd.moduleList[evt.oldIndex].order = newOrder
        this.$store.state.moveEnd.moduleList[evt.newIndex].order = oldOrder

        console.log(513268)
        console.log(evt.newIndex + 1)
        console.log(evt.oldIndex )
        console.log(this.$store.state.moveEnd.moduleList)
        console.log(this.$store.state.moveEnd.template.data.label)
        this.$store.state.moveEnd.presentIndex = evt.newIndex
        this.$store.state.moveEnd.template.num = evt.newIndex
        
      this.$store.state.moveEnd.stylesCode.map((item, index) => {
        if (item.id === this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].templateStyleId) {
          this.GLOBAL.config.html.htmlCode = item.content
          this.$store.state.moveEnd.elmentFormOne = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields
          console.log(this.$store.state.moveEnd.elmentFormOne)
          console.log(this.GLOBAL.config.html.htmlCode)
          console.log('----------------------------')
          this.$router.push({
            path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
          })
        }
      })
      }

     /* console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)*/
      console.log(this.$store.state.moveEnd.presentIndex)
      console.log(this.draggableTags)
    },
    getdata(evt) {
      console.log(this.oldIndex)
      console.log(this.newIndex)
      console.log(evt)

      if(this.oldIndex==0 || this.oldIndex>11 || evt.draggedContext.futureIndex==0 || evt.draggedContext.futureIndex>11){
        return  false
      }

    },
    startDraggable(evt){
      console.log(evt)
       console.log('拖动前的索引 :' + evt.oldIndex)
     console.log('拖动后的索引 :' + evt.newIndex)
      this.oldIndex =evt.oldIndex;
      this.newIndex =evt.newIndex;
      if(evt.oldIndex==0 || evt.oldIndex>11 || evt.newIndex==0 || evt.newIndex>11){
        this.$message({
          message: '封面、驻留按钮、开发商信息模块不可拖动！',
          type: 'warning'
        });
      }
    },
    //点击模块
    clickLabile(item){
      if(item.active==1 || item.type=='2'?true:false ){
        this.$message({
          message: '该模块已经添加！',
          type: 'warning'
        });
      }
    },
    // 获取模板的数据
    getTemplate() {
      templates({
        templateId: this.$store.state.moveEnd.majorKeyId.uuid
      })
        .then(res => {
          this.$store.state.moveEnd.typeSelect = []
          console.log(res)
          console.log(this.$store.state.moveEnd)
          console.log(this.$store.state.moveEnd.template.data.label)
          res.data.label.map((item, index) => {
            if (this.$store.state.moveEnd.template.data.label) {
              for(var i=0;this.$store.state.moveEnd.template.data.label.length>i;i++){
                console.log(12);
                  if(this.$store.state.moveEnd.template.data.label[i].labelId==item.id){//编辑
                        console.log(item);
                    item.active=1;
                    this.template.push(item)
                  }
              }
            }else{
              console.log('新增')
              //新增
              item.active=1;
            }
            this.template.push(item);
            this.$store.state.moveEnd.typeSelect.push(item);
          })
          this.$store.state.moveEnd.typeSelect.splice(0,1)
          console.log(this.$store.state.moveEnd.typeSelect)
          if (localStorage.getItem('refresh') === '1') {
            this.$router.push('/eoveEnd/essential/0/' +localStorage.getItem('id')+'/'+1+'/1')
          } else {
            if (localStorage.getItem('idData') !== '1') {
              this.$store.state.moveEnd.template.data = res.data
              res.data.plugins.map((item, index) => {
                this.$store.state.moveEnd.template.data.label.push(item)
              })
              console.log(this.$store.state.moveEnd.template.data)
            } else if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.template.data.label.length === 0) {
              res.data.label.map((item, index) => {
                this.$store.state.moveEnd.template.data.label.push(item)
              })
              res.data.plugins.map((item, index) => {
                this.$store.state.moveEnd.template.data.label.push(item)
              })
              console.log(this.$store.state.moveEnd.template.data)
            }
          }

          res.data.plugins.map((item, index) => {
            if(item.order!=12){
              item.active=1;
            }
            this.$store.state.moveEnd.typeSelect.push(item)
            this.template.push(item)
          })
          console.log(this.$store.state.moveEnd.typeSelect)
          console.log(this.$store.state.moveEnd.template.data)
        })
    },
    // 改变当前模板 里面的边框颜色
    present(index, item) {
      console.log(this.$store.state.moveEnd.backgroundUrl)
      this.GLOBAL.config.html.htmlCode = ''
      this.$store.state.moveEnd.backgroundimg = ''
      this.$store.state.moveEnd.html1.stylesActive = 1
      this.$store.state.moveEnd.html1.attribute = 1
      this.$store.state.moveEnd.html1.primary = 1;
      this.$store.state.moveEnd.html1.isLingering = 3
      this.$store.state.moveEnd.isBtn = false
      console.log(this.$store.state.moveEnd.isBtn)
      console.log(this.$store.state.moveEnd.moduleList)
      console.log(this.$store.state.moveEnd.elmentFormOne)
      console.log(index)
      console.log(item)
      console.log(this.$store.state.moveEnd.template.data.label[index])
      // console.log(this.$store.state.moveEnd.moduleList)
      // console.log(this.$store.state.moveEnd.fromMenuData)
      // 把当前索引放入vuex  以便删除模板时删除
      this.$store.state.moveEnd.template.num = index

      if (item.name === '驻留插件') {
        this.$store.state.moveEnd.isLingering = true
      }

      // 第二步保存的参数获取
      if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
        // 判断是否已经保存 上传, 如果存储, 那么就更改参数数组对应的数据, 而不是全部更改, 如果没有上传, 那么就把数据加入参数数组中
        console.log(1223456)
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
          console.log(789)
          console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields)
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.elmentFormOne
          
        } else {

          console.log(413259784523)
          if (localStorage.getItem('type') === '4') {
            this.$store.state.moveEnd.elmentFormOne.map((item, index) => {
              console.log(item)
            })
            this.$store.state.moveEnd.uploadImg.map((item, index) => {
              console.log(item)
            })

          }
          console.log(this.$store.state.moveEnd.moduleList)
          // this.$store.state.moveEnd.moduleList[index].fields = this.$store.state.moveEnd.elmentFormOne
          // if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type === 3) {
          //   console.log(453645)
          //   console.log(this.$store.state.moveEnd.lingeringBtn)
          //   this.$store.state.moveEnd.lingeringBtn.map((item, index) => {
          //     if (index === 4) {
          //       item.value = item.input.join(',')
          //       console.log(item.checkType)
          //     }
          //   })
          //   this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields  = this.$store.state.moveEnd.lingeringBtn
          // } 
          
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
          
            if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type === 8) {
            this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.exploitInput
          } else {
            this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.elmentFormOne
          }
          this.$store.state.moveEnd.hint = true
          }
      } else{
        console.log('bu')
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
        console.log(this.$store.state.moveEnd.plugForm)
        if (this.$store.state.moveEnd.plugForm) {
          let fromData = []
          this.$store.state.moveEnd.fromMenuData.map((item, index) => {
            item.type = 2
            this.fromData.push(item)
          })
          this.canvasData = this.fromData
          this.fromData = []
          this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].type = 2
          this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].type = 2
        } else if (this.$store.state.moveEnd.isBtn) {
          console.log(43212)
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
          // this.$store.state.moveEnd.moduleList.push(this.$store.state.moveEnd.template.data.plugins[this.$store.state.moveEnd.presentIndex])
          // this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields = this.$store.state.moveEnd.lingeringBtn
          console.log(this.$store.state.moveEnd.moduleList)
          this.$store.state.moveEnd.isBtn = false
          this.$store.state.moveEnd.isLingeringBtn = false
          // return
        } else if (this.$store.state.moveEnd.exploitData) {
          this.canvasData = this.$store.state.moveEnd.exploitInput 
        } else {
          this.canvasData = this.$store.state.moveEnd.elmentFormOne
          this.$store.state.moveEnd.elmentFormOne = []
          console.log(this.$store.state.moveEnd.elmentFormOne)
          console.log(this.canvasData)
          console.log(453)
        }

        if (localStorage.getItem('idData') === '1' && this.$store.state.moveEnd.moduleList.length !== 0) {
          console.log(this.$store.state.moveEnd.moduleList[index].fields)
          this.$store.state.moveEnd.moduleList[index].fields = this.canvasData
        } else {
          this.$store.state.moveEnd.template.data.label.map((item, index) => {

            if (item.id === this.$store.state.moveEnd.template.data.label[this.$store.state.moveEnd.presentIndex].id) {
              this.$store.state.moveEnd.hint = true
              console.log(12356532)
              this.$store.state.moveEnd.moduleList[index] = {
                  color: this.$store.state.moveEnd.backgroundUrl,
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
                  color: '',
                  labelName: item.name,
                  templateLabelId: item.id,
                  templateStyleId: item.templateStyleId,
                  htmlId: item.htmlId,
                  mLabelId: item.mLabelId,
                  type: item.type,
                  order: index + 1,
                  fields:[],
                }
              } else {
                console.log(12312)
                console.log( this.$store.state.moveEnd.elmentFormOne)
                this.$store.state.moveEnd.elmentFormOne = this.$store.state.moveEnd.moduleList[index].fields
              }
            // console.log(this.$store.state.moveEnd.moduleList[index])
            }
          })
        }
      }

      if (item.name === '驻留插件') {
        this.$store.state.moveEnd.html1.stylesActive = 2
        this.$store.state.moveEnd.html1.primary = 5
        this.$store.state.moveEnd.isBtn = true


        this.$store.state.moveEnd.lingeringBtn.map((item, index) => {
          item.type = 6
          item.isVisual = ''+item.isVisual
          item.isMust = ''+item.isMust
          item.checkType = '' + item.checkType
          console.log(item.checkType)
        })
        if (this.$store.state.moveEnd.moduleList[index].labelName === '驻留插件' && this.$store.state.moveEnd.moduleList[index].fields.length !== 0) {
          this.$store.state.moveEnd.lingeringBtn = this.$store.state.moveEnd.moduleList[index].fields 
          

          
          this.$store.state.moveEnd.lingeringBtn.map((item, index) => {
            if (index === 2 || index === 3 || index === 4) {
              console.log(item.isVisual)
              item.isVisual = item.isVisual + ''
              item.isMust = item.isMust + ''
            }
            if (index === 3) {
              item.checkType = item.checkType + ''
            }
          })


          let list = this.$store.state.moveEnd.lingeringBtn[4].value.split(',')
          console.log(list)
          this.$store.state.moveEnd.lingeringBtn[4].input = []
          list.map((item, index) => {
            this.$store.state.moveEnd.lingeringBtn[4].input.push(item)
          })
          console.log(this.$store.state.moveEnd.lingeringBtn)
        }
      }
      if (item.name === '开发商信息') {
        this.$store.state.moveEnd.html1.attribute = 3 
        this.$store.state.moveEnd.html1.stylesActive = 3
        this.$store.state.moveEnd.exploitData = true
        if (this.$store.state.moveEnd.moduleList[index].fields.length !== 0) {
          this.$store.state.moveEnd.exploitInput = this.$store.state.moveEnd.moduleList[index].fields
        }
        console.log(this.$store.state.moveEnd.moduleList[index])
      } else {
        this.$store.state.moveEnd.exploitData = false
      }

      console.log(this.$store.state.moveEnd.backgroundUrl)
      this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].color = this.$store.state.moveEnd.backgroundUrl
      // 新增了之后, 模板的回选
      console.log(this.$store.state.moveEnd.stylesCode)
      console.log(this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.template.num].templateStyleId)

      this.$store.state.moveEnd.stylesCode.map((item, index) => {
        if (item.id === this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.template.num].templateStyleId) {
          this.GLOBAL.config.html.htmlCode = item.content
          this.$store.state.moveEnd.elmentFormOne = this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.template.num].fields
          this.$router.push({
            path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
          })
        }
      })

      this.$store.state.moveEnd.backgroundUrl = this.$store.state.moveEnd.moduleList[index].color
      console.log(this.$store.state.moveEnd.backgroundUrl)

      this.$store.state.moveEnd.uploadImg = []
      localStorage.setItem('type','')
      this.$store.state.moveEnd.canvasNum = index
      // 更改模板的边框
      this.$store.state.moveEnd.presentIndex = index
      // 字体颜色框
      this.$store.state.moveEnd.userDefinedForm.colourInput = ''
      this.$store.state.moveEnd.plugForm= false,
      this.$store.state.moveEnd.styleCode = true
      // this.$store.state.moveEnd.fromMenuData = [
      //   { value: '这里可以填写优惠信息或者促销slogen' },
      //   { value: '输入手机号' },
      //   {
      //     value: '输入姓名',
      //     // 是否显示 和 是否必选
      //     isVisual: '1',
      //     isMust: '1',
      //   },
      //   {
      //     value: '选择时间',
      //     isVisual: '1', // 预约输入框里面的是否显示与隐藏 显示为1 隐藏为2
      //     isMust: '1', // 预约输入框里面的是否必填
      //     checkType: '1', // 预约输入框里面的是否多选
      //     checkList: [], // 预约时间了吗的存储复选框 数据 数组
      //   },
      //   {
      //     value: '选择户型',
      //     isVisual: '1', // 户型是否显示
      //     isMust: '1', // 户型的是否必填
      //     checkType: '1', // 户型的是否多选
      //     // 下面是户型的input 框
      //     houseInput: [1,2,3,4,5,6,7,8,9],
      //     input1: '',
      //     input2: '',
      //     input3: '',
      //     input4: '',
      //     input5: '',
      //     input6: '',
      //     input7: '',
      //     input8: '',
      //     input9: '',
      //     // 下面是户型的input 框 是否显示
      //     isinput1: true,
      //     isinput2: true,
      //     isinput3: true,
      //     isinput4: true,
      //     isinput5: true,
      //     isinput6: true,
      //     isinput7: true,
      //     isinput8: true,
      //     isinput9: true,
      //   },
      //   {
      //     value: '提交',
      //     bColourInput: '8ec870', // 立即预约按钮的颜色 输入框的字体
      //     btnColor: '#8ec870', // 立即预约按钮的颜色 吸取笔
      //     // 别搞混乱, 一个是背景颜色  一个是字体颜色
      //     tColourInput: 'fff',
      //     txtColor: '#fff',
      //   },
      //   {
      //     value: '拨打电话',
      //     tel: '', // 拨打电话的电话号码
      //     bColourInput: 'f08522', // 拨打电话按钮的颜色 输入框的字体
      //     btnColor: '#f08522', // 拨打电话按钮的颜色 吸取笔
      //     tColourInput: 'fff', // 拨打电话字体的颜色 输入框的字体
      //     txtColor: '#fff', // 拨打电话字体的颜色 吸取笔
      //   },
      // ]

      // this.$router.push({
      //   path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      // })
      console.log(this.$store.state.moveEnd.template.data.label)
      console.log(this.$store.state.moveEnd.moduleList)
      console.log(this.$store.state.moveEnd.userDefinedForm.colourInput)
      console.log(this.$store.state.moveEnd.elmentFormOne)
    },
    //json 对象排序
    sortId(a,b){
      return a.order-b.order
    },
    // 模板确定
    templateConfirm() {
      let arr = []
      this.template.sort(this.sortId)
      this.template.map((item, index) => {
        if (item.active === 0) {
          this.$store.state.moveEnd.template.data.label.push(item)
          this.template[index].active = 1
        }
       /* this.$store.state.moveEnd.template.data.label.map((item, index) => {
          if (_item.name === this.$store.state.moveEnd.template.data.label[index].name) {
            arr.push(item)
          }
        })*/
      })
      console.log(arr)
      // this.$store.state.moveEnd.template.data.label = [] = arr
      // console.log(arr)
      console.log(this.$store.state.moveEnd.template.data.label)
      this.$store.state.moveEnd.template.data.label.sort(this.sortId)
      this.dialogFormVisible = false
    }
  },
  watch: {
    // 因为早拖动的时候, 出现中间的画布不能清空, 所以把在这再一次的监听模板的当前索引, 让它一更改, 就清空
    '$store.state.moveEnd.presentIndex'(val) {
      console.log(4513)
      console.log( document.querySelectorAll('.codeChunk')[0].innerHTML)
      document.querySelectorAll('.codeChunk')[0].innerHTML = ''
      console.log( document.querySelectorAll('.codeChunk')[0].innerHTML)
    },
  },
  components: {
    draggable,
    Sortable
  }
}
