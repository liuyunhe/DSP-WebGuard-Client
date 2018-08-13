// Monitoring
import * as types from '../types';
import * as apis from '@/apis';

const state = {
  dashSummaryInfo: {
    "deliveryObject": {
      "nowProjectCount": 0,
      "totalProjectCount": 0,
      "sameMonthCount": 0
    },
    "clickNumObject": {
      "nowClickCount": 0,
      "yesterClickCount": 0,
      "compareClickCount": 0,
      "dailyMeanClickCount": 0,
      "totalClickCount": 0
    },
    "showObject": {
      "nowCount": 0,
      "yesterCount": 0,
      "compareCount": 0,
      "dailyMeanCount": 0,
      "totalCount": 0
    },
    "consumObject": {
      "nowConsumCount": 0,
      "yesterConsumCount": 0,
      "compareConsumCount": 0,
      "dailyMeanConsumCount": 0,
      "totalConsumCount": 0
    },
    "guestsObject": {
      "nowGuestsCount": 0,
      "yesterGuestsCount": 0,
      "compareGuestsCount": 0,
      "dailyMeanGuestsCount": 0,
      "totalGuestsCount": 0
    },
    "perCustConsumObject": {
      "perCustConsum": 0,
      "yesterPerCustConsum": 0,
      "comparePerCustConsum": 0,
      "avgClientConsum": 0
    }
  },
  dashProjEffective: [],
  dashProjectDetail: [],
  dashGroupCHannelInfo: {},
  dashSelectOrgEffective:{}
};

// getters
const getters = {
  getDashGroupCHannelInfo:  (state)=> {
    //console.log(222)
    //return state.dashGroupCHannelInfo;

    let data = state.dashGroupCHannelInfo;

    return {
      color: ['#037AFF','#13CE67'],
      // title: {
      //     text: '世界人口总量',
      //     subtext: '数据来自网络'
      // },
      'auto-resize':true,
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },

      // legend: {
      //     data: ['移动端', 'PC端']
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show:false
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        position: 'top',
        axisLine: {
          show:false
        },
        axisLabel:{
          //show:false
        }
      },
      yAxis: {
        type: 'category',
        data: data.lable,
        axisLine: {
          show:false
        },
        axisLabel:{
          //show:false
        }
      },
      series: [
          {
          name: '移动端',
          type: 'bar',
          data: data.moblieList,
          barGap: 0,
          barWidth: 10
          },
          {
            name: 'PC端',
            type: 'bar',
            data: data.pcList,
            barGap: 0,
            barWidth: 10
          }
      ]
  };






  }
};


// mutations
const mutations = {
  [types.DSB_GET_SUMMARYINFO](state, data) {
    state.dashSummaryInfo = data;
  },
  [types.DSB_GET_PROJEFFECTIVE](state, data) {
    state.dashProjEffective = data;
  },
  [types.DSB_GET_PROJECTDETAIL](state, data) {
    state.dashProjectDetail = data;
  },
  [types.DSB_GET_GROUPCHANNELINFO](state, data) {
    state.dashGroupCHannelInfo = data;
  },
  [types.DSB_GET_SELECTORGEFFECTIVE](state, data) {
    state.dashSelectOrgEffective = data;
  }

};

// actions
const actions = {
  async getSummaryInfo({commit}) {
    let data = await apis.getDashSummaryInfo();
    data.retCode === 1 && commit(types.DSB_GET_SUMMARYINFO, data);
  },
  async getProjEffective({commit},params) {
    let res = await apis.getDashProjEffective(params);
    commit(types.DSB_GET_PROJEFFECTIVE, res.data);
  },
  async getProjectDetail({commit},params) {
    let res = await apis.getDashProjectDetail(params);
    commit(types.DSB_GET_PROJECTDETAIL, res.data);
  },
  async getGroupCHannelInfo({commit},params) {
    let res = await apis.getDashGroupCHannelInfo(params);
    commit(types.DSB_GET_GROUPCHANNELINFO, res.data);
  },
  async getSelectOrgEffective({commit},params) {
    let res = await apis.getDashSelectOrgEffective(params);
    commit(types.DSB_GET_SELECTORGEFFECTIVE, res.data);
  }
};


export default {
  state,
  getters,
  mutations,
  actions
};
