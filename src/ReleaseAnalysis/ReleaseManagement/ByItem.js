import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  name: "",
  data() {
    return {
      
      disabledDate(time) {
        //范围为今天以前，不包括今天
        return time.getTime() >
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1).getTime()
      },
      datepicker:[],
      type: "OAP",
      typeOptions: [
        {
          value: "OAP",
          label: "全部"
        },
        {
          value: "pro",
          label: "项目名称"
        },
        {
          value: "org",
          label: "机构名称"
        }
      ],
      
      //载入动画显示
      loading: true,
      // 列表数据
      dataList: [],
      //表单
      
      fromDataList: {
        keywd: "", //关键字模糊搜索
        clickTimeStart: "", //点击开始时间
        clickTimeEnd: "", //点击结束时间
        pageNo: 1,//查询第几页
        pageSize: 10,//每页条数
        tf:true,//推广中
        select:""//选中项
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
      pageType: "",
      placeholder:"查询机构名称，项目名称",
      red:false
    };
  },
  watch:{
    type(value){
      console.log(value)
      if(value == "OAP"){
        this.placeholder = "查询机构名称，项目名称"
      }
      else if(value == "pro") {
        this.placeholder = "查询项目名称"
      }
      else if(value == "org") {
        this.placeholder = "查询机构名称"
      }
    },
    datepicker(val){
      if(val == null){
        this.red = false
      }else if(val !== null){
        if(val[0]&&val[1]){
          this.red = true
        }else{
          this.red = false
        }
      }
    }
  },
  
  methods: {
    manageDate(yesterday){
      if(yesterday){
        this.datepicker = [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1).Format("yyyy-MM-dd"),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1).Format("yyyy-MM-dd")
        ]
      }else{
        this.datepicker = [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).Format("yyyy-MM-dd"),
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).Format("yyyy-MM-dd")
        ]
      }
      
      this.fromDataList.clickTimeStart = this.datepicker[0]
      this.fromDataList.clickTimeEnd = this.datepicker[1]
      this.getList()
    },
    //投放状态改变
    tfOnChange(value){
      this.getList()
    },
    
    //日期选择
    datepickerOnChange(){
      console.log(this.datepicker)
      if(this.datepicker !== null){
        if(this.datepicker[0]&&this.datepicker[1]){
          this.fromDataList.clickTimeStart = this.datepicker[0]
          this.fromDataList.clickTimeEnd = this.datepicker[1]
          this.getList()
        }
        
      }else if(this.datepicker == null){
        this.fromDataList.clickTimeStart = ""
        this.fromDataList.clickTimeEnd = ""
        this.getList()
      }
    },
    //模糊搜索类型变动
    selectOnChange(){
      this.fromDataList.keywd = ""
      this.fromDataList.select = ""
    },
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 下一页
      console.log(val);
      this.fromDataList.pageNo = val;
      this.currentPage = val
      this.getList();
    },
  
  
    //模糊查询
    inputOnChange(queryString,callback) {
      console.log(queryString,"1111")
      this.fromDataList.select=""
      this.$requestHttp.put(
        "api/private/1.0/deliveryStatistics/getQueryCriteria", {
          type: this.type,
          likeName: queryString
        }, '', res => {
          if (res.data.code == 1) {
            console.log(res.data.data)
            callback(res.data.data)
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //模糊匹配选择
    inputOnSelect(item){
      console.log(item)
      this.fromDataList.select = item
      this.getList(true)
    },
    
    //查询预约列表
    getList(fresh) {
      if(fresh){
        this.pageNo = 1
        this.fromDataList.pageNo = 1
        this.currentPage = 1
      }
      this.loading = true;
      let params = {
        pageSize: this.fromDataList.pageSize,
        pageNo: this.fromDataList.pageNo,
        beginDate:this.fromDataList.clickTimeStart,
        endDate:this.fromDataList.clickTimeEnd,

        likeName:this.type == "OAP" ? this.fromDataList.keywd : "",
        likeProjectName:this.type == "pro" ? (this.fromDataList.keywd) : "",
        projectId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.type == "projectId" ? this.fromDataList.select.id:""),
        likeOrgName:this.type == "org" ? (this.fromDataList.keywd) : "" ,
        orgId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.type == "orgId" ? this.fromDataList.select.id:""),
        tf:this.fromDataList.tf?1:0
      }
      this.$requestHttp.put(
        "api/private/1.0/deliveryStatistics/searchInfoByProject", params, '', res => {
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
  
    
    //规范事件格式
    configTime() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }
      console.log(this.filters.time);
    },
    
     // 导出预约列表
     customerExport() {
     
    },
    //radio按钮,重置
    getReset() {
      this.fromDataList = {
          keywd: "", //关键字模糊搜索
          clickTimeStart: "", //点击开始时间
          clickTimeEnd: "", //点击结束时间
          pageNo: 1,//查询第几页
          pageSize: 10,//每页条数
          tf:true,//推广中
          select:""
      },
      this.pageNo = 1
      this.currentPage = 1
      this.datepicker = []
      this.pageType = ""
      this.type = "OAP",
      this.getList()
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
  },
  mounted() {
    this.getList();
    
  }
};
