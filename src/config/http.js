import http from 'axios';
import global_ from '../config/Global.js';

// config http
let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl =global_.config.baseUrl;
} else if (process.env.NODE_ENV === 'production') {
  baseUrl =global_.config.baseUrl;
}
http.defaults.baseURL = baseUrl;

http.defaults.timeout = 100000;
//  http.defaults.headers.post['Content-Type'] = 'application/json'
// cache-control: "max-age=0, private, must-revalidate"
//http.defaults.headers.post['Cache-control'] = 'max-age=5'
//http.defaults.headers.post['Access-Control-Allow-Headers'] = 'x-access-token'
//http.defaults.headers.post['X-ACCESS_TOKEN'] = 'Access-Control-Allow-Origin'
// Add a request interceptor 解决ie下url带中文参数乱码问题
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config)
    //config.headers['isAllowNoLogin'] = 'true';
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    if (config.method == 'get') {
      config.url = encodeURI(config.url);
      // config.data = config.params
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log(response)

    if (response.headers['content-type'] == "application/vnd.ms-excel") {

    }


    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status === 400) {
        error.response('数据错误！');
      } else if (error.response.status === 401) {
        // define window.app=vm in main.js
        window.app.$router.push({
          name: 'Login'
        });
      } else if (error.response.status === 403) {
        window.app.$message.error('您没有操作权限哦！');
      } else if (error.response.status === 404) {
        window.app.$message.error('对象不存在！');
      } else if (error.response.status === 500) {
        window.app.$message.error('服务器发生了一些错误哦！');
      } else {
        error.response = '服务器发生了一些错误哦！';
      }
    }

    return Promise.reject(error);
  }
);

export default http;
