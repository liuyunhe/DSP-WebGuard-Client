import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  name: "",
  data() {
    return {
      bespeakRecordInfo: [],
      bespeakRecordId: this.$route.params.uuid,
      mobilePhone: '',
      fromDataList: {
        channelNames: "", //来源渠道列表
        pName: "", //项目名模糊搜索
        cstName: "", //用户名模糊搜索
        mobilePhone: "", //手机号码模糊搜索
        keywd: "", //关键字模糊搜索
        cName: "", //渠道模糊搜索
        consultantName: "", //归属职业顾问模糊搜索
        projectNames: "", //项目名列表
        statuses: "", //状态列表
        clickTime:'',
        clickTimeStart: "", //点击开始时间
        clickTimeEnd: "", //点击结束时间
        pageNo: 1 //查询第几页
      },
      //table内容
      pageList: [],
      //数据总条数
      total: 0,
      //分页器当前选中页码
      currentPage: 1,
      //每页显示条数
      pageSize: 10,
      //查询页码
      pageNo: 1,
      sels: [], //列表选中列
      pageType: "",
      uuid: '',
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    console.log("设置下一个路由的 meta")
    console.log(to.matched[0].path=='/Details/:uuid')
    console.log(from)
    if(to.matched[0].path=='/Details/:uuid'){
      to.meta.keepAlive = false;
    }else{
      to.meta.keepAlive = true; // 让 A 缓存，即不刷新
    }
    next();
  },
  methods: {
    link(parent){
      console.log(parent)
      window.open(parent);
  },
   //查询预约列表
   getList() {
    this.loading = true;
    this.$requestHttp.put("api/private/1.0/BespeakRecord/list", {
        pageSize: this.fromDataList.pageSize,
        pageNo: this.fromDataList.pageNo
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          this.dataList = res.data.data.list;
          this.total = res.data.data.count;
          this.pageSize = res.data.data.pageSize;
          this.pageNo = res.data.data.pageNo;
          this.loading = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  },
     //查询预约记录详情
    getBespeakRecordInfo() {
      this.$requestHttp.put("api/private/1.0/BespeakRecord/info", {
        bespeakRecordId: this.bespeakRecordId,
      }, '', res =>{
        console.log(res);
        if (res.data.code == 1) {
          this.bespeakRecordInfo = res.data.data.bespeakRecordInfo;
          console.log("点击时间")
          console.log(bespeakRecordInfo.clickTime)
          console
          console.log(bespeakRecordInfo.createTime)
          console.log("预约详情bespeakRecordId")
          console.log(this.bespeakRecordId)
        }

      })
    },
    ReservationRecord(scope) {
      this.$router.push('./ReservationRecord')
    },
    //规范事件格式
    confirm() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }
      console.log(this.filters.time);
    },
    //超过十个字添加title属性
    istitle(value) {
      if (value) {
        if (value.legth > 5) {
          return value;
        } else {
          return "";
        }
      }
    },
  },
  mounted() {
    this.getBespeakRecordInfo();
  }
};
