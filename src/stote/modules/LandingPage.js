// initial state
const state = {
  landingPageType: '',
  landingPageId: '',
  steps1: {
    pageName: '',
    orgName: '',
    projectCode: '',
    projectName: '',
    callTel: '',
    label: '',
    //400电话
    callTel1: '',
    callTel2: '',
    uuid: '',
    template: '',
    archiveId: '',
    deliveryManagements: []
  }
};

// getters
const getters = {
  //templateId
  getLandingPageType: state => state.landingPageType,
  //pageId
  getLandingPageId: state => state.landingPageId
};

// actions
const actions = {};

// mutations
const mutations = {
  setLandingPageType(state, landingPageType) {
    state.landingPageType = landingPageType;
  },

  setLandingPageId(state, landingPageId) {
    state.landingPageId = landingPageId;
  },

  Initsteps1(state, data) {
    state.steps1 = data;
  },
  InitialLandingPageType(state) {
    state.landingPageType = '';
  },

  InitialLandingPageId(state) {
    state.landingPageId = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
