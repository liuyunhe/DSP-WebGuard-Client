import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  data() {
    return {
      callType: this.$route.params.callType,//切换
      type: '全部',
      initList: '',//初始化數據

      //表单
      formQueryCallerList: {
        pageNo: 1,//当前页数
        keyWord: '',//    关键词（归属项目、客户姓名、手机号码、置业顾问）
        clickTimeStart: '',//开始时间
        clickTimeEnd: '',//结束时间
        statuses: [], //客户有效性
        cstStatusList: [], //客户类型
        projectNames: [],//归属项目
        channelNames: [],//来源渠道
        cstName:'',
        kw:''//
      },

      //来源渠道
      channelBox: false,
      channelAll: false,
      isChannel: true,
      channelChecked: [],
      channels: [],
      channel: [],

      //客户有效性
      customer_listBox: false,
      isCustomer_listAll: true,
      customer_listAll: false,
      customer_listChecked: [],
      cstTypeLists: [],

      //归属项目
      dialogVisibleProjectList: false,
      searchKeyfilterText: '',
      ProjectListData: [],
      defaultProps: {
        children: 'dsaOrgProjectinfoList',
        label: 'projectName'
      },


      tags: [],//
      options: [],
      loading: false,
      listData: [],//列表


      // 外呼
      recording: false,
      recording: false,

      // 详情
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

      //录音
      recording: false,
      recordInfo: [],


      establishDate: [],//創建時間
      // 备选项
      checked: false,
      //载入动画显示
      listLoading: false,

      //table内容
      pageList: [],
      //数据总条数
      total: 0,
      //分页器当前选中页码
      currentPage: 1,
      //每页显示条数
      pageSize: 0,
      //查询页码
      page: 1,
      sels: [], //列表选中列
      pageType: "",
      getClickProjectList: [],

      rowNowCount: '',
      save:''
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
  created() {
    this.init();
    this.queryCallerListFun();
    console.log(this.$route.params.callType);
    this.getOrginfoAndProjectList();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  methods: {
     // 取消归属项目
    cancel() {
      this.searchKeyfilterText = ''
      this.getOrginfoAndProjectList()
     // this.getClickProjectList = []
      this.dialogVisibleProjectList = false
    },
    customerExport() { //导出
      console.log("导出")
      let json ={
        channelNames: this.formQueryCallerList.channelNames, //来源渠道列表
        mobilePhone: this.formQueryCallerList.keyWord, //手机号码模糊搜索
        pName: this.formQueryCallerList.keyWord, //项目名模糊搜索
        cstName: this.formQueryCallerList.cstName, //用户名模糊搜索
        kw:this.formQueryCallerList.kw, //模糊搜索
       // cName: this.formQueryCallerList.keyWord, //渠道模糊搜索
        consultantName:  this.formQueryCallerList.keyWord, //归属职业顾问模糊搜索
        clickTimeStart: this.formQueryCallerList.clickTimeStart, //点击开始时间
        clickTimeEnd: this.formQueryCallerList.clickTimeEnd, //点击结束时间
        statuses: this.formQueryCallerList.statuses, //状态列表
        projectNames:this.formQueryCallerList.projectNames, //项目名列表
      }

      console.log(this.type)
      console.log(this.formQueryCallerList.kw)
      if(this.type=='全部' ){
        if(this.formQueryCallerList.kw!=''){
          delete  json['cstName'];
          delete  json['pName'];
          delete json['mobilePhone'];
          delete json['consultantName'];
        }else{
          delete  json['cstName'];
          delete  json['pName'];
          delete json['mobilePhone'];
          delete json['consultantName'];
          delete  json['kw'];
        }

      }else if(this.type=='手机号码'){
          delete  json['cstName'];
          delete json['pName'];
          delete json['keywd'];
          delete json['consultantName'];
      }else if(this.type=='客户姓名'){
         delete  json['mobilePhone'];
         delete json['pName'];
         delete json['keywd'];
         delete json['consultantName'];
      }else if(this.type=='归属项目'){
         delete  json['cstName'];
         delete json['mobilePhone'];
         delete json['keywd'];
         delete json['consultantName'];
      }else if(this.type=='置业顾问'){
         delete  json['cstName'];
         delete json['mobilePhone'];
         delete json['pName'];
         delete json['keywd'];
      }
      if(this.formQueryCallerList.clickTimeStart==''){
        delete  json['clickTimeStart'];
      }
      if(this.formQueryCallerList.clickTimeEnd==''){
         delete    json['clickTimeEnd']
      }
      if(this.formQueryCallerList.channelNames.length==0){
          delete   json['channelNames'];
      }
      if(this.formQueryCallerList.statuses.length==0){
         delete   json['statuses'];
      }
      if(this.formQueryCallerList.projectNames.length==0){
        delete   json['projectNames'];
      }

    //  return

      console.log(json)
      this.$api.exportBespeakRecord(json).then(function (res) {
        var blob = new Blob([res], {
          type: 'application/vdn.ms-excel'
        });

        let filename = '导出预约数据.xls';
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

     /* this.$requestHttp.post("api/private/1.0/BespeakRecord/exportBespeakRecord",this.fromDataList , res => {
        console.log(res);
        console.log(this.fromDataList)
      })*/
    },
    rest() {//重置
      // this.formQueryCallerList = {
      //   pageNo: 1,//当前页数
      //   conditionCode: '',//选择条件编码
      //   kw: '',//    关键词（归属项目、客户姓名、手机号码、置业顾问）
      //   clickTimeStart: '',//开始时间
      //   clickTimeEnd: '',//结束时间
      //   statuses: [], //客户有效性
      //   cstStatusList: [], //客户类型
      //   projectIdList: [],//归属项目
      //   channelNames: [],//来源渠道
      // }
      this.formQueryCallerList.pageNo =1;
      this.formQueryCallerList.conditionCode ='';
      this.formQueryCallerList.kw = '';
      this.formQueryCallerList.clickTimeStart ='';
      this.formQueryCallerList.clickTimeEnd ='';
      this.formQueryCallerList.startTime ='';
      this.formQueryCallerList.endTime ='';
      this.formQueryCallerList.cstValidityList =[];
      this.formQueryCallerList.cstStatusList =[];
      this.formQueryCallerList.projectIdList =[];
      this.formQueryCallerList.channelList = [];
      this.formQueryCallerList.channelNames = []
      this.formQueryCallerList.projectNames = []
      this.formQueryCallerList.statuses = []

      this.tags = [];
      this.getClickProjectList = []
      this.customer_listChecked = [];
      // 来源渠道
      this.channelChecked = [];
      // 归属项目
      this.ProjectListData = [];
      // 客户有效性
      this.cstTypeLists = [];
      this.establishDate = [];
      this.getOrginfoAndProjectList();
      this.queryCallerListFun();
    },
    getClickProject(res,IScheck,list){
      console.log(res);
      // if(IScheck){
      //   console.log(!isNaN(res.id))
      //   if(!isNaN(res.id)){
      //     this.getClickProjectList.push(res.projectName)
      //   }else {
      //     for (var i = 0; i < this.getClickProjectList.length; i++){
      //       if (this.getClickProjectList[i] === res.projectName) {
      //            this.getClickProjectList.splice(i, 1)
      //          }
      //     }
      //   }

      // }

      if(IScheck){
        if(!isNaN(res.id)){
          this.getClickProjectList.push(res.projectName)
        }
      } else {
        for (var i = 0; i < this.getClickProjectList.length; i++){
          if (this.getClickProjectList[i] === res.projectName) {
               this.getClickProjectList.splice(i, 1)
             }
        }
      }
      this.getClickProjectList =this.unique(this.getClickProjectList);
      console.log(this.getClickProjectList)
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
    getOrginfoAndProjectList() {//归属项目
      // this.dialogVisibleProjectList = true;
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
      })
    },
    getCheckedKeys() {//获取选择的项目
      this.queryCallerListFun();
      console.log(this.getClickProjectList)
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
      // getOrginfoAndProjectList
      this.formQueryCallerList.projectNames = attr;
      this.formQueryCallerList.pageNo = 1;
      this.searchKeyfilterText = '';
      console.log(this.getClickProjectList)
      // this.getClickProjectList=[];
      this.dialogVisibleProjectList = false;
    },
    handleCloseProject(done) {//
      this.$refs.tree.setCheckedKeys([]);
      this.searchKeyfilterText = '';
      this.getClickProjectList=[];
      done();
    },
    //来源渠道
    CheckedChannelAll(val) {
      this.channelChecked = val ? this.channels : [];
      this.isChannel = false;
    },
    CheckedChannel(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.initList.channel.length;
      this.isChannel = checkedCount > 0 && checkedCount < this.initList.channel.length;
    },
    savecChannel() {
      this.channelBox = false;
      this.pushTagesList('来源渠道：' + this.channelChecked, 'channel', this.channelChecked);
      let channelListStr = [];
      for (var i = 0; this.initList.channel.length > i; i++) {
        for (var n = 0; this.channelChecked.length > n; n++) {
          if (this.initList.channel[i].value == this.channelChecked[n]) {
            channelListStr.push(this.initList.channel[i].code);
          }
        }
      }
      this.formQueryCallerList.channelNames = channelListStr;
      this.formQueryCallerList.pageNo=1;
      this.queryCallerListFun();
    },


    //客户有效性
    CheckedCustomer_listAll(val) {
      this.customer_listChecked = val ? this.cstTypeLists : [];
      this.isCustomer_listAll = false;
    },
    CheckedCustomer_list(value) {
      let checkedCount = value.length;
      this.customer_listAll = checkedCount === this.initList.cstValidityList.length;
      this.isCustomer_listAll = checkedCount > 0 && checkedCount < this.initList.cstValidityList.length;
    },
    saveCheckeds() {//任务状态
      this.customer_listBox = false;
      this.pushTagesList('有效性：' + this.customer_listChecked, 'statuses', this.customer_listChecked);
      this.formQueryCallerList.statuses = this.customer_listChecked;
      this.formQueryCallerList.pageNo=1;
      this.queryCallerListFun();
    },


    BespeakRecordKeyword(keyWord) { // 关键字模糊查询
      console.log(this.type);
      console.log(keyWord)
      this.save = keyWord
      this.formQueryCallerList.kw = this.save
      if(keyWord.length>0){
        let kwType = '';
        if (this.type == '全部') {
          kwType = 'all';
        } else if (this.type == '手机号码') {
          kwType = 'phone';
        } else if (this.type == '客户姓名') {
          kwType = 'cstName';
        } else if (this.type == '归属项目') {
          kwType = 'projName';
        } else if (this.type == '置业顾问') {
          kwType = ''
        }
        this.$requestHttp.put("api/private/1.0/BespeakRecord/searchKeyword", {
          kw: keyWord,
          kwType: kwType,
        }, '', res => {
          console.log(res);
          if (res.data.code == 1) {
            console.log('124445')
            console.log(keyWord)
            this.options = res.data.data.data
            console.log(this.options)
            console.log(this.formQueryCallerList.kw)
            this.formQueryCallerList.kw = this.save
            // keyWord = this.save
          }
        })
      }

    },

    init() {//初始化
      this.$api.brListCondtion().then(res => {
        console.log(res);
        this.initList = res;
        for (var i = 0; this.initList.channel.length > i; i++) {
          this.channels.push(this.initList.channel[i].value);
        }
      });
    },
    remoteMethod(query) {//模糊查询
      console.log(query);
      //  this.projectTaskListByLike(query);
    },
    pushTagesList(val, valName, name) {//添加标签
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
    handleClose(tag) {//关闭标签
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'statuses':
          this.customer_listChecked = [];
          this.formQueryCallerList.statuses = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'cstStatusList':
          this.cstStatusListChecked = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'channel':
          this.channelChecked = [];
          this.formQueryCallerList.channelNames = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'intentionalDegreeList':
          this.intentionalDegreeListChecked = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'keyWord':
          this.formQueryCallerList.kw = '';
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'begin_end_date':
          this.formQueryCallerList.clickTimeStart = '';
          this.formQueryCallerList.clickTimeEnd = '';
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break

      }
    },
    handleCurrentChange(val) { //翻页
      console.log(val)
      this.formQueryCallerList.pageNo = val;
      // this.fromDataList.pageNo = val;
      this.queryCallerListFun();
    },
    queryCallerListFun() {//列表
      this.loading = true;
      this.$api.BespeakRecordList(this.formQueryCallerList).then(res => {
        this.loading = false;
        this.listData = res.list;
        this.total = res.count;
         this.rowNowCount =res.rowNowCount;
      });
    },
    callerCustomerDetail(scope) {//详情
      console.log(scope)
      console.log(scope.row.uuid)
      // this.$router.push('/CallDetails/' + scope.row.uuid);
      this.$router.push('/Details/' + scope.row.uuid);
      // this.$router.push('/Details')
    },
    delTags(type) {//删除时间tags
      for (var i = 0; this.tags.length > i; i++) {
        if (this.tags[i].type == type) {
          console.log(type)
          console.log(i)
          this.tags.splice(i, 1)
        }
      }
    },
  },
  watch: {
    establishDate(val) {
      console.log(typeof val)
      console.log(val)
      if (val != null) {
        this.formQueryCallerList.clickTimeStart = val[0];
        this.formQueryCallerList.clickTimeEnd = val[1];
        this.pushTagesList('预约时间：' + val[0] + '至' + val[1], 'begin_end_date', val);
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      } else {
        this.formQueryCallerList.clickTimeStart = '';
        this.formQueryCallerList.clickTimeEnd = '';
        this.establishDate = [];
        this.delTags('begin_end_date');
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      }

    }
  },
};
