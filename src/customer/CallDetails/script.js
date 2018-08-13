import footerA from "../../components/common/footer.vue"; //底部
export default {
  components:{
    footerA
  },
  name: "",
  data() {
    return {
      uuid: this.$route.params.uuid,
      //载入动画显示
      listLoading: false,
      callerDetail: [],
      bespeakInfo: '',
      cstInfo: '',
      //表单
      filters: {
        status: "0",
        type: "name",
        search: "",
        time: []
      },
      cstName: '',
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
  methods: {
    link(parent){
      console.log(parent)
      window.open(parent);
  },
    // 来电详情
    CallerRecord() {
      this.$router.push('/CallerRecord/callType')
    },
    callerCustomerDetail() {
      this.$requestHttp.put("api/private/1.0/caller/callerCustomerDetail", {
        uuid: this.uuid,
      }, '', res => {
        console.log(res)
        if (res.data.code == 1){
          console.log('112');
          this.callerDetail = res.data.data.callerDetail;
          this.bespeakInfo = res.data.data.bespeakInfo;
          this.cstInfo = res.data.data.cstInfo;
        }
      },error => {
        console.log(error)
      })
    },
    //删除标签
    deleteTag() {
      this.pageType = "";
      this.search.pageType = this.pageType;
      // this.postSearch();
    },
    //规范事件格式
    configTime() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }
      console.log(this.filters.time);
    },
    //获取用户列表
    getUsers() {
      this.configTime();
      let para = {
        pageSize: 10,
        pageNo: this.page,
        status: this.filters.status,
        name: this.filters.name,
        beginDate: this.filters.time[0],
        endDate: this.filters.time[1],
        pageType: this.pageType,
        [this.filters.type]: this.filters.search
      };
      this.search = para;
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
      this.getUsers();
    },
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
      this.getUsers();
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
  created(){
    this.callerCustomerDetail();
    console.log(this.$route.params)
  }
};
