import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  data() {
    return {
      callType: this.$route.params.callType,//来电切换
      type: '全部',
      initList: '',//初始化數據

      //表单
      formQueryCallerList: {
        pageNo: 1,//当前页数
        callType: '0',//来电类型 0未打，1已接通，2未接通
        conditionCode: '',//选择条件编码
        keyWord: '',//    关键词（归属项目、客户姓名、手机号码、置业顾问）
        startTime: '',//开始时间
        endTime: '',//结束时间
        cstValidityList: [], //客户有效性
        cstStatusList: [], //客户类型
        projectIdList: [],//归属项目
        channelList: [],//来源渠道
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
      getClickProjectList:[],

    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
  created() {
    this.init();
    console.log(this.$route.params.callType);
    if (this.$route.params.callType == 'connected') {
      this.formQueryCallerList.callType = '1';
      console.log(this.formQueryCallerList)
      this.queryCallerListFun();
    } else if (this.$route.params.callType == 'unConnected') {
      this.formQueryCallerList.callType = '2';
      this.queryCallerListFun();
    } else if (this.$route.params.callType == 'notDialing') {
      this.formQueryCallerList.callType = '0';
      this.queryCallerListFun();
    } else if (this.$route.params.callType == 'all') {
      this.formQueryCallerList.callType = '';
      this.queryCallerListFun();
    }
    // this.queryCallerListFun();
    this.getOrginfoAndProjectList();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  methods: {
     //录音
    callerGetRecord(scope) {
      console.log(scope);
      this.$requestHttp.put("api/private/1.0/caller/getRecord", {
        recordId: scope.row.uuid,
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          this.recordInfo = res.data.data.recordInfo;
        }
      })

    },
    configuration(scope){ //补录
        //this.recording=true;
    },
    rest() {//重置
      this.formQueryCallerList = {
        pageNo: 1,//当前页数
        callType: '0',//来电类型 0未打，1已接通，2未接通
        conditionCode: '',//选择条件编码
        keyWord: '',//    关键词（归属项目、客户姓名、手机号码、置业顾问）
        startTime: '',//开始时间
        endTime: '',//结束时间
        cstValidityList: [], //客户有效性
        cstStatusList: [], //客户类型
        projectIdList: [],//归属项目
        channelList: [],//来源渠道
      }
      this.queryCallerListFun();
    },
    getClickProject(res,IScheck,list){
      console.log(res);
      if(IScheck){
        console.log(!isNaN(res.id))
        if(!isNaN(res.id)){
          this.getClickProjectList.push(res.projectName)
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
      this.formQueryCallerList.channelList = attr;
      this.dialogVisibleProjectList = false;
      this.queryCallerListFun();
      this.searchKeyfilterText = '';
      this.getClickProjectList=[];
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
      })
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
      this.formQueryCallerList.channelList = channelListStr;
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
      this.pushTagesList('客户类型：' + this.customer_listChecked, 'cstValidityList', this.customer_listChecked);
      this.formQueryCallerList.cstValidityList = this.customer_listChecked;
      this.queryCallerListFun();
    },


    BespeakRecordKeyword(keyWord) { // 关键字模糊查询
      console.log(this.type);
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
          this.options = res.data.data.data
        }
      })
    },

    init() {//初始化
      this.$api.callerListCondition().then(res => {
        console.log(res);
        this.initList = res;

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
        case 'cstValidityList':
          this.customer_listChecked = [];
          this.formQueryCallerList.cstValidityList = [];
          this.queryCallerListFun();
          break
        case 'cstStatusList':
          this.cstStatusListChecked = [];
          this.queryCallerListFun();
          break
        case 'channel':
          this.channelChecked = [];
          this.formQueryCallerList.channelList = [];
          this.queryCallerListFun();
          break
        case 'intentionalDegreeList':
          this.intentionalDegreeListChecked = [];
          this.queryCallerListFun();
          break
        case 'keyWord':
          this.formQueryCallerList.keyWord = '';
          this.queryCallerListFun();
          break

      }
    },
    changeCallType(val) {//来电类型切换
      this.$router.push('/CallerRecord/' + val);
    },
    handleCurrentChange(val) { //翻页
      console.log(val)
      this.formQueryCallerList.pageNo = val;
      this.queryCallerListFun();
    },
    queryCallerListFun() {//来电列表
      this.loading = true;
      this.$api.queryCallerList(this.formQueryCallerList).then(res => {
        this.loading = false;
        this.listData = res.list;
        this.total = res.count;
      });
    },
    callerCustomerDetail(index) {//详情
      this.$router.push('/CallDetails/' + index.row.uuid);
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
    '$route'(to, from) {
      // 0未打，1已接通，2未接通
      if (to.params.callType == 'connected') {
        this.formQueryCallerList.callType = '1';
        console.log(this.formQueryCallerList)
        this.queryCallerListFun();
      } else if (to.params.callType == 'unConnected') {
        this.formQueryCallerList.callType = '2';
        this.queryCallerListFun();
      } else if (to.params.callType == 'notDialing') {
        this.formQueryCallerList.callType = '0';
        this.queryCallerListFun();
      } else if (to.params.callType == 'all') {
        this.formQueryCallerList.callType = '';
        this.queryCallerListFun();
      }
    },
    establishDate(val) {
      console.log(typeof val)
      console.log(val)
      if (val != null) {
        this.formQueryCallerList.startTime = val[0];
        this.formQueryCallerList.endTime = val[1];
        this.pushTagesList('创建时间：' + val[0] + '至' + val[1], 'begin_end_date', val);
        this.queryCallerListFun();
      } else {
        this.formQueryCallerList.startTime = '';
        this.formQueryCallerList.endTime = '';
        this.establishDate = [];
        this.delTags('begin_end_date');
        this.queryCallerListFun();
      }

    }
  },
};
