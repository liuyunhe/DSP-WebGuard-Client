import footerA from "../../components/common/footer.vue"; //底部
export default {
  components:{
    footerA
  },
  name: "",
  data() {
    return {

      //錄音
      recording: false,
      // 来电
      ctoBhaCalls: false,
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
      //来访
      ctoBhaVisits: false,
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
      //预约
      bespeakRecords: false,
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
      //签约
      ctoBhaSigns: false,
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
      //认购
      ctoBhaBuys: false,
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
      //认筹
      ctoBhaSureBuys: false,
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
      // 详情（客户详情参数）
      bespeakId: this.$route.params.bespeakId,
      clientId: this.$route.params.clientId,
      projectId: this.$route.params.projectId,

      //进度详情
      cId: '',
      contactType: '',

      //载入动画显示
      loading: false,
      //进度记录
      ctoBhaTouchList: [],
      //通话记录
      callList: [],
      needInfo: [],
      bespeakInfo: [],
      cstInfo: [],
      cstName: '',
      //表单
      filters: {
        status: "0",
        type: "name",
        search: "",
        time: []
      },
      formGetQueryCustomerData: {
        channelNames: '',//来源渠道列表
        pName: '',//项目名模糊搜索
        cstName: '',//用户名模糊搜索
        mobilePhone: '',//手机号码模糊搜索
        keywd: '',//关键字模糊搜索
        cName: '',//渠道模糊搜索
        consultantName: '',//归属职业顾问模糊搜索
        projectNames: '',//项目名列表
        statuses: '',//状态列表
        clickTimeStart: '',//点击开始时间
        clickTimeEnd: '',//点击结束时间
        pageNo: 1,//查询第几页
      },

      bespeakRecord: [],//预约详情
      ctoBhaVisit: [],//来访详情
      ctoBhaSureBuy: [],//认筹详情
      ctoBhaBuy: [],//认购详情
      ctoBhaSign: [],//签约详情
      ctoBhaCall: [],//来电详情

      //录音
      recordId: '',
      recordInfo: [],
      recordFile: '',



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
      pageType: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    console.log(to.matched[0].path=='/EditCustomer/:bespeakId/:clientId/:projectId')
    console.log(from)
    if(to.matched[0].path=='/EditCustomer/:bespeakId/:clientId/:projectId'){
      to.meta.keepAlive = false;
    }else{
      to.meta.keepAlive = true; // 让 A 缓存，即不刷新
    }
    next();
  },
  methods: {
    // 编辑客户
    EditCustomer() {
    this.$router.push({path: '/EditCustomer/'+this.bespeakId+'/'+this.clientId+'/'+this.projectId})
    },
    // 返回
    CustomerList() {
      this.$router.push({path: '/CustomerList'})
    },
    link(parent){
      console.log(parent)
      window.open(parent);
  },
    // 客户详情
    getQueryCustomerData() {
      this.loading = true;
       this.$requestHttp.put("api/private/1.0/customer/queryCustomerData", {
        bespeakId: this.bespeakId,
        clientId: this.clientId,
        projectId: this.projectId
       }, '', res => {
         console.log(res);
         if (res.data.code == 1) {
           this.retCode = res.data.data.retCode;
           this.retDesc = res.data.data.retDesc;
           this.needInfo = res.data.data.needInfo;
           this.bespeakInfo = res.data.data.bespeakInfo;
           this.cstInfo = res.data.data.cstInfo;
           this.callList = res.data.data.callList;
           this.ctoBhaTouchList = res.data.data.ctoBhaTouchList
           this.loading =false;
         }
       },error =>{
         console.log(error)
       })
     },

     //进度记录详情
     getQueryProgressDetail(scope) {
       console.log(scope);
       this.$requestHttp.put("api/private/1.0/customer/queryProgressDetail", {
        cId: scope.row.cId,
        contactType: scope.row.contactType,
        bespeakId: this.bespeakId
       }, '', res => {
         console.log(res);
         if (res.data.code == 1) {
            console.log(scope.row.contactTypeName)
            if(scope.row.contactTypeName=='预约'){
              this.bespeakRecords=true;
              this.bespeakRecord = res.data.data.bespeakRecord;
              console.log(this.bespeakRecord);
            }else if(scope.row.contactTypeName=='签约'){
              this.ctoBhaSign = res.data.data.ctoBhaSign;
              console.log(this.ctoBhaSign);
              this.ctoBhaSigns=true;
            }else if(scope.row.contactTypeName=='来访'){
              this.ctoBhaVisit = res.data.data.ctoBhaVisit;
              console.log(this.ctoBhaVisit);
              this.ctoBhaVisits=true;
            }else if(scope.row.contactTypeName=='认购'){
              this.ctoBhaBuy = res.data.data.ctoBhaBuy;
              console.log(this.ctoBhaBuy);
              this.ctoBhaBuys=true;
            }else if(scope.row.contactTypeName=='来电'){
              this.ctoBhaCall = res.data.data.ctoBhaCall;
              console.log(this.ctoBhaCall);
              this.ctoBhaCalls=true;
            }else if(scope.row.contactTypeName=='认筹') {
              this.ctoBhaSureBuy = res.data.data.ctoBhaSureBuy;
              console.log(this.ctoBhaSureBuy);
              this.ctoBhaSureBuys = true;
            }
         }
       })
     },

     //录音功能
     getCdrRecord(scope) {
       console.log(scope);
       this.$requestHttp.put("api/private/1.0/customer/getCdrRecord", {
        recordId:this.bespeakId,
        cId: scope.row.cId,
        recordFile: scope.row.recordFile
       }, '', res => {
         console.log(res);
         if (res.data.code == 1) {
           this.recordInfo = res.data.data.recordInfo;
           console.log(this.recordInfo);
         }

       })
     }
  },
  created(){
    this.getQueryCustomerData();
    console.log(this.$route.params)

  }
};
