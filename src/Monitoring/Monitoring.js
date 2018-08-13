import {mapState,mapGetters,mapActions} from 'vuex';
require('./index.scss');
export default {
  name: "index",
  data() {
    return {
      ChannelLoading: false,
      activeName2: 'first',
      radio3: '今天',
      radio4: '今天',
      title_one: '今天',
      title_two: '今天',
      title_three: '今天',
      title_four: '今天',
      title_five: '最近7天',
      tableData: [],
      options: [{
        value: '选项1',
        label: '渠道展现量'
      }, {
        value: '选项2',
        label: '渠道点击量'
      }, {
        value: '选项3',
        label: '渠道获客量'
      }, {
        value: '选项4',
        label: '渠道消耗金额'
      }, {
        value: '选项5',
        label: '渠道客单价'
      }, {
        value: '选项6',
        label: '渠道转化率'
      }, {
        value: '选项7',
        label: '渠道点击单价'
      }],
      optionsS: [{
        value: 'getProjEffective',
        label: '项目投放效果',
        disabled:false
      }, {
          value: 'getSelectOrgEffective',
          label: '机构投放效果',
          disabled:false
      }, {
          value: 'getProjEffective2',
          label: '计划投放效果',
          disabled:true
      }],
      value: '',
      value_one: '',
      channelInfo: {
        qParams: {
          timeType: 'week',
          infoType: 'showSum'
        },
        echart: {
          option: {
            color: ['#037AFF','#13CE67']
          }
        }

      },
      effective: {
        timeType: 'today',
        efType:'getProjEffective'
      }
    };
  },
  computed: {
    ...mapState({
      dashSummaryInfo: state => state.Monitoring.dashSummaryInfo,
      dashProjEffective: state => state.Monitoring.dashProjEffective,
      dashProjectDetail: state => state.Monitoring.dashProjectDetail
    }),
    ...mapGetters(['getDashGroupCHannelInfo'])

  },
  methods: {
    ...mapActions(['getSummaryInfo', 'getProjEffective', 'getProjectDetail', 'getGroupCHannelInfo','getSelectOrgEffective']),
    handleClick(tab, event) {
      console.log(tab, event);
    },
    effectiveHandle() {
      //this.getProjEffective({timeType: this.effective.timeType});
      console.log(this.effective.efType)
      this[this.effective.efType]({timeType: this.effective.timeType});
    },
    MonitorList() {
      this.$requestHttp.put('/api/private/1.0/DashBorad/selectProjEffective', {
        timeType: 'today', //统计的时间类型，分别为:today,yesterday,week
      }, {}, res => {
         this.tableData = res.data.data.data
      })
    }
  },
  created() {
    this.getSummaryInfo();
    //this.MonitorList();
    this.getProjectDetail();
    //this.getProjEffective({timeType: this.effective.timeType});
    this[this.effective.efType]({timeType: this.effective.timeType});
    this.getGroupCHannelInfo(this.channelInfo.qParams);
  }
}
