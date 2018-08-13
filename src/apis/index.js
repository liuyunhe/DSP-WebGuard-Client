import request from '../config/axios';

export function getLandingPageList(params = {}) {
  return request.put('api/private/1.0/page/list', params, '');
}

export function getTemplateList(params = {}) {
  return request.put('api/private/1.0/template/list', params, '');
}

export function requestLabelList(params = {}) {
  return request.put('api/private/1.0/page/label/list', params, '');
}

export function requestOrgList(params = {}) {
  return request.put('api/private/1.0/page/org/list', params, '');
}

export function requestProjectList(params = {}) {
  return request.get('api/private/1.0/page/project/list', params, '');
}

export function requestArchiveList(projectId, params = {}) {
  return request.put(`api/private/1.0/page/archive/${projectId}`, params, '');
}

export function requestChannelList(params = {}) {
  return request.put(`api/private/1.0/page/channel/list`, params, '');
}

export function requestStyleList(params = {}) {
  return request.put('api/private/1.0/page/style/list', params, '');
}

export function saveBaseSetting(params = {}) {
  return request.put('api/private/1.0/page/save-update-info', params, '');
}

export function saveSettingStep2(params = {}) {
  return request.put('api/private/1.0/page/label/save-update', params, '');
}

export function saveSettingStep3(params = {}) {
  return request.put('api/private/1.0/page/style/save-update', params, '');
}

export function requestEditorMessage(id) {
  return request.get(`api/private/1.0/page/edit/${id}`);
}

export function requestStyleId(id) {
  return request.get(`api/private/1.0/page/style/${id}`);
}

export function pagelistUpdateStatus(id) {
  return request.get(`api/private/1.0/page/update-status/${id}`);
}

export function requestClearStyle(params) {
  return request.put('api/private/1.0/page/style/clear', params);
}

export function saveEditorStep3(params) {
  return request.put('api/private/1.0/page/editor/save-update', params);
}


//首页
export function homePageCount() {
  return request.put('api/private/1.0/DashBorad/selectDashSummaryInfo');
}



//客户列表
export function callerListCondition(params) {
  return request.get('api/private/1.0/caller/callerListCondition');
}

export function queryCallerList(params) {
  return request.put('api/private/1.0/caller/queryCallerList',params);
}


//导出客户列表
export function customerExport(params) {
  /*
  return request.post('api/private/1.0/customer/customerExport', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  */
  return request.put('api/private/1.0/customer/customerExport', params, {
    responseType: 'arraybuffer'
  });
}


//监控看板
//监控看板最上方一行各指标统计简要信息
export function getDashSummaryInfo() {
  return request.put('/api/private/1.0/DashBorad/selectDashSummaryInfo');
}
//监控看板 - 项目投放效果
export function getDashProjEffective(params) {
  return request.put('/api/private/1.0/DashBorad/selectProjEffective',params);
}

//监控看板 - 项目统计的详情列表
export function getDashProjectDetail(params) {
  return request.put('/api/private/1.0/DashBorad/selectDashProjectDetail',params);
}

//监控看板 - 渠道统计
export function getDashGroupCHannelInfo(params) {
  return request.put('/api/private/1.0/DashBorad/selectGroupCHannelInfo',params);
}

//监控看板 - 机构投放效果
export function getDashSelectOrgEffective(params) {
  return request.put('/api/private/1.0/DashBorad/selectOrgEffective',params);
}






