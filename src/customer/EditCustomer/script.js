import footerA from "../../components/common/footer.vue"; //底部
export default {
  components:{
    footerA
  },
  name: "",
  data() {
    return {
      value: '',
      bespeakId: this.$route.params.bespeakId,
      clientId: this.$route.params.clientId,
      projectId: this.$route.params.projectId,
      cstInfo: [],
      needInfo: [],
      sexList: [],// 性别下拉
      occupaTionList: [],//客户职业下拉
      rztjList: [],//认知途径下拉
      needTypeList: [],//需求类型下拉
      ageList: [],//年龄下拉
      needHuixingList: [],//需求户型下拉
      homePurposeList: [],//置业目的下拉
      payList: [],//付款方式下拉
      intentionalDegreeList: [],//意向程度下拉
      //编辑
      form:{
        cstName:'',
        cstSex:'',
        // workArea: '',工作区域
        cstWorkArea: '',
        mobilePhone: '',
        collectionMethod: '',
        cstOccupaTion: '',
        cstTraffic: '',
        cognitiveApproach: '',
        projectName: '',
        cstAge: '',
        cstStatus: '',
        cstHomeArea: '',
        mobileCity: '',
        needType: '',
        yxFangXing: '',
        needPay: '',
        needPurchase: '',
        needUnitPrice: '',
        intentionalDegree: '',
        needArea: '',
        remark: '',
        consultantName: '',
        clientId: this.$route.params.clientId,
        bespeakId: this.$route.params.bespeakId,
        projectId: this.$route.params.projectId,
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta

    if(to.matched[0].path=='/CustomerDetails/:bespeakId/:clientId/:projectId'){
      to.meta.keepAlive = false;
    }else{
      to.meta.keepAlive = true; // 让 A 缓存，即不刷新
    }
    next();
  },
  methods: {
    CustomerDetails() {
      this.$router.push({path: '/CallDetails'})
    },
    // 编辑客户(初始化)
    customerUpdateInit() {
    this.$requestHttp.put("api/private/1.0/customer/customerUpdateInit", {
      bespeakId: this.bespeakId,
      clientId: this.clientId,
      projectId: this.projectId
    }, '', res => {
      console.log(res);
      if (res.data.code == 1) {
        this.needInfo = res.data.data.needInfo;
        this.sexList = res.data.data.sexList;
        console.log(this.sexList);
        this.occupaTionList = res.data.data.occupaTionList;
        this.needTypeList = res.data.data.needTypeList;
        this.rztjList = res.data.data.rztjList;
        this.cstInfo = res.data.data.cstInfo;
        this.homePurposeList = res.data.data.homePurposeList;
        this.payList = res.data.data.payList;
        this.needHuixingList = res.data.data.needHuixingList;
        this.ageList = res.data.data.ageList;
        this.intentionalDegreeList = res.data.data.intentionalDegreeList;
      }
    }, error => {
      console.log(error)
    })
  },
  //保存
  customerUpdate() {
    this.$requestHttp.put("api/private/1.0/customer/customerUpdate", this.form, '', res => {
      console.log(res);
      if (res.data.code == 1) {
        this.retDesc = res.data.retDesc;
        this.retCode = res.data.retCode;
        // this.form = res.data.form;
      }
    }, error => {
      console.log(error)
    })
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
            this.form.cstName=res.data.data.cstInfo.cstName;
            this.form.cstSex =res.data.data.cstInfo.gender;
            console.log(this.form)
            // this.form.cstWorkArea = res.data.data.cstInfo.cstWorkArea;
            this.form.cstWorkArea = res.data.data.cstInfo.workArea;
            this.form.mobilePhone = res.data.data.cstInfo.mobilePhone;
            this.form.collectionMethod = res.data.data.cstInfo.collectionMethod;
            this.form.cstOccupaTion = res.data.data.cstInfo.workType;
            this.form.cstTraffic = res.data.data.cstInfo.transportationTypeName;
            this.form.cognitiveApproach = res.data.data.cstInfo.cognitiveApproach;
            this.form.projectName = res.data.data.cstInfo.projectName;
            this.form.cstAge = res.data.data.cstInfo.ageGroup;
            this.form.consultantName = res.data.data.cstInfo.consultantName;
            this.form.cstStatus = res.data.data.cstInfo.cstStatus;
            this.form.cstHomeArea = res.data.data.cstInfo.homeArea;
            this.form.mobileCity = res.data.data.cstInfo.mobileCity;
            this.form.consultantName = res.data.data.cstInfo.consultantName;
            this.form.needType = res.data.data.needInfo.needType;
            this.form.yxFangXing = res.data.data.needInfo.yxFangXing;
            this.form.needPay = res.data.data.needInfo.payWay;
            this.form.needPurchase = res.data.data.needInfo.purpose;
            this.form.needUnitPrice = res.data.data.needInfo.budgetUnit;
            this.form.intentionalDegree = res.data.data.needInfo.intentionalDegree;
            this.form.needArea = res.data.data.needInfo.yxArea;
            this.form.remark = res.data.data.needInfo.remark;
            this.loading =false;
       }
     },error =>{
       console.log(error)
     })
   },
    //删除标签
    deleteTag() {
      this.pageType = "";
      this.search.pageType = this.pageType;
    },
    //规范事件格式
    configTime() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }
      console.log(this.filters.time);
    },
    //查询按钮
    commitForm() {
      this.page = 1;
      this.currentPage = 1;
      this.getUsers();
    },
    //radio按钮,重置
    getStatus() {
      this.filters.type = "name";
      this.filters.search = "";
      this.filters.time = [];
      this.page = 1;
      this.currentPage = 1;
      this.pageType = "";
    },
    //跳转按钮功能
    jumpTo() {
      this.$emit("current-change");
    },
    //超过十个字添加title属性
    istitle(value) {
      if (value) {
        if (value.length >= 10) {
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
    //预览按钮
    previewLandingPage(item) {
      console.log(item.uuid);
      window.open(`${URL_ROOT}/api/private/1.0/page/preview/${item.uuid}`);
    },
    //编辑功能
    editLandingpage(item) {
      console.log(item);
      this.$store.commit("setLandingPageId", item.uuid);
      this.$router.push({ path: "/MessageSetting" });
    }
  },
  created() {
    this.customerUpdateInit();
   // this.customerUpdate();
    this.getQueryCustomerData();
  }
};
