import {organization, project, throwRelease, channel, essentialNext, compileDate} from '@/apis/index.js'
  export default {
    data() {
      return {
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
        isdisable:false
      }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    if (to.matched[0].path !== '/eoveEnd/compileTemplate/template/coversStyl') {
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
    next()
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/LandingPageSetting')
    },
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
      console.log(this.$store.state.moveEnd.moveuuid)
      if (this.$store.state.moveEnd.moveuuid == ''  ||this.$store.state.moveEnd.moveuuid == '0' ||  this.$store.state.moveEnd.moveuuid=='1') { //新增
        //uuIds=this.addUuid;
        this.$message.error('未编辑落地页内容，进入下一步编辑保存后预览!');
        return
      }
      if (this.$store.state.moveEnd.moveuuid) {
        window.open(link+`/api/private/1.0/page/preview/${this.$store.state.moveEnd.moveuuid}`);
      }
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
      this.formLabelAlign.projectCode =''
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
                      this.formLabelAlign.projectCode = item.id
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
    // 投放渠道 选中之后 触发的事件, 为了拿到渠道的id
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
      console.log(this.$store.state.moveEnd.majorKeyId.uuid)
      console.log(this.$store.state.moveEnd.majorKeyId.uuid)
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
        'pageType': this.$route.params.id,
      }
      // console.log(this.$store.state.moveEnd)
      // 判断是否是下一步 是否跳转路由, 或者只是简单的保存
      if (num === 1) {
        this.$confirm('确定保存当前内容并进入下一步?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
          essentialNext(basicForm)
            .then(res => {
              // console.log(res)
              if (res.code === 1) {
                this.$router.push({
                  path: '/eoveEnd/compileTemplate/template/coversStyle'
                })
                // console.log(this.$store.state.moveEnd)
                // 我
                this.$store.state.moveEnd.moveuuid = res.data.uuid
                // console.log(this.$store.state.moveEnd.moveuuid)
              } else {
                this.$message.error(res.message)
                this.hint = true
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {

        this.$confirm('确定保存当前编辑内容?, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        essentialNext(basicForm)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            this.$store.state.moveEnd.moveuuid = res.data.uuid
            // console.log(this.$store.state.moveEnd.moveuuid)
            console.log("保存成功")
            this.$message({
              message: '保存成功,请在列表中查看',
              type: 'success',
              center:true,
              duration:1000
            });
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
      compileDate(this.$store.state.moveEnd.moveuuid)
      .then(res => {
        if (res.code === 1) {
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



          this.formLabelAlign.deliveryManagements = []
          this.formLabelAlign.deliveryManagementsArr = []

          console.log(this.formLabelAlign.deliveryManagements)
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
          this.$store.state.moveEnd.moduleList = res.data.labels
          this.$store.state.moveEnd.moduleList.map((item, index) => {
            item.mLabelId = item.id
            item.labelName = item.name
            item.templateLabelId = item.labelId
            item.templateStyleId = item.styleId
            if (!item.fields) {
              item.fields= []
            }
          })
          this.$store.state.moveEnd.isData = 1
          console.log(this.$store.state.moveEnd.moduleList)
        //   console.log(15646)
        //   this.projectAerr.map((item, index) => {
        //     console.log(item)
        //     if (item.id === res.data.projectCode && item.projectName === res.data.projectName) {
        //       console.log(item)
        //       this.castRelease(item)
        //     }
        //   })
        console.log(this.formLabelAlign.deliveryManagements)
        console.log(this.formLabelAlign.deliveryManagementsArr)
        // const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('')
        }
      })
    }
  },
  mounted() {
    this.getOrganization()
    this.getChannel()
    console.log(this.$store.state.moveEnd.moveuuid)
    if (this.$store.state.moveEnd.moveuuid === '') {
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
    console.log(this.formLabelAlign)
    } else {
      this.compile()
    }
  }
}
