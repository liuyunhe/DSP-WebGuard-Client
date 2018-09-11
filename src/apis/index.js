import request from '../config/axios';
import axios from 'axios'

// 新增
export function newly() {
  return axios.post('mobile/api/private/1.0/template/list',{}) .then(res => res.data)
}
// 编辑数据获取
export function compileDate(params) {
  return axios.get('mobile/api/private/1.0/page/edit/'+params).then(res => res.data)
}
// 基本信息的机构列表请求
export function organization() {
  return axios.post('api/private/1.0/page/org/list').then(res=> res.data)
}
// 基本信息的项目列表请求
export function project(params) {
  return axios.get('api/private/1.0/page/project/list', {params: {'orgId' : params}}) .then(res => res.data)
}
// 基本信息的投放列表请求
export function throwRelease(params) {
  return axios.get('api/private/1.0/page/archive/' + params) .then(res => res.data)
}
// 投放渠道
export function channel() {
  return axios.get('api/private/1.0/page/channel/list') .then(res=>res.data)
}
// 基本信息的保存
export function essentialNext(params) {
  return axios.post('mobile/api/private/1.0/page/save-update-info', params) .then(res => res.data)
}
// 模板的获取
export function templates(params) {
  return axios.post('mobile/api/private/1.0/page/label/list', params) .then(res => res.data)
}
// 样式 插件 属性的请求 获取标签样式库
export function styles() {
  return axios.post('mobile/api/private/1.0/page/style/list',{styleType:'1'}) .then(res => res.data)
}
// 样式库数据的获取
export function stylesData(params) {
  return axios.get('mobile/api/private/1.0/page/style/'+params) .then(res => res.data)
}
// 图片的上传
export function setImg(params) {
  return axios.post('mobile/api/private/1.0/page/upload',params) .then(res => res.data)
}
// 画布删除小功能删除
export function deleteTemplates(params) {
  return axios.post('mobile/api/private/1.0/page/style/clear',params) .then(res => res.data)
}
// 第二步保存
export function twoSave(params) {
  return axios.post('mobile/api/private/1.0/page/save-update-module',params) .then(res => res.data)
}

// 裁剪完了之后, 进行上传
export function tailor(params) {
  return axios.post('api/private/1.0/page/upload', params)
}

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

//客户列表
export function brListCondtion(params) {
  return request.get('api/private/1.0/BespeakRecord/brListCondtion');
}



export function queryCallerList(params) {
  return request.put('api/private/1.0/caller/queryCallerList',params);
}


export function queryAllList(params) {
  return request.put('api/private/1.0/BespeakRecord/list',params);
}

//导出客户列表
export function customerExport(params) {
  return request.put('api/private/1.0/customer/customerExport', params, {
    responseType: 'arraybuffer'
  });
}
//导出来电列表
export function exportCallerList(params) {
  return request.put('api/private/1.0/caller/exportCallerList', params, {
    responseType: 'arraybuffer'
  });
}
//导出预约列表
export function exportBespeakRecord(params) {
  return request.put('api/private/1.0/BespeakRecord/exportBespeakRecord', params, {
    responseType: 'arraybuffer'
  });
}
//预约列表
export function BespeakRecordList(params) {
  return request.put('api/private/1.0/BespeakRecord/list',params);
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






