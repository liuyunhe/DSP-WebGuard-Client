import footerA from "../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  data() {

    return {

      // items:[{channelName:'链接'}],
      searchStart: [],
      searchEnd: [],

      startTimeFrom: '',
      startTimeTo: '',
      endTimeFrom: '',
      endTimeTo: '',
      advertisingTitle:'',
      projectName:'',
      orgName:'',

      link: [],
      AllData: [],

      archiveId: this.$route.params.id,

      type: '1',
      searchKey: '',
      searchKeyList: [],
      options: [],
      startTime: '',//投放活动开始时间
      endTime: '',//投放活动结束时间
      status: '',//投放状态

      select: '',
      pageNo: 1,
      pageSize: 10,
      total: 0,


      total_records: 0,//总数据
      listData: [],//投放管理列表
      advertisingTitle: '',
      ChannelLoading: false,
      pageUrl: '',
      loading: false,
      tags: [],
      typeOptions: [
        {
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '投放活动'
        }, {
          value: '3',
          label: '所属项目'
        }, {
          value: '4',
          label: '所属机构'
        }],
    }
  },
  created() {
    this.getProjectList();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
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
    projectTaskListByLike(text) { //模糊搜索
      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/selectAssociation', {
          searchKey: text,
          searchKeyList: this.searchKeyList,
          startTime: this.startTime,//投放活动开始时间
          endTime: this.endTime,//投放活动结束时间
          status: this.status,//任务量
          searchStart: this.searchStart,
          searchEnd: this.searchEnd
        }, {},
        res => {
          console.log(res)
          if (res.data.code == 1) {
            console.log(122)
            this.options = res.data.data.searchKeyList;
          }
        }
      );
    },
    //失去焦点添加到tags
    blurInput(name) {
      console.log(name)
      switch (name) {
        case 'startTime':
          console.log(this.startTime)
          this.pushTagesList('投放活动开始时间：' + this.startTime, 'startTime', this.startTime);
          break
        case 'endTime':
          console.log(this.endTime)
          this.pushTagesList('投放活动开始时间：' + this.endTime, 'endTime', this.endTime);
          break
        case 'searchKey':
          console.log(this.searchKey)
          this.pushTagesList('投放活动开始时间：' + this.searchKey, 'searchKey', this.searchKey);
          break

      }
    },
    statusType(command) {
      console.log(command)
      this.status = command;
       this.pushTagesList('投放渠道：' + command, 'channelName',command);
      this.getProjectList();
    },

    //添加标签
    pushTagesList(val, valName, name) {
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

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getProjectList();

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getProjectList();
    },
    //关闭标签
    handleClose(tag) {
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'startTime':
          this.startTimeFrom = '';
          this.startTimeTo = '';

          // this.searchStart=[];
          this.getProjectList();
          break
        case 'endTime':
          this.endTimeFrom = '';
          this.endTimeTo = '';

          // this.searchStart=[];
          this.getProjectList();
          break


        case 'status':
          this.status = '';
          this.getProjectList();
          break

        case 'searchKey':
          this.searchKey = '';
          this.getProjectList();
          break

        case 'channelName':
          this.status = '';
          this.getProjectList();
          break
      }
    },


    //列表数据
    getProjectList() {
      this.ChannelLoading = true;
      let json = {
        searchKey: this.searchKey,
        status: this.status,
        pageNo: this.pageNo,
        pageSize: this.pageSize,

        startTimeFrom: this.startTimeFrom,
        startTimeTo: this.startTimeTo,

        endTimeFrom: this.endTimeFrom,
        endTimeTo: this.endTimeTo,

        advertisingTitle:this.advertisingTitle,
        projectName:this.projectName,
        orgName:this.orgName,
      }

      if (this.status == '') {
        delete  json.status;
      }
      if (this.startTimeFrom == '') {
        delete  json.startTimeFrom;
      }
      if (this.startTimeTo == '') {
        delete  json.startTimeTo;
      }

      if (this.endTimeFrom == '') {
        delete  json.endTimeFrom;
      }
      if (this.endTimeTo == '') {
        delete  json.endTimeTo;
      }

      console.log(json)
      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/selectArchivePage', json, '', res => {
        console.log(res)
        if (res.data.code == 1) {
          this.listData = res.data.data.list;
          this.total = res.data.data.count;
          this.ChannelLoading = false;
          /*  this.pageSize =res.data.data.pageSize
            this.pageNo =res.data.data.pageNo*/
        }
      });
    },
    //投放管理列表-详情点击
    modification(index) {
      console.log(index.row);
      this.$router.push('/Management/newDetails/' + index.row.id);
    },

    //重置
    restList() {
      this.startTime = '';//开始投放时间
      this.endTime = '';//投放结束时间
      this.status = '';//投放状态
      this.searchStart = [];//列表开始投放时间
      this.searchEnd = [];//列表投放结束时间

      this.pageNo=1;
      this.startTimeFrom = ''
      this.startTimeTo = ''
      this.endTimeFrom = ''
      this.endTimeTo = ''
      this.advertisingTitle='';
        this.projectName='';
        this.orgName='';

      this.searchKey = '';
      // this.currentPage = 1;
      this.tags = [];//已选筛选条件
      this.type = '1';
      this.getProjectList();
    },

    linking(scope) {
      window.open(scope.pageUrl, "_blank",);
    },
    getList(scope) {
      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/selectArchiveDeliveryDetail', {//详情列表
        archiveId: scope.row.id.toString(),
      }, {}, res => {
        console.log(res)
        if (res.data.code == 1) {
          this.link = res.data.data.data;
        }
      });
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
    //列表投放开始时间
    searchStart(val) {

      console.log(typeof val)
      console.log(val)

      if (val != null) {
        this.startTimeFrom = val[0];
        this.startTimeTo = val[1];

        this.pushTagesList('投放开始时间：' + val[0] + '至' + val[1], 'startTime', val);
      } else {
        this.startTime = [];

        this.searchStart = [];
        this.delTags('startTime');
        this.getProjectList();
      }
    },
    //列表投放结束时间
    searchEnd(val) {

      console.log(typeof val)
      console.log(val)

      if (val != null) {
        this.endTimeFrom = val[0];
        this.endTimeTo = val[1];

        this.pushTagesList('投放结束时间：' + val[0] + '至' + val[1], 'endTime', val);
      } else {
        this.endTime = [];
        this.searchEnd = [];
        this.delTags('startTime');
        this.getProjectList();
      }
    },

  }


}
