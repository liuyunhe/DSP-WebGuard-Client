import {organization, project, throwRelease, channel, essentialNext, compileDate} from '@/apis/index.js'
  export default {
    data() {
      return {
        isBtn:true,//是否可以点击按钮
        templateId:'',
        forbidden: false,
         hint: false, // 控制提示的显示和隐藏
         labelPosition: 'left', // 这是控制文字的位置
        //  基本信息的表单数据
        formLabelAlign: {
          uuid: '',
          name: '',
          construction: '',
          constructionId:'',
          project: '',
          projectId: '',
          phone1: '',
          phone2: '',
          webpageName: '',
          projectCode: '',
          deliveryManagements: [],
          deliveryManagementsArr: []
        },
        channelArr: [], // 这是基本信息里面存储投放渠道的数组
        organizationArr: [], // 所属机构的下拉框的数据数组
        projectAerr: [], // 所属项目的下拉的数据数组
        projectArr: [], // 这是基本信息里面所属项目的数组
        form: {
          type: [],
          resource: '',
          desc: ''
        },
        isdisable: [],
        Newid: '',
        previewid: '',
        isSave: '0',
        NewdeliveryManagements:[]
      }
  },
  beforeRouteUpdate  (to, from, next) {
    console.log(from)
    if (from.fullPath == '/eoveEnd/compileTemplate/template/coversStyl/' + this.$store.state.moveEnd.moveuuid  ) {
      this.$store.state.moveEnd.moveuuid = ''
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    if (to.matched[0].path !== '/eoveEnd/compileTemplate/template/coversStyl') {
      console.log(12366)

      // this.formLabelAlign = {}
      // console.log(this.formLabelAlign)
      this.$store.state.moveEnd.moveuuid = ''
      this.formLabelAlign.uuid = ''
      this.formLabelAlign.name = ''
      this.formLabelAlign.construction = ''
      this.formLabelAlign.constructionId = ''
      this.formLabelAlign.constructionID = ''
      this.formLabelAlign.project = ''
      this.formLabelAlign.projectId =''
      this.formLabelAlign.phone1 = ''
      this.formLabelAlign.phone2 = ''
      this.formLabelAlign.webpageName = ''
      this.formLabelAlign.projectCode = ''
      this.formLabelAlign.deliveryManagements = []
      this.formLabelAlign.deliveryManagementsArr = []
      console.log(this.formLabelAlign)
    }
    if (to.fullPath !== '/eoveEnd/compileTemplate/template/coversStyle') {
      this.$store.state.moveEnd.template.data = {}
      this.$store.state.moveEnd.moduleList = []
      this.$store.state.moveEnd.moveuuid = ''
      this.$store.state.moveEnd.elmentFormOne = []
      this.$store.state.moveEnd.uploadImg = []
      this.$store.state.moveEnd.hint = false
      this.$store.state.moveEnd.backgroundUrl= ''
      this.$store.state.moveEnd.fromMenuData = [
        { value: '这里可以填写优惠信息或者促销slogen' },
        { value: '输入手机号' },
        {
          value: '输入姓名',
          // 是否显示 和 是否必选
          isVisual: '1',
          isMust: '1',
        },
        {
          value: '选择时间',
          isVisual: '1', // 预约输入框里面的是否显示与隐藏 显示为1 隐藏为2
          isMust: '1', // 预约输入框里面的是否必填
          checkType: '1', // 预约输入框里面的是否多选
          checkList: [], // 预约时间了吗的存储复选框 数据 数组
        },
        {
          value: '选择户型',
          isVisual: '1', // 户型是否显示
          isMust: '1', // 户型的是否必填
          checkType: '1', // 户型的是否多选
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
        {
          value: '提交',
          bColourInput: '8ec870', // 立即预约按钮的颜色 输入框的字体
          btnColor: '#8ec870', // 立即预约按钮的颜色 吸取笔
          // 别搞混乱, 一个是背景颜色  一个是字体颜色
          tColourInput: 'fff',
          txtColor: '#fff',
        },
        {
          value: '拨打电话',
          tel: '', // 拨打电话的电话号码
          bColourInput: 'f08522', // 拨打电话按钮的颜色 输入框的字体
          btnColor: '#f08522', // 拨打电话按钮的颜色 吸取笔
          tColourInput: 'fff', // 拨打电话字体的颜色 输入框的字体
          txtColor: '#fff', // 拨打电话字体的颜色 吸取笔
        },
      ],

      localStorage.setItem('id', '')

      this.$store.state.moveEnd.html1.stylesActive = 1
      this.$store.state.moveEnd.html1.property = 1
      this.$store.state.moveEnd.html1.primary = 1
      this.$store.state.moveEnd.html1.attribute = 1
      this.$store.state.moveEnd.html1.isLingering = 2
      localStorage.setItem('idData', '0')
      this.$store.state.moveEnd.presentIndex = 0
    }
    next()
  },
  methods: {
    // 返回
    // back() {
    //   this.$router.push('/LandingPageSetting')
    // },
    cancel() {
      this.$confirm('确定放弃当前落地页的编辑？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        // if (this.formLabelAlign.name == '' ) {
        //   this.$message({
        //     type: 'warning',
        //     message: '请填写内容',
        //     center:true,
        //   });
        //   return
        // }

        this.formLabelAlign.uuid = ''
        this.formLabelAlign.name = ''
        this.formLabelAlign.construction = ''
        this.formLabelAlign.constructionId = ''
        this.formLabelAlign.constructionID = ''
        this.formLabelAlign.project = ''
        this.formLabelAlign.projectId =''
        this.formLabelAlign.phone1 = ''
        this.formLabelAlign.phone2 = ''
        this.formLabelAlign.webpageName = ''
        this.formLabelAlign.projectCode = ''
        this.formLabelAlign.deliveryManagements = []
        this.formLabelAlign.deliveryManagementsArr = []
        this.$router.push('/LandingPageSetting')
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    //预览
    previewLandingPage (link) {
    let arr = this.$route.path.split('/')
    this.id = arr.pop()
    console.log(this.id)
      if (this.$store.state.moveEnd.moveuuid =='' && this.id != '1') {
        this.$message({
          message: '请先保存',
          type: 'success',
          center:true,
          duration:1000
        });
        return
      }
    // this.$router.push({
    //   path: '/eoveEnd/Preview/' + localStorage.getItem('previewid')
    // })

     window.open(link +'/admin/#/eoveEnd/Preview/' + localStorage.getItem('previewid'))

  },
    // 机构筛选请求
    getOrganization() {
      organization()
        .then(res => {
          // console.log(res.data)
          this.organizationArr = res.data
        })
    },
    // 在机构选择后, 进行下面的请求 请求到项目的数据
    project(val, obj) {
      // console.log(val)
      this.formLabelAlign.constructionID = val.orgId
      this.formLabelAlign.construction = val.orgName
      this.formLabelAlign.project =''
      this.formLabelAlign.projectCode = ''

      console.log("---------------------------------------")
      console.log(this.formLabelAlign)
      console.log(this.organizationArr)
      project(this.formLabelAlign.constructionID)
        .then(res => {
          // console.log(res)
          this.projectAerr = res.data
          // 以下是 编辑是 调用这个函数传入 obj(也就是编辑的数据), 用来赋值项目 活动 和电话的
          // console.log(obj)
          this.projectAerr.map((item, index) => {
            // console.log(item)
            if (obj === undefined) {
              return
            }
            if (item.id === obj.projectCode && item.projectName === obj.projectName) {
              this.castRelease(item)
              // 这是活动的请求
              throwRelease(item.id)
                .then(res => {
                  // console.log(res)
                  this.projectArr = res.data
                  this.projectArr.map((item, index) => {
                    if (item.id === parseInt(obj.archiveId)) {
                      this.formLabelAlign.projectCode = item.id;
                      this.isBtn=false;

                    }
                  })
                })
            }
          })
        })
    },
    castRelease(val) {
      // console.log(val)
      this.formLabelAlign.project = val.projectName
      if (val.projectPagePhone) {
      let phonesSrt = val.projectPagePhone.split(',')
      this.formLabelAlign.phone1 = phonesSrt[0]
      this.formLabelAlign.phone2 = phonesSrt[1]
      }
      this.formLabelAlign.projectId = val.id
      throwRelease(val.id)
        .then(res => {
          // console.log(res)
          this.projectArr = res.data
        })
    },
    // 投放渠道
    getChannel() {
      channel()
        .then(res => {
          // console.log(123)
          // console.log(res)
          this.channelArr = res.data
          this.channelArr.map((item, index) => {
            if (index < 5) {
              this.formLabelAlign.deliveryManagements.push(item.channelName)
              let obj = {
                channelId: item.uuid,
                channelName: item.channelName
              }
              this.formLabelAlign.deliveryManagementsArr.push(obj)
            }
          })
          // console.log(this.formLabelAlign.deliveryManagements)
          // console.log(this.formLabelAlign.deliveryManagementsArr)
        })
    },
    // 投放渠道 选中之后 触发的事件, 为了拿到渠道的id+
    channelId(val) {
      // console.log(val)
      if (this.formLabelAlign.deliveryManagements.length === this.formLabelAlign.deliveryManagementsArr.length+1) {
        // console.log('添加')
      let obj = {
        channelId: val.uuid,
        channelName: val.channelName
      }
      this.formLabelAlign.deliveryManagementsArr.push(obj)
      } else {
        this.formLabelAlign.deliveryManagementsArr.map((item, index) => {
          // console.log(item)
          if (item.channelId === val.uuid) {
            // console.log(index+123)
            this.formLabelAlign.deliveryManagementsArr.splice(index, 1)
            // console.log(this.formLabelAlign.deliveryManagements.length)
            // console.log(this.formLabelAlign.deliveryManagementsArr.length)
          }
        })
      }
    },
    next(num) {
              if( this.formLabelAlign.name == '' ||
              this.formLabelAlign.phone1 == ''||
              this.formLabelAlign.phone2 == ''||
              this.formLabelAlign.projectCode == '') {
                this.hint = true
                return
              }


            console.log(this.$route.params.isAdd)
            let basicForm = {
              'pageName': this.formLabelAlign.name,
              'orgName': this.formLabelAlign.construction,
              'projectName': this.formLabelAlign.project,
              'projectCode': this.formLabelAlign.projectId,
              'callTel': this.formLabelAlign.phone1 + ',' + this.formLabelAlign.phone2,
              'label': this.formLabelAlign.webpageName,
              'uuid': this.$store.state.moveEnd.moveuuid,  // 这边的uuid 在一进页面的时候, 就拿到this.$store.state.moveEnd.moveuuid 给他赋值了
              'template': this.$store.state.moveEnd.majorKeyId.uuid,
              'archiveId': this.formLabelAlign.projectCode,
              'deliveryManagements': this.formLabelAlign.deliveryManagementsArr,
              'orgId': this.formLabelAlign.constructionID,
              'pageType': '1',
              'pageType2':this.$route.params.pageType
            }

            if (this.isSave == '1') {
              //  basicForm = this.NewdeliveryManagements
             basicForm.deliveryManagements = this.NewdeliveryManagements
              console.log(this.NewdeliveryManagements)
              console.log("1")
              this.isSave = '0'
            } else {
              basicForm.deliveryManagements =   this.formLabelAlign.deliveryManagementsArr
            }

            this.$store.state.moveEnd.majorKeyId.styleType = this.$route.params.pageType
            if(this.$route.params.isAdd=='1'){
               basicForm.uuid=this.$route.params.uuid;
            }
      console.log(basicForm)

      console.log(this.formLabelAlign.deliveryManagementsArr)



            // console.log(this.$store.state.moveEnd)
            // 判断是否是下一步 是否跳转路由, 或者只是简单的保存
            if (num === 1) {
              this.$confirm('确定保存当前修改内容并进入下一步?', '提示信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
                .then(() => {

                  // if (this.isSave == '1') {
                  //   essentialNext(this.NewdeliveryManagements)
                  //   .then(res => {
                  //      console.log(res)
                  //     if (res.code === 1) {
                  //       // this.Newid = res.data.uuid
                  //       localStorage.setItem('id',res.data.uuid)
                  //       this.$router.push({
                  //         path: '/eoveEnd/compileTemplate/template/coversStyle'
                  //       })
                  //      /* this.$router.push({
                  //         path: '/mobilePage/'+this.templateId +'/'+res.data.uuid
                  //       })*/
                  //       // console.log(this.$store.state.moveEnd)
                  //       // 我
                  //       this.$store.state.moveEnd.moveuuid = res.data.uuid
                  //       // console.log(this.$store.state.moveEnd.moveuuid)
                  //     } else {
                  //       console.log("this.first")
                  //       this.$message.error(res.message)
                  //       this.hint = true
                  //     }
                  //   })
                  // } else {
                    essentialNext(basicForm)
                    .then(res => {
                       console.log(res)
                      if (res.code === 1) {
                        // this.Newid = res.data.uuid
                        localStorage.setItem('id',res.data.uuid)
                        this.$router.push({
                          path: '/eoveEnd/compileTemplate/template/coversStyle'
                        })
                       /* this.$router.push({
                          path: '/mobilePage/'+this.templateId +'/'+res.data.uuid
                        })*/
                        // console.log(this.$store.state.moveEnd)
                        // 我
                        this.$store.state.moveEnd.moveuuid = res.data.uuid
                        // console.log(this.$store.state.moveEnd.moveuuid)
                      } else {
                        console.log("this.first")
                        this.$message.error(res.message)
                        this.hint = true
                      }
                    })
                  // }
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  })
                })
            } else {

              // 保存7保存7

              // if( this.formLabelAlign.name == '' &&
              // this.formLabelAlign.construction == ''&&
              // this.formLabelAlign.constructionId == ''&&
              // this.formLabelAlign.constructionID == ''&&
              // this.formLabelAlign.project == ''&&
              // this.formLabelAlign.projectId ==''&&
              // this.formLabelAlign.phone1 == ''&&
              // this.formLabelAlign.phone2 == ''&&
              // this.formLabelAlign.webpageName == ''&&
              // this.formLabelAlign.projectCode == '') {
              //   this.hint = true
              //   return
              // }



              this.$confirm('确定保存当前编辑内容?', '提示信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
              this.isdisable = this.formLabelAlign.deliveryManagements
              essentialNext(basicForm)
              .then(res => {
                console.log(res)

                if (res.code === 1) {

                  console.log(res)
                  this.NewdeliveryManagements = res.data.deliveryManagements
                  console.log(this.NewdeliveryManagements)
                //  this.isSave = '1'

                  this.formLabelAlign.deliveryManagementsArr = res.data.deliveryManagements
                  this.$store.state.moveEnd.moveuuid = res.data.uuid
                  // console.log(this.$store.state.moveEnd.moveuuid)
                  this.previewid = res.data.uuid
                  localStorage.setItem('previewid',this.previewid)
                  console.log("保存成功")
                  this.$message({
                    message: '保存成功,请在列表中查看',
                    type: 'success',
                    center:true,
                    duration:1000
                  });
                  this.forbidden = true
                  console.log(basicForm.deliveryManagements)
                } else {
                    this.hint = true
                    this.$message.error(res.message)
                }
              })
              }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });
              });
            }
          },

    // 编辑
    compile() {
      compileDate(this.$route.params.uuid)
      .then(res => {
        if (res.code === 1) {
          localStorage.setItem('previewid',res.data.uuid)
          // 我
          // console.log(this.formLabelAlign.deliveryManagements)
          // this.isdisable = true
          console.log('编辑0')
          console.log(res)
          this.formLabelAlign.name = res.data.pageName
          this.formLabelAlign.webpageName = res.data.label
          // console.log(this.organizationArr)
          this.organizationArr.map((item, index) => {
            if (item.orgName === res.data.orgName) {
              this.project(item, res.data)
            }
          })
          // ------------------

          this.templateId=res.data.template;

          this.formLabelAlign.deliveryManagements = []
          this.formLabelAlign.deliveryManagementsArr = []

          console.log(this.formLabelAlign.deliveryManagements)
          // this.isdisable.push(this.formLabelAlign.deliveryManagements)
          this.isdisable = this.formLabelAlign.deliveryManagements
          console.log(this.isdisable)

          console.log(this.formLabelAlign.deliveryManagementsArr)

          // 投放渠道 编辑数据更新
          res.data.deliveryManagements.map((item, index) => {
            this.formLabelAlign.deliveryManagements.push(item.channelName)
            let obj = {
              channelId: item.channelId,
              channelName: item.channelName,
              uuid: item.uuid
            }
            this.formLabelAlign.deliveryManagementsArr.push(obj)
          })
          console.log("------------------")
          console.log(this.formLabelAlign.deliveryManagementsArr)
          this.forbidden = true
          res.data.labels.map((item, innex) => {
            item.img = item.url
          })
          let arr = []
          res.data.labels.map((item, index) => {
            arr.push(item)
          })
          res.data.plugins.map((item, index) => {
            arr.push(item)
          })
            // arr.push(res.data.labels)
            // arr.push(res.data.plugins)
          // arr.map((item, index) => {
          //   this.$store.state.moveEnd.template.data.label[item.order] = item
          // })
          // // this.$store.state.moveEnd.template.data.label
          // // res.data.labels.map((item, index) => {
          // //   let _index = index
          // //   let _item = item
          // //   if (item .order > res.data.plugins[index]) {

          // //   }
          // // })
          // console.log(this.$store.state.moveEnd.template.data)
          // this.$store.state.moveEnd.template.data.label = res.data.labels
          this.$store.state.moveEnd.moduleList = res.data.labels.length === 0 ? [] : res.data.labels
          res.data.plugins.map((item, index) => {
            this.$store.state.moveEnd.moduleList.push(item)
          })
          this.$store.state.moveEnd.moduleList.map((item, index) => {
            item.color = item.bgColor
            item.mLabelId = item.id
            item.labelName = item.name
            item.templateLabelId = item.labelId
            item.templateStyleId = item.styleId
            if (!item.fields) {
              item.fields= []
            } else {
              item.fields.map((item, index) => {
                item.count = 0
              })
              res.data.labels.length === 0 ? '' : this.$store.state.moveEnd.hint = true
            }
          })
          this.$store.state.moveEnd.template.data.label = this.$store.state.moveEnd.moduleList
          localStorage.setItem('idData', '1')
          console.log(this.$store.state.moveEnd.moduleList)
          console.log(this.$store.state.moveEnd.template.data.label)
          console.log(this.formLabelAlign.deliveryManagements)
          console.log(this.formLabelAlign.deliveryManagementsArr)
        }
      })
    }
  },
  mounted() {
      localStorage.setItem('refresh', '0')
    this.getOrganization()
    this.getChannel()
    console.log(this.$store.state.moveEnd.moveuuid)
    if (this.$route.params.isAdd === '0') {
      this.formLabelAlign.uuid = this.$store.state.moveEnd.moveuuid

      this.formLabelAlign.uuid = ''
      this.formLabelAlign.name = ''
      this.formLabelAlign.construction = ''
      this.formLabelAlign.constructionId = ''
      this.formLabelAlign.constructionID = ''
      this.formLabelAlign.project = ''
      this.formLabelAlign.projectId =''
      this.formLabelAlign.phone1 = ''
      this.formLabelAlign.phone2 = ''
      this.formLabelAlign.webpageName = ''
      this.formLabelAlign.projectCode = ''
      this.formLabelAlign.deliveryManagements = []
      this.formLabelAlign.deliveryManagementsArr = []
      this.$store.state.moveEnd.moduleList = []
      this.$store.state.moveEnd.template.data.label = []
      localStorage.setItem('idData', '0')
    console.log(this.formLabelAlign);
      this.isBtn =false;
    } else {
      this.compile()
    }
  },
  // created () {
  //   if (this.$store.state.moveEnd.moveuuid.length > 1) {
  //     this.$store.state.moveEnd.moveuuid= ''
  //   }
  // }
}
