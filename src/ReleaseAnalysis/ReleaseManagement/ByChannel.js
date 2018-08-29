import footerA from "../../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  name: "",
  data() {
    return {
      onPick:function ({ maxDate, minDate }) {
        console.log(maxDate,minDate)
      },
      disabledDate(time) {
        //范围为今天以前，不包括今天
        return time.getTime() >
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1).getTime()
      },
      type: "1",
      kw: '',
      kwType: '',
      brListCondtionList: '',
      terminaTypeList: [],
      datepicker:[],//时间控件
      
      
      // 有效性
      pageTypeListBox: false, //状态是否可见
      pageTypeListAll: false,
      isPageTypeListAll: true,
      pageTypeListChecked: [],
      pageTypeLists: [],
      
      
      //消费渠道
      channelBox: false, //状态是否可见
      channelAll: false,
      isChannelAll: true,
      channelChecked: [],
      channels: [],
      channel: [],
      keyWordText: '',
      // 备选项
      checked: false,
      tags: [],
      //载入动画显示
      loading: true,
      // 列表数据
      dataList: [],
      
      fromDataList: {
        keywd: "", //关键字模糊搜索
        clickTimeStart: "", //点击开始时间
        clickTimeEnd: "", //点击结束时间
        pageNo: 1,//查询第几页
        pageSize: 10,//每页条数
        tf:true,//推广中
        select:"",
        channelTypeList:[],
      },
      //数据总条数
      total: 0,
      //分页器当前选中页码
      currentPage: 1,
      //每页显示条数
      pageSize: 10,
      //查询页码
      pageNo: 1,
      placeholder:"查询投放渠道",
      red:false,//标红
      fullscreenLoading:false
    };
  },
  watch:{
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
    selectType() {//选择类型
      console.log(this.type);
    },
    
    //今天和昨天按钮
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
    
    //投放状态改变
    tfOnChange(value){
      this.getList(true)
    },
    
    //有效性筛选
    CheckedPageTypeListAll(val) {
      this.pageTypeListChecked = val ? this.pageTypeLists : [];
      this.isPageTypeListAll = false;
    },
    //勾选项改变
    CheckedpageTypeList(value) {
      let checkedCount = value.length;
      this.pageTypeListAll = checkedCount === this.brListCondtionList.pageTypeList.length;
      this.isPageTypeListAll =
        checkedCount > 0 && checkedCount < this.brListCondtionList.pageTypeList.length;
    },
    savecPageTypeList() {
      this.pageTypeListBox = false; //隐藏对话框
      this.pushTagesList("终端类型：" + this.pageTypeListChecked,"pageTypeList", this.pageTypeListChecked);
      this.getList(true)
    },
     //来源渠道筛选
     CheckedChannelAll(val) {
      this.channelChecked = val ? this.channels : [];
      this.isChannelAll = false;
    },
    CheckedChannel(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.brListCondtionList.channelTypeList.length;
      this.isChannelAll = checkedCount > 0 && checkedCount < this.brListCondtionList .channelTypeList.length;
    },
    savecChannel() {
      this.channelBox = false;
      this.pushTagesList('渠道类型：' + this.channelChecked, 'channel', this.channelChecked);
      this.getList(true)
    },
    handleClose(tag) {//关闭标签
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'channel':
          this.channelChecked = [];
          this.getList(true)
          break
        case 'pageTypeList':
          this.pageTypeListChecked = [];
          this.getList(true)
          break
        case 'keyWord':
         this.fromDataList.keywd = '';
         this.fromDataList.select = '';
         this.getList(true)
         break
      }
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
    
    //查询预约列表
    getList(fresh) {
      if(fresh){
        this.pageNo = 1
        this.fromDataList.pageNo = 1
        this.currentPage = 1
      }
      this.pushTagesList('投放渠道：' + this.fromDataList.keywd, 'keyWord', this.fromDataList.keywd);
      this.loading = true;
      this.$requestHttp.put(
        "api/private/1.0/deliveryStatistics/cntDataByChannelPage", {
          pageSize: this.fromDataList.pageSize,
          pageNo: this.fromDataList.pageNo,
          beginDate:this.fromDataList.clickTimeStart,
          endDate:this.fromDataList.clickTimeEnd,
          
          channelName:this.fromDataList.select == "" ? (this.fromDataList.keywd):(this.fromDataList.select.name?this.fromDataList.select.name:this.fromDataList.keywd),// 渠道名称
          channelId:this.fromDataList.select == "" ? (""):(this.fromDataList.select.channelId?this.fromDataList.select.channelId:""),
          channelTypeList:this.channelChecked,
          pageTypeList:this.pageTypeListChecked,
          
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
    
    pushTagesList(val, valName, name) {
      //添加标签
      if (name != "") {
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].type == valName) {
            this.tags.splice(i, 1);
          }
        }
        let json = {
          name: val,
          type: valName
        };
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
  
    //模糊查询
    inputOnChange(queryString,callback) {
      console.log(queryString,"1111")
      this.fromDataList.select=""
      this.$requestHttp.put(
        "api/private/1.0/deliveryStatistics/selectChannelBykeyWord", {
          channelName: queryString
        }, '', res => {
          if (res.data.code == 1) {
            console.log(res.data.data)
            callback(res.data.data.channelList)
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
    
     // 导出数据
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
          beginDate:this.fromDataList.clickTimeStart,
          endDate:this.fromDataList.clickTimeEnd,
  
          channelName:this.fromDataList.select == "" ? (this.fromDataList.keywd):(this.fromDataList.select.name?this.fromDataList.select.name:this.fromDataList.keywd),// 渠道名称
          channelId:this.fromDataList.select == "" ? (""):(this.fromDataList.select.channelId?this.fromDataList.select.channelId:""),
          channelTypeList:this.channelChecked,
          pageTypeList:this.pageTypeListChecked,
        }
        let _this = this
        this.$requestHttp.put(
          "api/private/1.0/deliveryStatistics/exportCntDataByChannel", params, '', res => {
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
      
      this.page = 1;
      this.currentPage = 1;
      this.tags = [];
      this.fromDataList = {
        keywd: "", //关键字模糊搜索
        clickTimeStart: "", //点击开始时间
        clickTimeEnd: "", //点击结束时间
        pageNo: 1,//查询第几页
        pageSize: 10,//每页条数
        tf:true,//推广中
        select:""
      },
  
      // 有效性
      this.pageTypeListBox = false, //状态是否可见
      this.pageTypeListAll = false,
      this.isPageTypeListAll = true,
      this.pageTypeListChecked = [],
  
      //消费渠道
      this.channelBox = false, //状态是否可见
      this.channelAll = false,
      this.isChannelAll = true,
      this.channelChecked = [],
      this.datepicker = []
      this.getList(true);
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
    //获取过滤条件
    brListCondtion() {
      this.loading = true;
      this.$requestHttp.put("api/private/1.0/deliveryStatistics/selectChannelCondition", {}, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          this.brListCondtionList = res.data.data;
          for (var i = 0; this.brListCondtionList.channelTypeList.length > i; i++) {
            this.channel.push(this.brListCondtionList.channelTypeList[i].value);
          }
          for (var i = 0; this.brListCondtionList .pageTypeList.length > i; i++) {
            this.cstValidityList.push(this.brListCondtionList.pageTypeList[i].value);
          }
          this.loading = false;
        }
      },error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getList();
    this.brListCondtion()   //动态拿到查询条件
  }
};
