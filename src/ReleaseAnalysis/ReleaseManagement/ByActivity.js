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
      type: "0",
      typeOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "投放活动"
        },
        {
          value: "2",
          label: "项目名称"
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
      placeholder:"查询投放活动，项目名称",
      red:false,
      fullscreenLoading:false
    };
  },
  watch:{
    type(value){
      console.log(value)
      if(value == "0"){
        this.placeholder = "查询投放活动，项目名称"
      }
      else if(value == "1") {
        this.placeholder = "查询投放活动"
      }
      else if(value == "2") {
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
      this.getList(true)
    },
    //投放状态改变
    tfOnChange(value){
      this.getList(true)
    },
    
    //日期选择
    datepickerOnChange(){
      console.log(this.datepicker)
      if(this.datepicker !== null){
        if(this.datepicker[0]&&this.datepicker[1]){
          this.fromDataList.clickTimeStart = this.datepicker[0]
          this.fromDataList.clickTimeEnd = this.datepicker[1]
          this.getList(true)
        }
        
      }else if(this.datepicker == null){
        this.fromDataList.clickTimeStart = ""
        this.fromDataList.clickTimeEnd = ""
        this.getList(true)
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
        "api/private/1.0/deliveryStatistics/fetchProjectArchivesSearchList", {
          selectType: this.type,
          keyword: queryString
        }, '', res => {
          if (res.data.code == 1) {
            console.log(res.data.data)
            callback(res.data.data.data)
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
        searchStartDate:this.fromDataList.clickTimeStart,
        searchEndDate:this.fromDataList.clickTimeEnd,
  
        searchKey:this.type == "0" ? this.fromDataList.keywd : "",
        tfSearchKey:this.type == "1" ? (this.fromDataList.keywd) : "",
        tfId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.source == "投放活动" ? this.fromDataList.select.id+"":""),
        projectSearchKey:this.type == "2" ? (this.fromDataList.keywd) : "" ,
        projectId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.source == "项目名称" ? this.fromDataList.select.id:""),
        delivering:this.fromDataList.tf
      }
      this.$requestHttp.put(
        "api/private/1.0/deliveryStatistics/searchInfoByProjectArchives", params, '', res => {
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
      let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).Format("yyyy-MM-dd")
      if(this.fromDataList.clickTimeStart == today && this.fromDataList.clickTimeEnd == today){
        this.$confirm(`暂时不支持导出今天的数据`, '提示', {
          confirmButtonText: '知道了',
          showCancelButton:false,
          type: 'warning'
        }).then(() => {
        
        }).catch(() => {
        
        });
      } else{
        this.fullscreenLoading = true
        let params = {
          searchStartDate:this.fromDataList.clickTimeStart,
          searchEndDate:this.fromDataList.clickTimeEnd,
    
          searchKey:this.type == "0" ? this.fromDataList.keywd : "",
          tfSearchKey:this.type == "1" ? (this.fromDataList.keywd) : "",
          tfId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.source == "投放活动" ? this.fromDataList.select.id+"":""),
          projectSearchKey:this.type == "2" ? (this.fromDataList.keywd) : "" ,
          projectId:this.fromDataList.select == "" ? "" : (this.fromDataList.select.source == "项目名称" ? this.fromDataList.select.id:""),
          delivering:this.fromDataList.tf
        }
        let _this = this
        this.$requestHttp.put(
          "api/private/1.0/deliveryStatistics/exportProjectArchivesStatic", params, '', res => {
            console.log(res);
            if (res.data.data.code == 1) {
              this.fullscreenLoading = false
              var url = `api/private/1.0/deliveryStatistics/importExcle?type=${res.data.data.type}&name=${res.data.data.name}`
              window.location.href = _this.GLOBAL.config.exportH+url;
              console.log(url)
            }
          },
          error => {
            console.log(error);
          }
        );
      }
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
      this.type = "0",
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
    console.log(this.$route.meta)
  }
};
