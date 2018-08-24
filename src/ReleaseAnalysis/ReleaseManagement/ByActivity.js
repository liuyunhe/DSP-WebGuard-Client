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
      value6:"",
      type: "1",
      typeOptions: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "投放活动"
        },
        {
          value: "3",
          label: "项目名称"
        }
      ],
      kw: '',
      kwType: '',
      brListCondtionList: '',
      cstValidityList: [],
      // 有效性
      cstValidityListBox: false,
      isCstValidityListAll: true,
      cstValidityListAll: false,
      cstValidityListChecked: [],
      cstValidityLists: [],
      //来源渠道
      channelBox: false,
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
      //表单
      filters: {
        status: "0",
        type: "name",
        search: "",
        time: []
      },
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
        clickTimeStart: "", //点击开始时间
        clickTimeEnd: "", //点击结束时间
        pageNo: 1 //查询第几页
      },
      bespeakRecordId: '',
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
      pageType: ""
    };
  },
  
  methods: {
    selectType() {//选择类型
      console.log(this.type);
    },
    //模糊查询
    remoteMethod(query) {
      console.log(query);
      this.projectTaskListByLike(query);
    },
    //有效性
    CheckedCstValidityListAllAll(val) {
      this.cstValidityListChecked = val ? this.cstValidityLists : [];
      this.isCstValidityListAll = false;
    },
    CheckedcstValidityList(value) {
      let checkedCount = value.length;
      this.cstValidityListAll = checkedCount === this.brListCondtionList.cstValidityList.length;
      this.isCstValidityListAll =
        checkedCount > 0 && checkedCount < this.brListCondtionList.cstValidityList.length;
    },
    savecCstValidityList() {
      this.cstValidityListBox = false;
      this.pushTagesList("有效性：" + this.cstValidityListChecked,"cstValidityList", this.cstValidityListChecked);
      this.brListCondtion();
    },

     //来源渠道
     CheckedChannelAll(val) {
      this.channelChecked = val ? this.channels : [];
      this.isChannelAll = false;
    },
    CheckedChannel(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.brListCondtionList.channel.length;
      this.isChannelAll = checkedCount > 0 && checkedCount < this.brListCondtionList .channel.length;
    },
    savecChannel() {
      this.channelBox = false;
      this.pushTagesList('来源渠道：' + this.channelChecked, 'channel', this.channelChecked);
      this.brListCondtion();
    },
    handleClose(tag) {//关闭标签
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'channel':
          this.CheckedChannel = [];
          this.brListCondtion();
          break
        case 'intentionalDegreeList':
          this.CheckedcstValidityList = [];
          this.brListCondtion();
          break
        case 'keyWord':
          this.keyWordText = '';
          this.brListCondtion();
          break
      }
    },
    // 详情
    Details(scope) {
      console.log(scope)
      this.$router.push({path: '/Details'});
    },
    handleCommand(command) {
      console.log(command);
      this.mobile_terminal = command;
      this.searchList();
    },
    handleCommandStatus(command) {
      console.log(command);
      this.status = command;
      this.searchList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    remoteMethod(query) {
      console.log('qrererr');
      console.log(query)
      if (query !== '') {
        this.loading = true;
        this.getList(query)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 下一页
      console.log(val);
      this.fromDataList.pageNo = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查询预约列表
    getList() {
      this.loading = true;
      this.$requestHttp.put(
        "api/private/1.0/BespeakRecord/list", {
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
    // 预约记录列表表头查询条件初始化
    brListCondtion() {
      this.loading = true;
      this.$requestHttp.put("api/private/1.0/BespeakRecord/brListCondtion", {}, '', res => {
        console.log(res);
        if (res.data.code == 1) {
          this.brListCondtionList = res.data.data;
          console.log(this.brListCondtionList)
          for (var i = 0; this.brListCondtionList .channel.length > i; i++) {
            this.channel.push(this.brListCondtionList .channel[i].value);
          }
          for (var i = 0; this.brListCondtionList .cstValidityList.length > i; i++) {
            this.cstValidityList.push(this.brListCondtionList .cstValidityList[i].value);
          }
          this.typeOptions = res.data.data.brListCondtionList;
          this.loading = false;
          this.getList();
        }
      },error => {
        console.log(error)
      })
    },
   //关键字模糊查询
    searchKeyword(text) {
      console.log("1")
      this.$requestHttp.put("api/private/1.0/BespeakRecord/searchKeyword", {
        kw: text,
        kwType: this.kwType
      }, '', res => {
        if (res.code ==  1) {
          this.detail = res.data.data.detail;
          this.source = res.data.data.source;
        }
      })
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
    //规范事件格式
    configTime() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }
      console.log(this.filters.time);
    },
    //传送查询条件
    postSearch() {
      this.listLoading = true;
      console.log(this.search);
      this.$requestHttp.put("api/private/1.0/page/list", this.search, '', res => {
        console.log(res.data);
        if (res.data.code == 1) {
          console.log(res.data.list);
          this.pageList = res.data.data.list;
          this.total = res.data.data.count;
          this.pageSize = res.data.data.pageSize;
          this.listLoading = false;
        }
      });
    },
     // 导出预约列表
     customerExport() {
      let customer_listStr = '';
      if (this.customer_listChecked.lenght == 1){
        for (var i = 0; this.brListCondtionList.cstValidityList.lenght > i; i++) {
          console.log(this.brListCondtionList.cstTypeList[i].value)
          if (this,brListCondtionList.cstTypeList[i].value == this.customer_listChecked[0]) {
            customer_listStr = this.brListCondtionList.cstTypeList[i].code;
          }
        }
      } else {
        customer_listStr = ''
      }

      let channelListStr = [];
      for (var i = 0; this.brListCondtionList.channel.length > i; i++) {
        for (var n = 0; this.channelChecked.length > n; n++) {
          if (this.brListCondtionList.channel[i].value == this.channelChecked[n]) {
            channelListStr.push(this.brListCondtionList.channel[i].code);
          }
        }
      }
      let params = {
        keyWord: this.keyWordText || this.fromDataList.keywd,
        collectionMethod: customer_listStr,
        pageSize: this.fromDataList.pageSize,
        pageNo: this.fromDataList.pageNo,
        cstValidityLis: [],
        intentionalDegreeList: this.intentionalDegreeListChecked,
        cstStatusList: this.cstStatusListChecked,
        projectIdList: this.quwryCustomersListId,
        channelList: channelListStr,
        startTime: this.guestDate[0],
        ebdIime: this.guestDate[1]
      }

      // this.$api.customerExport(params).then(function (res) {
      //   this.$requestHttp.put("api/private/1.0/BespeakRecord/exportBespeakRecord", {}, '', res => {
      //   var blob = new Blob([res], {
      //     type: 'application/vdn.ms-excel'
      //   });
      //   let filename = '导出数据.xls';
      //   let URLOBJ = window.URL || window.webkitURL;
      //   if ('download' in document.createElement('a')) {
      //     const downloadElement = document.createElement('a');
      //     let href = URLOBJ.createObjectURL(blob);
      //     downloadElement.href = href;
      //     downloadElement.download = filename;
      //     document.body.appendChild(downloadElement);
      //     downloadElement.click();
      //     URLOBJ.revokeObjectURL(href);
      //     document.body.removeChild(downloadElement);
      //   } else {
      //     navigator.msSaveBlob(blob, filename);
      //   }
      // });
      // });
    },
    //radio按钮,重置
    getReset() {
      this.dataList.type = "name";
      this.dataList.search = "";
      this.dataList.time = [];
      this.page = 1;
      this.currentPage = 1;
      this.pageType = "";
      this.tags = [];
      this.CheckedCstValidityListAllAll = '';
      this.CheckedChannelAll = '';
      this.cstValidityListAll = '';
      this.channelAll = '';
      this.getList();
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
      this.getList();
    },
  },
  mounted() {
    this.getList();
    this.brListCondtion();
    this.searchKeyword();
  }
};
