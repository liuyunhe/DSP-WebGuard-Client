import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  name: "",
  data() {
    return {
      bespeakId: this.$route.params.bespeakId,
      //文件
      fileList: [],
      projectId: this.$route.params.projectId,
      exportH: this.GLOBAL.config.exportH,

      customersListConditionList: '',
      //客户类型
      customer_listBox: false,
      isCustomer_listAll: false,
      customer_listAll: false,
      customer_listChecked: [],
      cstTypeLists: [],

      //客户状态
      cstStatusListBox: false,
      isCstStatusList: false,
      cstStatusListAll: false,
      cstStatusListChecked: [],
      cstStatusLists: [],

      //来源渠道
      channelBox: false,
      channelAll: false,
      isChannel: false,
      channelChecked: [],
      channels: [],

      //意向程度
      intentionalDegreeListBox: false,
      isIntentionalDegreeList: false,
      IntentionalDegreeListAll: false,
      intentionalDegreeListChecked: [],
      intentionalDegreeLists: [],

      keyWordText: '',
      // 导入
      imports: false,
      ImportFailure: false,//失败
      ImportSuccess: false,//成功
      ImportSuccessInfo: [],
      ImportFailureT: '',
      // 外呼
      isDisplay: '',
      calloutTelList: [],
      calloutTel: [],
      outcryInformation: false,
      Outbound: false,


      channel: [],
      conditionList: [],

      //cstTypeList: [],
      cstValidityList: [],
      intentionalDegreeList: [],

      //归属项目
      dialogVisibleProjectList: false,
      searchKeyfilterText: '',
      ProjectListData: [],
      defaultProps: {
        children: 'dsaOrgProjectinfoList',
        label: 'projectName'
      },
      queryCustomersListId: [],

      bespeakId: "",
      channelName: "",
      clientId: "",
      collectionMethod: "",
      createTime: [],
      cstName: "",
      cstStatus: "",
      isDisplay: "1",
      mobilePhone: "",
      projectId: "",
      projectName: "",
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 来电详情
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      type: '全部',
      typeOptions: [],
      cstValidityList: [],
      input: '',
      dialogVisible: false,
      centerDialogVisible: true,

      // 置业顾问列表
      consultantList: [],
      allocationLoading: false,
      rowClickData: '', //行数据
      rowClickConsultantData: '',
      consultantListCurrentPage: 1,
      consultantListTotal: 0,


      //  retCode: "",
      // 备选项
      checked: true,
      tags: [],
      options: [],
      loading: true,
      customerList: [], //项目管理列表
      //载入动画显示
      listLoading: false,
      //表单
      filters: {
        status: "0",
        type: "name",
        search: "",
        time: []
      },
      bespeakId: '',
      clientId: '',
      projectId: '',
      formQueryCustomersList: {
        keyWord: '', //关键词（归属项目、客户姓名、手机号码、关键词、归属渠道、置业顾问）
        collectionMethod: '', //客户类型code(选全部不用传入)
        startTime: '', //开始时间
        endTime: '', //结束时间
        pageSize: 10, //每页数量
        pageNo: 1, //当前页
      },
      rowNowCount: '',
      //table内容
      pageList: [],
      //数据总条数
      total: 0,
      //每页显示条数
      pageSize: 10,
      //查询页码
      pageNo: 1,
      sels: [], //列表选中列
      pageType: '',
      getClickProjectList:[],
      getClickProjectListId:[],
      guestDate:[],
    };
  },
  destroyed: function () {
    console.log('离开页面');
    console.log(this.tags)
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
    this.tags = []
    this.$refs.yang.value = ''
  },
  methods: {
    //客户列表（点击进入外呼）
    customerTocallout(scope) {
      console.log(scope)
      this.$requestHttp.put("api/private/1.0/customer/tocallout", {
        bespeakId: scope.row.bespeakId,
        clientId: scope.row.clientId,
        projectId: scope.row.projectId,
        isCustom: scope.row.isCustom
      }, '', res => {
        console.log('1223424');
        if (res.data.code == 1) {
          console.log('112')
          this.calloutTelList = res.data.data.calloutTelList;
          console.log(this.calloutTelList);
          this.calloutTel = res.data.data.calloutTel
          console.log(this.calloutTel);
        }
      })
    },
    //确认外呼
    customerCallout() {
      console.log('1')
      this.$requestHttp.put("api/private/1.0/customer/callout", {
        calloutTel: this.calloutTel,
        bespeakId: this.bespeakId
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          console.log('11212')
          if (res.data.data.retCode == '2') {
            console.log('123123')
            this.$message.error(res.data.data.retDesc);
            return;
          }
        }

      })
    },

    getClickProject(res,IScheck,list){
      console.log(res);
      console.log(IScheck);
      if(IScheck){
        console.log(!isNaN(res.id))
        if(!isNaN(res.id)){
          this.getClickProjectList.push(res.projectName);
          this.getClickProjectListId.push(res.id)
        }

      }else {//取消
          this.getClickProjectList.map((item,index)=>{
            console.log(item)
              if(item==res.projectName){
                console.log(index)
                this.getClickProjectList.splice(index,1)
                this.getClickProjectListId.slice(index,1)
              }
          })
      }
      this.getClickProjectList =this.unique(this.getClickProjectList);
      this.getClickProjectListId =this.unique(this.getClickProjectListId);

      console.log(this.getClickProjectListId)
    },
    getCheckedKeys() {//获取选择的项目
      console.log(this.$refs.tree.getCheckedKeys());
      let id = this.$refs.tree.getCheckedKeys();
      let attr = [];
      for (let i = 0; id.length > i; i++) {
        console.log(isNaN(id[i]))
        if (isNaN(id[i])) {
          attr.push(id[i])
        }
      }
      console.log(attr)
      this.queryCustomersListId = attr;
      this.dialogVisibleProjectList = false;
      this.queryCustomersList();
   //   this.getClickProjectList=[];
      this.searchKeyfilterText = '';
    },

    getOrginfoAndProjectList() {//归属项目
      this.$requestHttp.put("api/private/1.0/communal/getOrginfoAndProjectList", {
        searchKey: this.searchKeyfilterText,
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          console.log('124445')
          let ProjectListData = res.data.data.dataList;
          let ProjectListDataAttr = [];
          for (let i = 0; ProjectListData.length > i; i++) {
            let json = {
              id: i,
              dsaOrgProjectinfoList: ProjectListData[i].dsaOrgProjectinfoList,
              projectName: ProjectListData[i].orgName,
            }
            ProjectListDataAttr.push(json);
          }
          this.ProjectListData = ProjectListDataAttr;
        }
      });
    },
    handleCloseProject(done) {//
      this.$refs.tree.setCheckedKeys([]);
      this.searchKeyfilterText = '';
      //this.getClickProjectList=[];
      done();
    },
    //选择文件
    submitUpload() {
      this.$refs.upload.submit();
    },
    errorUpload(event, file, fileList) {

      console.log(file)
      if (file[0].status == 'success') {
        if (file[0].response.code == 1) {
          if (file[0].response.data.result == '导入失败') {
            console.log('导入失败');
            console.log(file)
            this.imports=false;
            this.fileList=[];
            this.ImportFailure = true;


            console.log("desc" in file[0].response.data);
            if("desc" in file[0].response.data){
              this.ImportFailureT = file[0].response.data.desc;
            }else{
              this.ImportFailureT = file[0].response.data.result +':'+ file[0].response.data.info;
            }


          } else {
            this.imports=false;
            this.fileList=[];
            this.ImportSuccess = true;
            this.ImportSuccessInfo = file[0].response.data.info;
          }
        } else if (file[0].response.code < 0) {
          this.$message.error(file[0].response.message);
        }
      }

    },
    importsHandleClose() {
      this.imports = false;
      this.fileList = [];
    },


    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //任务类型
    CheckedCustomer_listAll(val) {
      this.customer_listChecked = val ? this.cstTypeLists : [];
      this.isCustomer_listAll = true;
    },
    CheckedCustomer_list(value) {
      let checkedCount = value.length;
      this.customer_listAll = checkedCount === this.customersListConditionList.cstTypeList.length;
      this.isCustomer_listAll = checkedCount > 0 && checkedCount < this.customersListConditionList.cstTypeList.length;
    },
    saveCheckeds() { //任务状态
      this.customer_listBox = false;
      if (this.isCustomer_listAll) {
        this.pushTagesList('客户类型：' + this.customer_listChecked, 'collectionMethod', this.customer_listChecked);
      }
      this.formQueryCustomersList.pageNo = 1;//currentPage
      this.queryCustomersList();
    },

    //客户状态
    CheckedCstStatusListAll(val) {
      this.cstStatusListChecked = val ? this.cstStatusLists : [];
      this.isCstStatusList = true;
    },
    CheckedCstStatusList(value) {
      let checkedCount = value.length;
      this.cstStatusListAll = checkedCount === this.customersListConditionList.cstStatusList.length;
      this.isCstStatusList = checkedCount > 0 && checkedCount < this.customersListConditionList.cstStatusList.length;
    },
    savecStStatusList() {
      this.cstStatusListBox = false;
      this.formQueryCustomersList.pageNo = 1;
      console.log(this.isCstStatusList)
      if (this.isCstStatusList) {
        this.pushTagesList('客户状态：' + this.cstStatusListChecked, 'cstStatusList', this.cstStatusListChecked);
      }
      this.queryCustomersList();
    },

    //来源渠道
    CheckedChannelAll(val) {
      this.channelChecked = val ? this.channels : [];
      console.log(this.channelChecked)
      console.log(this.channels)
      this.isChannel = true;
    },
    CheckedChannel(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.customersListConditionList.channel.length;
      this.isChannel = checkedCount > 0 && checkedCount < this.customersListConditionList.channel.length;
    },
    savecChannel() {
      this.channelBox = false;
      this.formQueryCustomersList.pageNo = 1;
      if (this.isChannel) {
        this.pushTagesList('来源渠道：' + this.channelChecked, 'channel', this.channelChecked);
      }
      this.queryCustomersList();
    },

    //意向程度
    CheckedIntentionalDegreeListAllAll(val) {
      this.intentionalDegreeListChecked = val ? this.intentionalDegreeLists : [];
      this.isIntentionalDegreeList = true;
    },
    CheckedIntentionalDegreeList(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.customersListConditionList.intentionalDegreeList.length;
      this.isIntentionalDegreeList = checkedCount > 0 && checkedCount < this.customersListConditionList.intentionalDegreeList.length;
    },
    savecIntentionalDegreeList() {
      this.intentionalDegreeListBox = false;
      this.formQueryCustomersList.pageNo = 1;
      if (this.isIntentionalDegreeList) {
        this.pushTagesList('意向程度：' + this.intentionalDegreeListChecked, 'intentionalDegreeList', this.intentionalDegreeListChecked);
      }
      this.queryCustomersList();
    },

    handleCloseBox(done) {
      console.log(2343434435);
      this.$refs.customerListTable.clearSelection();
      this.$refs.singleTable.setCurrentRow();
      this.$refs.customerListTable.setCurrentRow();
      this.rowClickData = '';
      this.rowClickConsultantData = '';
      done();

    },
    handleClose(tag) { //关闭标签
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'collectionMethod':
          this.customer_listChecked = [];
          this.queryCustomersList();
          break
        case 'cstStatusList':
          this.cstStatusListChecked = [];
          this.queryCustomersList();
          break
        case 'channel':
          this.channelChecked = [];
          this.queryCustomersList();
          break
        case 'intentionalDegreeList':
          this.intentionalDegreeListChecked = [];
          this.queryCustomersList();
          break
        case 'keyWord':
          this.formQueryCustomersList.keyWord = '';
          this.queryCustomersList();
          break
        case 'date':
          this.guestDate =[];
          this.queryCustomersList();
          break

      }
    },
    rowClick(row) {
      this.$refs.customerListTable.toggleRowSelection(row);

    },
    rowClickhandleCurrentChange(row, event, column) { //获取行数据
      console.log(row)
      this.rowClickData = row;
      console.log(this.rowClickData.length)
      // if (this.rowClickData.length > 1) {
      //   for (var i = 0; this.rowClickData.length > i; i++) {
      //     console.log(this.rowClickData[i].projectId)
      //     if (this.rowClickData[i].projectId != this.rowClickData[i + 1].projectId) {
      //       return this.$confirm('只能对同一个项目的客户进行分配或回收？', '提示信息', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //       }).then(() => {
      //         this.$refs.customerListTable.clearSelection();
      //       }).catch(() => {
      //         this.$refs.customerListTable.clearSelection();
      //       });
      //       return
      //     } else {
      //       return
      //     }
      //   }
      // }

    },
    rowClickConsultant(row) { //置业顾问选择
      console.log(row);
      this.rowClickConsultantData = row;
    },
    updateCstByBesId() { //保存分配
      console.log(this.rowClickConsultantData);
      console.log(this.rowClickData);
      let bespeakId = '';
      for (var i = 0; this.rowClickData.length > i; i++) {
        console.log(this.rowClickData[i].bespeakId);
        bespeakId += this.rowClickData[i].bespeakId + ','
      }


      this.$requestHttp.put("api/private/1.0/customer/updateCstByBesId", {
        consultantId: this.rowClickConsultantData.id,
        bespeakId: bespeakId
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          console.log('124445');
          this.$message({
            type: 'success',
            message: '分配成功!',
          });
          this.queryCustomersList();
        }
      })
    },

    handleCommand(command) {
      //  this.$message('click on item ' + command);
      console.log(command)
      this.mobile_terminal = command;
      this.searchList();
    },
    handleCommandStatus(command) {
      console.log(command)
      this.status = command;
      this.searchList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) { // 下一页
      console.log(val);
      this.formQueryCustomersList.pageNo = val;
      this.queryCustomersList();
    },
    remoteMethod(query) { //模糊查询
      console.log(query);
      this.projectTaskListByLike(query);
    },
    projectTaskListByLike(keyWord) {
      this.$requestHttp.put("api/private/1.0/customer/queryCstBykeyWord", {
        keyWord: keyWord
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          console.log('124445')
          this.options = res.data.data
        }
      })
    },
    pushTagesList(val, valName, name) { //添加标签
      if (name != '') {
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].type == valName) {
            this.tags.splice(i, 1);
          }
        }
        let json = {
          name: val,
          type: valName,
        }
        this.tags.push(json);
        console.log(this.tags);
      } else {
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].type == valName) {
            this.tags.splice(i, 1);
          }
        }
      }
    },
    // 客户详情
    // CustomerDetails() {
    //   this.$router.push('./CustomerDetails')
    // },
    // 列表查询
    queryCustomersList() {
      this.loading = true;

      let customer_listStr = '';
      if (this.customer_listChecked.length == 1) { //客户类型
        for (var i = 0; this.customersListConditionList.cstTypeList.length > i; i++) {
          console.log(this.customersListConditionList.cstTypeList[i].value)
          if (this.customersListConditionList.cstTypeList[i].value == this.customer_listChecked[0]) {
            customer_listStr = this.customersListConditionList.cstTypeList[i].code;
          }
        }
      } else {
        customer_listStr = ''
      }

      let channelListStr = [];
      for (var i = 0; this.customersListConditionList.channel.length > i; i++) {
        for (var n = 0; this.channelChecked.length > n; n++) {
          if (this.customersListConditionList.channel[i].value == this.channelChecked[n]) {
            channelListStr.push(this.customersListConditionList.channel[i].code);
          }
        }
      }

      console.log(this.type)
      let conditionList = '';
      for (var i = 0; this.customersListConditionList.conditionList.length > i; i++) {
        if (this.customersListConditionList.conditionList[i].value == this.type) {
          conditionList += this.customersListConditionList.conditionList[i].code;
        }
      }
      let keyWord = this.formQueryCustomersList.keyWord
      if (conditionList != '') {
        keyWord = this.keyWordText;
      }
      console.log(localStorage.getItem('json'))

        let json = {
          pageSize: this.formQueryCustomersList.pageSize,
          pageNo: this.formQueryCustomersList.pageNo,
          collectionMethod: customer_listStr,
          cstStatusList: this.cstStatusListChecked,
          channelList: channelListStr,
          intentionalDegreeList: this.intentionalDegreeListChecked,
          keyWord: keyWord,
          conditionCode: conditionList,
          projectIdList: this.queryCustomersListId,
          startTime:this.guestDate[0],
          endTime:this.guestDate[1]
        }



      this.$requestHttp.put("api/private/1.0/customer/queryCustomersList", json, '', res => {
        console.log(res);
        if (res.data.code == 1) {

          this.loading = false;
          this.customerList = res.data.data.list
          console.log('1234');
          this.total = res.data.data.count;
          this.pageSize = res.data.data.pageSize;
          this.pageNo = res.data.data.pageNo;
          this.rowNowCount = res.data.data.rowNowCount;
        }
      }, error => {
        console.log(error)
      })
    },
    // 客户列表(条件初始化)
    customersListCondition() {
      this.loading = true;
      this.$requestHttp.put("api/private/1.0/customer/customersListCondition", {}, '', res => {
        console.log(res.data);
        if (res.data.code == 1) {
          this.customersListConditionList = res.data.data;

          for (var i = 0; this.customersListConditionList.cstTypeList.length > i; i++) {
            this.cstTypeLists.push(this.customersListConditionList.cstTypeList[i].value);
          }
          for (var i = 0; this.customersListConditionList.cstStatusList.length > i; i++) {
            this.cstStatusLists.push(this.customersListConditionList.cstStatusList[i].value);
          }
          for (var i = 0; this.customersListConditionList.channel.length > i; i++) {
            this.channels.push(this.customersListConditionList.channel[i].value);
          }
          for (var i = 0; this.customersListConditionList.intentionalDegreeList.length > i; i++) {
            this.intentionalDegreeLists.push(this.customersListConditionList.intentionalDegreeList[i].value);
          }


          this.typeOptions = res.data.data.conditionList;
          console.log(this.typeOptions)
          this.loading = false;
          // 列表查询
          this.queryCustomersList();

        }
      }, error => {
        console.log(error)
      })
    },

    // 回收
    recovery() {
      if (this.rowClickData.length > 1) {

        let ary = [];
        for (var i = 0; this.rowClickData.length > i; i++) {
          ary.push(this.rowClickData[i].projectId)
        }
        let res = this.unique(ary);
        if (res.length > 1) { //
          return this.$confirm('只能对同一个项目的客户进行分配或回收？', '提示信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs.customerListTable.clearSelection();
          }).catch(() => {
            this.$refs.customerListTable.clearSelection();
          });
        }
      }
      if (this.rowClickData == '') {
        this.$message.error('请选择客户！');
        return
      }
      let bespeakId = '';
      for (var i = 0; this.rowClickData.length > i; i++) {
        console.log(this.rowClickData[i].bespeakId);
        bespeakId += this.rowClickData[i].bespeakId + ','
      }

      this.$requestHttp.put("api/private/1.0/customer/queryProjectIdBySet", {
        projectId: this.rowClickData[0].projectId,
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          if (res.data.data.isButt) {
            this.$confirm('你确定要回收此客户？', '提示信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              this.$requestHttp.put("api/private/1.0/customer/updateCstAddRob", {
                bespeakId: bespeakId,
              }, '', res => {
                console.log(res);
                if (res.data.code == 1) {
                  if (res.data.data.retCode == '2') {
                    this.$message.error(res.data.data.retDesc);
                    return;
                  }
                  this.$message({
                    type: 'success',
                    message: '回收成功!',
                  });
                  this.queryCustomersList();
                }
              }, error => {
                console.log(error)
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消回收'
              });
            });

          } else {
            this.$message.error('该项目对接SaaS，不能进行回收或分配！');
          }
        } else {
          this.$message.error(res.data.message);
        }
      }, error => {
        console.log(error)
      })
    },

    unique(arr) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) == -1) {
          result.push(arr[i])
        }
      }
      return result;
    },
    // 分配查询置业顾问
    queryConsultantList() {
      if (this.rowClickData.length > 1) {
        let ary = [];
        for (var i = 0; this.rowClickData.length > i; i++) {
          ary.push(this.rowClickData[i].projectId)
        }
        let res = this.unique(ary);
        if (res.length > 1) { //
          return this.$confirm('只能对同一个项目的客户进行分配或回收？', '提示信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$refs.customerListTable.clearSelection();
          }).catch(() => {
            this.$refs.customerListTable.clearSelection();
          });
        }
      }

      if (this.rowClickData == '') {
        this.$message.error('请选择客户！');
        return
      }
      this.$requestHttp.put("api/private/1.0/customer/queryProjectIdBySet", {
        projectId: this.rowClickData[0].projectId,
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          if (res.data.data.isButt) {

            this.dialogVisible = true;

            this.allocationLoading = true;
            this.$requestHttp.put("api/private/1.0/customer/queryConsultantList", {
              projectId: this.rowClickData[0].projectId,
              pageSize: this.pageSize,
              pageNo: this.pageNo
            }, '', res => {
              console.log(res);
              if (res.data.code == 1) {
                this.consultantList = res.data.data.list;
                this.consultantListTotal = res.data.data.count;
                this.allocationLoading = false;
              }
            }, error => {
              console.log(error)
            })
          } else {
            this.$message.error('该项目对接SaaS，不能进行回收或分配!');
          }
        } else {
          this.$message.error(res.data.message);
        }
      }, error => {
        console.log(error)
      })

    },
    // 客户详情
    getQueryCustomerData(scope) {
      this.$router.push('/CustomerDetails/' + scope.row.bespeakId + '/' + scope.row.clientId + '/' + scope.row.projectId);
    },
    configuration(scope) { //编辑
      this.$router.push('/EditCustomer/' + scope.row.bespeakId + '/' + scope.row.clientId + '/' + scope.row.projectId);
    },
    // 关键词自动补全
    queryCstBykeyWord() {
      this.$requestHttp.put("api/private/1.0/customer/queryCstBykeyWord", {
        keyWord: this.keyWord
      }, '', res => {
        console.log(res);
        if (res.code == 1) {
          this.retDesc = res.data.retDesc;
          this.keywordList = res.data.keywordList;
          this.retCode = res.data.retCode
        }
      }, error => {
        console.log(error)
      })
    },
    //传送查询条件
    postSearch() {
      this.loading = true;
      this.$api.queryCustomersList(this.search).then(res => {
        this.pageList = res.data.data.list;
        this.total = res.data.data.count;
        this.pageSize = res.data.data.pageSize;
        this.loading = false;
      });
    },
    //查询按钮
    commitForm() {
      this.page = 1;
      this.currentPage = 1;
    },
    //radio按钮,重置
    getStatus() {
      this.page = 1;
      this.currentPage = 1;
      this.formQueryCustomersList.pageNo=1;
      this.pageType = "";
      this.tags = [];
      this.pageNo = "1";
      this.keyWordText = [];
      this.formQueryCustomersList.keyWord = '';
      this.customer_listChecked = [];
      this.cstTypeLists = [];
      this.channelChecked = [];
      this.channels = [];
      this.cstStatusListChecked = [];
      this.cstStatusLists = [];
      this.intentionalDegreeListChecked = [];
      this.intentionalDegreeLists = [];
      this.IntentionalDegreeListAll = '';
      this.channelAll = '';
      this.cstStatusListAll = '';
      this.customer_listAll = '';
      this.cstStatusList = [];
      this.cstTypeList = [];
      this.channel = [];
      this.intentionalDegreeList = [];
      this.queryCustomersListId = [];
      this.guestDate=[];
      this.customersListCondition();
    },


    // 导出客户列表
    customerExport() {

      let customer_listStr = '';
      if (this.customer_listChecked.length == 1) { //客户类型
        for (var i = 0; this.customersListConditionList.cstTypeList.length > i; i++) {
          console.log(this.customersListConditionList.cstTypeList[i].value)
          if (this.customersListConditionList.cstTypeList[i].value == this.customer_listChecked[0]) {
            customer_listStr = this.customersListConditionList.cstTypeList[i].code;
          }
        }
      } else {
        customer_listStr = ''
      }

      let channelListStr = [];
      for (var i = 0; this.customersListConditionList.channel.length > i; i++) {
        for (var n = 0; this.channelChecked.length > n; n++) {
          if (this.customersListConditionList.channel[i].value == this.channelChecked[n]) {
            channelListStr.push(this.customersListConditionList.channel[i].code);
          }
        }
      }
      let params = {
        keyWord: this.keyWordText || this.formQueryCustomersList.keyWord,
        //keyWord: 'keyWord',
        collectionMethod: customer_listStr,
        pageSize: this.formQueryCustomersList.pageSize,
        pageNo: this.formQueryCustomersList.pageNo,
        cstValidityList: [],
        intentionalDegreeList: this.intentionalDegreeListChecked,
        cstStatusList: this.cstStatusListChecked,
        projectIdList: this.queryCustomersListId,
        channelList: channelListStr,
        startTime:this.guestDate[0],
        endTime:this.guestDate[1]
      }


      this.$api.customerExport(params).then(function (res) {
        console.log('导出文件')
        console.log(res);
        // var blob = res
        // var blob = new Blob([res], { type: 'application/x-xls' })
        var blob = new Blob([res], {
          type: 'application/vdn.ms-excel'
        });

        // var reader = new FileReader();
        // reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
        // // 文件读取成功的回调
        // reader.onload = function (e) {
        //   //判断是否有导出内容
        //   if (blob.size <= 0) {
        //     this.$message.warning('没有内容导出')
        //     return
        //   }
        //   var a = document.createElement('a')
        //   a.download = '导出数据.xls'
        //   a.href = e.target.result;
        //   // $("body").append(a);  // 修复firefox中无法触发click
        //   document.body.appendChild(a);
        //   a.click();
        //   document.body.removeChild(a);
        //   // $(a).remove();
        // }
        // 文件读取失败的回调
        // reader.onerror = function (e) {
        //   this.$message.error('文件导出失败')
        // }

        let filename = '导出数据.xls';
        let URLOBJ = window.URL || window.webkitURL;
        if ('download' in document.createElement('a')) {
          const downloadElement = document.createElement('a');
          let href = URLOBJ.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = filename;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          URLOBJ.revokeObjectURL(href);
          document.body.removeChild(downloadElement);
        } else {
          navigator.msSaveBlob(blob, filename);
        }
      });
    },

    //分页器功能
    /*  handleCurrentChange(val) {
        this.page = val;
        this.search["pageNo"] = val;
        this.postSearch();
        this.currentPage = val;
      },*/
    //跳转按钮功能
    jumpTo() {
      this.$emit("current-change");
    },
    //超过十个字添加title属性
    istitle(value) {
      if (value) {
        if (value.length > 5) {
          return value;
        } else {
          return "";
        }
      }
    },
    //pageType选择
    pageTypeHandle(command) {
      this.pageType = command;
    },
  },
  mounted() {
    // 客户列表(条件初始化)
    console.log(this.GLOBAL.config.exportH)

    this.customersListCondition();
    this.tags = []
  },
  watch: {
    guestDate(val){
      console.log(val)
      if (val != null) {
        this.guestDate.startTime = val;
        this.pushTagesList('获客时间：' + val[0] + '至' + val[1], 'date', val);
        this.queryCustomersList();
      } else {
        this.guestDate = [];
        this.establishDate = [];
        this.delTags('date');
        this.queryCustomersList();
      }
    }
  /*  searchKeyfilterText(val) {
      console.log(val)
      this.searchKeyfilterText = val;
      this.getOrginfoAndProjectList();
    },*/
  }
};
