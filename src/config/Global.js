//测试环境
const config={
  exportH:'http://182.61.33.241:8086/',//导出域名
//  exportH:'http://172.16.2.150:8091/',
  userConsoleH:'http://182.61.33.241:8081/us岁er-console/main.html#/index',//营销云地址
  manageH:'',//管理端地址
  exit:'http://182.61.33.241:8081/login/main.html#/index',//退出地址
  imgH:'http://182.61.33.241:8086',//图片地址0
  imgUpload:'http://182.61.33.241:8086/api/private/1.0/page/upload',
  baseUrl : 'http://182.61.33.241:8086',//请求地址
   //baseUrl:'http://172.16.2.150:8091'
  html: {
    htmlCode: '',
  }
};
//生产环境
/*
const config = {
  exportH: 'http://www.juke8.cn:8086/',
  userConsoleH: 'http://www.juke8.cn/user-console/main.html#/index',
  manageH: '',//管理端地址
  imgH: 'http://www.juke8.cn:8086',//图片地址
  imgUpload: 'http://www.juke8.cn:8086/api/private/1.0/page/upload',
  exit: 'http://www.juke8.cn/login/main.html#/index',
  baseUrl: 'http://www.juke8.cn:8086',//请求地址
  html: {
    htmlCode: '',
  }
};
*/

export default {
  config,//配置

}
