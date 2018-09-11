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
        callType: '0',//来电类型 0未打，1已接通，2未接通 3 全部
        conditionCode: '',//选择条件编码
        keyWord: '',//    关键词（归属项目、客户姓名、手机号码、置业顾问）
        startTime: '',//开始时间
        endTime: '',//结束时间
        cstValidityList: [], //客户有效性
        cstStatusList: [], //客户类型
        projectIdList: [],//归属项目
        channelList: [],//来源渠道
        isNoOwnership:''
      },
      isNoOwnership:false,
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
      cupProjectList:[],

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
      newlyNumber: 0, // 今日新增
      //分页器当前选中页码
      currentPage: 1,
      //每页显示条数
      pageSize: 0,
      //查询页码
      page: 1,
      sels: [], //列表选中列
      pageType: "",
      getClickProjectList: [],
      calldel: false,
      save:''
    };
  },
  destroyed() {
    console.log(this.tags)
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
    this.tags = []
  },

  created() {


    console.log('来电记录')
    console.log(this.$route.params.callType);
    this.init();
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
      this.formQueryCallerList.callType = '3';
      this.queryCallerListFun();
    }

      //   this.formQueryCallerList.pageNo = Number(localStorage.getItem('Calldetails'))

      //   if(this.calldel == false){
      //     this.formQueryCallerList.pageNo =Number(localStorage.getItem('Calldetails'))
      //     console.log("点击详情后的页码")
      //     console.log(this.currentPage)
      //  }else{
      //   this.formQueryCallerList.pageNo = 1
      //   }


    // click_detail() {
    //   this.xqing = true
    //   console.log("本地存储")
    //   let xq = localStorage.setItem('xq', this.currentPageS)
    // }

    this.getOrginfoAndProjectList();
    this.queryCallerListFun()
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
        callType:this.formQueryCallerList.callType,
        keyWord:this.formQueryCallerList.keyWord, //模糊搜索
        startTime: this.formQueryCallerList.startTime, //点击开始时间
        endTime: this.formQueryCallerList.endTime, //点击结束时间
        cstValidityList:this.formQueryCallerList.cstValidityList,
        cstStatusList:this.formQueryCallerList.cstStatusList,
        projectIdList:this.formQueryCallerList.projectIdList,
        channelList:this.formQueryCallerList.channelList,
      }



      //  return

      console.log(json)
      this.$api.exportCallerList(json).then(function (res) {
        var blob = new Blob([res], {
          type: 'application/vdn.ms-excel'
        });

        let filename = '导出来电数据.xls';
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
        this.recording=true;
    },
    rest() {//重置
      this.formQueryCallerList.pageNo =1;
      this.formQueryCallerList.conditionCode ='';
      this.formQueryCallerList.keyWord ='';
      this.formQueryCallerList.startTime ='';
      this.formQueryCallerList.endTime ='';
      this.formQueryCallerList.cstValidityList =[];
      this.formQueryCallerList.cstStatusList =[];
      this.formQueryCallerList.projectIdList =[];
      this.formQueryCallerList.channelList = [];
      //this.$refs.tree.setCheckedKeys([]);
      this.tags=[];
      this.channelChecked=[];
      this.customer_listChecked=[];
      this.establishDate = [];
      this.isNoOwnership = false
/*
      this.$router.push('/CallerRecord/all');
      this.callType ='all'*/
      this.getOrginfoAndProjectList()
      this.getClickProjectList = [];
      // this.$refs.tree.setCheckedKeys([]);
      this.formQueryCallerList.isNoOwnership = '0'
      this.queryCallerListFun();
    },
    getClickProject(res,IScheck,list){
      console.log(res);
       this.Tres = IScheck
      console.log(IScheck)
      console.log(list)



      console.log(this.$refs.tree.getCurrentKey())
      console.log(this.$refs.tree.getCurrentNode())

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
      // if (IScheck == false && list == false) {
      //   this.getClickProjectList.splice(1, res.projectName)
      //   this.getClickProjectList = []
      // }
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
    getCurrentChange(res,node){
      console.log(res)
      console.log(node)
    },
    getCheckedKeys() {//获取选择的项目
      console.log(this.$refs.tree)
      console.log(this.$refs.tree.getCheckedKeys());
      let id = this.$refs.tree.getCheckedKeys();
      let attr = [];
      for (let i = 0; id.length > i; i++) {
        if (isNaN(id[i])) {
          attr.push(id[i])
        }
      }
      console.log(attr);
      console.log(this.getClickProjectList)

      this.formQueryCallerList.projectIdList = attr;
      this.dialogVisibleProjectList = false;
      this.formQueryCallerList.pageNo=1;
      this.searchKeyfilterText = '';
      // this.getClickProjectList=[];
      this.queryCallerListFun();
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
      // this.$refs.tree.setCheckedKeys([]);
      this.searchKeyfilterText = '';
     // this.getClickProjectList=[];
      done();
    },
    //来源渠道
    CheckedChannelAll(val) {
      this.channelChecked = val ? this.channels : [];
      console.log(this.channelChecked);
      console.log(this.channels)
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
      this.pushTagesList('客户有效性：' + this.customer_listChecked, 'cstValidityList', this.customer_listChecked);
      this.formQueryCallerList.cstValidityList = this.customer_listChecked;
      this.formQueryCallerList.pageNo=1;
      this.queryCallerListFun();
    },


    BespeakRecordKeyword(keyWord) { // 关键字模糊查询
      console.log(this.type);
      this.save = keyWord
      this.formQueryCallerList.keyWord = this.save
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
        callType:this.formQueryCallerList.callType
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          console.log('124445')
          this.options = res.data.data.data
          this.formQueryCallerList.keyWord = this.save
        }
      })
    },

    init() {//初始化
      this.$api.callerListCondition().then(res => {
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
        case 'cstValidityList':
          this.customer_listChecked = [];
          this.formQueryCallerList.cstValidityList = [];
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
          this.formQueryCallerList.channelList = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'intentionalDegreeList':
          this.intentionalDegreeListChecked = [];
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'keyWord':
          this.formQueryCallerList.keyWord = '';
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
        case 'begin_end_date':
          this.formQueryCallerList.startTime = '';
          this.formQueryCallerList.endTime = '';
          this.formQueryCallerList.pageNo=1;
          this.queryCallerListFun();
          break
      }
    },
    handleCloseBox(){
      this.recording =false;
      var audio =document.querySelector('#audio');
        audio.pause();
        audio.currentTime = 0;
    },
    changeCallType(val) {//来电类型切换切换
      this.$router.push('/CallerRecord/' + val);
      this.tags = []
      // this.queryCallerListFun()
      // this.BespeakRecordKeyword()
      this.isNoOwnership=false;
      this.rest();
      this.formQueryCallerList.keyWord = ''
      this.formQueryCallerList.isNoOwnership = '0';
    },
    handleCurrentChange(val) { //翻页
      console.log(val)
      this.formQueryCallerList.pageNo = val;
      this.queryCallerListFun();
    },
    Nochange() {
      if(this.isNoOwnership){
        this.formQueryCallerList.isNoOwnership = '1';
        console.log(this.formQueryCallerList.isNoOwnership)
        this.queryCallerListFun()
    }else{
        this.formQueryCallerList.isNoOwnership = '0';
        console.log(this.formQueryCallerList.isNoOwnership)
        this.queryCallerListFun()

    }
    },
    queryCallerListFun() {//来电列表
      this.loading = true;
      // console.log()
      // if(this.isNoOwnership){
      //     this.formQueryCallerList.isNoOwnership ='1';
      // }else{
      //    this.formQueryCallerList.isNoOwnership ='0';
      // }
      this.$api.queryCallerList(this.formQueryCallerList).then(res => {
        for (var i = 0; i < res.list.length; i++){
          if (res.list[i].projectName == "中天未来方舟【偶寓】中天未来方舟【偶寓】") {
            res.list[i].projectName = "中天未来方舟【偶寓】"
          }
        }
        console.log(res)
        console.log(12345)
        this.loading = false;
        this.listData = res.list;
        this.total = res.count;
        this.newlyNumber = res.rowNowCount
      });
    },
    callerCustomerDetail(index) {//详情
      // this.calldel = true
    //   console.log("本地存储")
      // let Calldetails = localStorage.setItem('Calldetails', this.formQueryCallerList.pageNo)
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
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      } else if (to.params.callType == 'unConnected') {
        this.formQueryCallerList.callType = '2';
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      } else if (to.params.callType == 'notDialing') {
        this.formQueryCallerList.callType = '0';
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      } else if (to.params.callType == 'all') {
        this.formQueryCallerList.callType = '3';
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      }
    },
    establishDate(val) {
      console.log(typeof val)
      console.log(val)
      if (val != null) {
        this.formQueryCallerList.startTime = val[0];
        this.formQueryCallerList.endTime = val[1];
        this.pushTagesList('来电时间：' + val[0] + '至' + val[1], 'begin_end_date', val);
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      } else {
        this.formQueryCallerList.startTime = '';
        this.formQueryCallerList.endTime = '';
        this.establishDate = [];
        this.delTags('begin_end_date');
        this.formQueryCallerList.pageNo=1;
        this.queryCallerListFun();
      }

    }
  },
};
