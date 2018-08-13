/*
* success : 请求成功执行的函数
* fail：请求失败执行的函数
*
* */

import http from './http';
import qs from 'qs';
import { Message } from 'element-ui';
//有的请求需要用户认证，视情况而定
const getConfig = function(auth) {
  let config = {};

  if (auth&&typeof auth ==='string') {
    config.headers = {
      Authorization: auth
    };
  } else {
    config = auth
  }

  return config;
};

var request = {
  get: function(url, param) {
    return new Promise((resolve, reject) => {
      http
        .get(url, {
          params: param
        })
        .then(res => {
          if (res.data.code == 1) {
            resolve(res.data.data);
          }
          if (res.data.code < 0) {
            Message({
              customClass: 'global-message',
              message: res.data.message,
              type: 'error'
            });
            reject(res.data.message);
          }
          // 其它状态处理
          resolve(res.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  },
  post: function(url, param) {
    return new Promise((resolve, reject) => {
      http
        .post(url, qs.stringify(param))
        .then(res => {
          if (res.data.code == 1) {
            resolve(res.data.data);
          }
          if (res.data.code < 0) {
            Message({
              customClass: 'global-message',
              message: res.data.message,
              type: 'error'
            });
            reject(res.data.message);
          }
          // 其它状态处理
          resolve(res.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  },
  put: function (url, data = {}, auth = '') {
    return new Promise((resolve, reject) => {
      http
        .put(url, data, getConfig(auth))
        .then(res => {
          if (res.data.code == 1) {
            resolve(res.data.data);
          }
          if (res.data.code < 0) {
            Message({
              customClass: 'global-message',
              message: res.data.message,
              type: 'error'
            });
            reject(res.data.message);
          }
          // 其它状态处理
          resolve(res.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  }
};

// 用法
// this.$request.get(`${basis.userListUrl}`, false,
// function (res) {
//   // console.log(res.data);
// }
// )
export default request;
