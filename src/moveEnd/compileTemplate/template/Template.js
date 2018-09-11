import { templates } from '@/apis/index.js';
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
    }
  },
  mounted() {
    this.$store.state.moveEnd.presentIndex =0
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

      console.log(this.$store.state.moveEnd.moduleList.length)
      if (this.$store.state.moveEnd.moduleList.length > 1) {
        console.log(this.$store.state.moveEnd.moduleList)
        // 拿到数组的拖动前的数据 和 拖动后的 更改
        let oldData = this.$store.state.moveEnd.moduleList[evt.oldIndex]
        let newData = this.$store.state.moveEnd.moduleList[evt.newIndex]
        this.$store.state.moveEnd.moduleList[evt.oldIndex] = newData
        this.$store.state.moveEnd.moduleList[evt.newIndex] = oldData
        console.log(this.$store.state.moveEnd.moduleList)
      }

      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      this.$store.state.moveEnd.presentIndex = evt.newIndex
      console.log(this.draggableTags)
    },
    getdata(evt) {
      console.log(this.$store.state.moveEnd.template.data.label)
      // console.log(ext)
      console.log(evt.draggedContext)
      //console.log(evt.draggedContext.element.id)
    },

    // 获取模板的数据
    getTemplate() {
      templates({
        templateId: this.$store.state.moveEnd.majorKeyId.uuid
      })
        .then(res => {
          console.log(res)
          console.log(this.$store.state.moveEnd)
          this.$store.state.moveEnd.template.data = res.data
        })
    },
    // 改变当前模板 里面的边框颜色
    present(index, item) {
      // this.$store.state.moveEnd.moduleList = this.moduleList
      // console.log(this.$store.state.moveEnd.isData)
      console.log(this.$store.state.moveEnd.moduleList)
      // console.log(this.$store.state.moveEnd.canvasData)
      // console.log(item)
      console.log(index)
      console.log(this.$store.state.moveEnd.template.data.label[index])
      console.log(this.$store.state.moveEnd.moduleList)
      // 把当前索引放入vuex  以便删除模板时删除
      this.$store.state.moveEnd.template.num = index


      // 第二步保存的参数获取
      if (this.$store.state.moveEnd.isData === 1) {
        // 判断是否已经保存 上传, 如果存储, 那么就更改参数数组对应的数据, 而不是全部更改, 如果没有上传, 那么就把数据加入参数数组中
        if (this.$store.state.moveEnd.moduleList[this.$store.state.moveEnd.presentIndex].fields.length === 0) {
          this.$store.state.moveEnd.canvasData.map((item, index) => {
            item.count = 1
            item.sowType = 1
            // console.log(item)
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
            item.count = 1
            item.sowType = 1
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
            // console.log(this.$store.state.moveEnd.moduleList[index])
            }
            // else {
            //   console.log(index)
            //   let _index = index
            //   this.$store.state.moveEnd.template.data.label.map((item,index) => {
            //     // console.log(index)
            //     if (this.$store.state.moveEnd.moduleListNum[index] === _index) {
            //       console.log(this.$store.state.moveEnd.moduleListNum[index])
            //       console.log('ijioas ')
            //     } else {
            //       console.log(item)
            //       this.$store.state.moveEnd.moduleList[index] = {
            //         labelName: item.name,
            //         templateLabelId: item.templateId,
            //         templateStyleId: item.templateStyleId,
            //         htmlId: item.htmlId,
            //         mLabelId: item.mLabelId,
            //         type: item.type,
            //         order: index + 1,
            //         fields: [],
            //       }
            //     }
            //   })
            // }
          })
        }
      }

      this.$store.state.moveEnd.html1.stylesActive = 1
      this.$store.state.moveEnd.html1.attribute = 1
      this.$store.state.moveEnd.canvasNum = index
      // 更改模板的边框
      this.$store.state.moveEnd.presentIndex = index
      // this.$router.push({
      //   path: '/eoveEnd/compileTemplate/template/coversStyle/yang'
      // })
      console.log(this.$store.state.moveEnd.template.data.label)
      console.log(this.$store.state.moveEnd.moduleList)

    }
  },
  watch: {
    // 因为早拖动的时候, 出现中间的画布不能清空, 所以把在这再一次的监听模板的当前索引, 让它一更改, 就清空
    '$store.state.moveEnd.presentIndex'(val) {
      document.querySelectorAll('.codeChunk')[0].innerHTML = ''
    },
  },
  components: {
    draggable,
    Sortable
  }
}
