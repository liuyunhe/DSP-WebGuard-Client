<template>
  <div id="app">
    <headerA></headerA>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script>
  import headerA from './components/common/header.vue'; //头部
  export default {
    name: 'App',
    created() {
      // console.log('app')
      let token = this.getUrlKey('token');
      let appEnterKey =this.getUrlKey('appEnterKey');
      localStorage.setItem('appEnterKey',appEnterKey);
      // console.log(typeof  token)
      if (token != 'null' && token != null) {
        // console.log('122')
        localStorage.setItem('isToken', 0);
        localStorage.setItem('token', token);
      } else {
        //无token
        if (localStorage.getItem('token') == 'null') {
          window.location.href = this.GLOBAL.config.userConsoleH;
        }
      }
    },
    methods: {
      getUrlKey: function (name) {
        return (
          decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
              location.href
            ) || [, ''])[1].replace(/\+/g, '%20')
          ) || null
        );
      }
    },
    components: {
      headerA
    }
  };
</script>
<style type="text/scss" lang="scss">
  body {
    margin: 0px;
    padding: 0px;
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'Nimbus Sans L',
    Arial, 'Liberation Sans', 'Hiragino Sans GB', 'Source Han Sans CN Normal',
    'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti',
    SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
    #app {
      width: 100%;
      margin: 0 auto;
      background: #fff;
    }
  }

  @font-face {
    font-family: 'pingFangSC-Medium';
    //src:url('assets/PingFangSC/PingFangBold.ttf');
    font-weight: normal;
    font-style: normal;
  }

  .global-message {
    top: 100px;
  }

  .view-container {
    width: 1380px;
    margin: 0 auto;
    box-sizing: border-box;
    background: #fff;
    padding-bottom: 50px;
  }

  .el-menu-item [class^='fa'] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-submenu [class^='fa'] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  //按钮
  .el-button.important {
    color: #0077ff !important;
    border-color: #0077ff !important;
  }

  //顶部菜单栏
  .crm-home {
    .el-menu-item {
      width: 110px;
      text-align: center;
      border-bottom: none !important;
    }
    .el-submenu {
      .el-submenu__title {
        width: 110px;
        color: #fff !important;
        text-align: center;
      }
    }
  }

  .el-menu--popup {
    min-width: 130px !important;
    text-align: center;
    padding: 0 !important;
    .el-menu-item:hover {
      background-color: #0077ff !important;
    }
    .el-menu-item.is-active:hover {
      background-color: #0077ff !important;
      color: #fff !important;
    }
    .el-menu-item.is-active {
      color: #0077ff !important;
    }
  }

  //DropDown下拉菜单
  .el-dropdown-menu {
    padding: 0 !important;
    .el-dropdown-menu__item.active {
      color: #0077ff;
    }
  }

  //表单下拉
  .el-select-dropdown {
    .el-select-dropdown__list {
      padding: 0 !important;
    }
    .popper__arrow {
      display: none !important;
      &::after {
        display: none !important;
      }
    }
  }

  //用户账号下拉
  .user-dropdown-menu.el-popper[x-placement^='bottom'] {
    .popper__arrow {
      display: none;
      &::after {
        display: none;
      }
    }
  }

  //
  .section-container {
    padding: 30px;
  }

  //面包屑只保留当前功能名称
  .el-breadcrumb {
    span.el-breadcrumb__item {
      display: none;
      &:last-child {
        display: block;
        font-size: 16px;
      }
    }
  }

  //输入表单样式重写
/*  .el-input--suffix {
    .el-input__inner {
      padding-left: 15px !important;
      padding-right: 20px !important;
      color: #1a173b !important;
    }
  }*/

  .el-input__prefix {
    transition: all 0s;
  }

  .input-with-select {
    .el-input-group__prepend {
      background-color: #fff;
      .el-input__inner {
        transition: 0s !important;
        border: none !important;
        color: #1a173b !important;
      }
    }
    /*.el-input__inner{*/
    /*transition: 0s!important;*/
    /*border-color:#dcdfe6!important; ;*/
    /*}*/
  }

  /*.input-with-select:hover{*/
  /*.el-input-group__prepend{*/
  /*border-color:#4A7DE1!important;*/
  /*transition: 0s!important;*/
  /*.el-input__inner{*/
  /*border: none!important;*/
  /*}*/
  /*}*/
  /*.el-input__inner{*/
  /*border-color:#4A7DE1!important;*/
  /*transition: 0s!important;*/

  /*}*/
  /*}*/

  .el-select-dropdown__item {
    font-size: 13px !important;
    &.hover,
    &:hover {
      background-color: #0077ff !important;
      color: #fff !important;
    }
  }

  //工具条
  .toolbar {
    margin-bottom: 30px;
    .el-radio-button--small .el-radio-button__inner {
      width: 110px;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background: rgba(24, 128, 231, 0.1);
      color: rgba(0, 119, 255, 1);
    }
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 20px;
    }
    .el-form-item.mr0 {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .el-form-item__label {
      color: #8a96a0 !important;
      text-align: left !important;
    }
  }

  //底部工具条
  .footer-toolbar {
    margin: 25px 0px 0px;
    .btn-jump-to {
      width: 50px !important;
      height: 28px;
      line-height: 28px;
      float: right;
      padding: 0 4px;
      margin: 2px 0px 2px 20px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  //table下拉菜单
  .hover-slide {
    position: relative;
    padding: 0px !important;
    width: 130px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: rgba(239, 242, 248, 1);
    }
    span {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        right: -20px;
        top: 7px;
        border: 5px solid transparent;
        border-top-color: #324057;
      }
    }
    .slide-zone {
      width: 100%;
      position: absolute;
      top: 45px;
      background-color: #fff;
      .border-line {
        height: 5px;
      }
      .slide-wrap {
        width: 100%;
        border: 1px solid #e2e8ed;
        .slide-bar {
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #555555;
          cursor: pointer;
          font-weight: normal;
          &:hover {
            color: #fff !important;
            background-color: #0077ff;
          }
          &.active {
            color: #0077ff;
          }
        }
      }
    }
  }

  .template-select-dialog {
    display: flex;
    flex-wrap: wrap;
    width: 516px;
    height: 345px;
    .pcTemplate_select,
    .mobileTemplate_select {

      border-top: 1px solid #f2f4f8;
      border-bottom: 1px solid #f2f4f8;
      padding-top: 30px;
      width: 194px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        cursor: pointer;
        height: 90px;
      }
      .text {
        height: 60px;
        line-height: 50px;
        font-size: 12px;
      }
      // .pcTemplate_select {
      //   padding-left: 93px;
      // }
      // .mobileTemplate_select{
      //    padding-left:128px;
      // }
    }
  }

  //图标提示tooltips
  .table-tooltip {
    padding: 5px;
  }

  //表格图标
  i.table-icon {
    display: inline-block;
    position: relative;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    vertical-align: middle;
    cursor: pointer;
    .table-icon-tips {
      display: none;
      width: 34px;
      font-style: normal;
      position: absolute;
      text-align: center;
      /*padding: 0 5px;*/
      height: 25px;
      background-color: #000;
      color: #ffffff;
      font-size: 12px;
      line-height: 25px;
      border-radius: 4px;
      top: 30px;
      left: -10px;
      /*display: none;*/
      opacity: 0.8;
      z-index: 999;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: -85%;
        width: 0;
        height: 0;
        margin: 10px 0 0 10px;
        font-size: 0;
        border: 7px solid;
        border-color: transparent transparent #000 transparent;
        overflow: hidden;
      }
    }
    & .bg {
      width: 60px;
    }
    &:hover {
      .table-icon-tips {
        display: block;
      }
    }
    //预览
    &.ly {
      background-image: url('./assets/tableIcon/icon-yl.png');
    }
    //编辑
    &.bj {
      background-image: url('./assets/tableIcon/icon-bj.png');
    }
    //发布
    &.fb {
      background-image: url('./assets/tableIcon/icon-fb.png');
    }
    //复制链接
    &.fzlj {
      background-image: url('./assets/tableIcon/icon-fzlj.png');
    }
    //禁用
    &.jy {
      background-image: url('./assets/tableIcon/icon-jy.png');
    }
    //明细
    &.mx {
      background-image: url('./assets/tableIcon/icon-mx.png');
    }
    //删除
    &.sc {
      background-image: url('./assets/tableIcon/icon-sc.png');
    }
  }

  //分页器
  .el-pager {
    li {
      font-weight: normal;
    }
  }

  //上传图片
  #banner-setting {
    .el-upload--picture-card {
      width: 320px !important;
      height: 84px !important;
      border: none;
    }
    .el-upload-dragger {
      width: 320px !important;
      height: 84px !important;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 320px !important;
      height: 84px !important;
      display: block !important;
      margin-bottom: 24px;
    }
    .el-upload-list--picture-card .el-progress {
      width: 60px !important;
      .el-progress-circle {
        width: 60px !important;
        height: 60px !important;
      }
    }
    .el-upload--picture-card i {
      font-size: 22px;
      position: absolute;
      top: 16px;
      margin-left: -11px;
    }
  }

  #label-setting {
    .el-form-item__label {
      text-align: left !important;
    }
    .el-input--small .el-input__inner {
      width: 332px;
    }
    .el-textarea__inner {
      width: 332px;
      height: 160px;
    }
    .el-form-item {
      .avatar-uploader {
        width: 160px;
        float: left;
        padding-top: 8px;
        height: 92px;
        &:nth-child(2n) {
          margin-left: 12px;
        }
        .el-upload {
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: 160px;
          height: 84px;
        }
      }
      .avatar {
        width: 160px;
        height: 84px;
        display: block;
      }
      .el-upload-dragger {
        width: 160px !important;
        height: 84px !important;
        .avatar-uploader-icon {
          position: absolute;
          font-size: 16px;
          margin-left: -8px;
          top: 20px;
        }
        .el-upload__text {
          margin-top: 40px;
          font-size: 12px;
        }
      }
      .drag {
        .el-upload--picture-card {
          width: 160px !important;
          height: 84px !important;
          border: none;
        }
        .el-upload-list--picture-card .el-upload-list__item {
          width: 160px !important;
          height: 84px !important;
          display: block !important;
          margin-bottom: 24px;
        }
        .el-upload--picture-card i {
          font-size: 22px;
          position: absolute;
          top: 16px;
          margin-left: -11px;
        }
        .el-upload-list--picture-card .el-progress {
          width: 60px !important;
          .el-progress-circle {
            width: 60px !important;
            height: 60px !important;
          }
        }
        .el-upload-dragger .el-upload__text {
          position: absolute;
          top: -20px;
          width: 100%;
          margin-top: 0px;
        }
      }
    }
  }

  #plugin-setting {
    .el-form-item {
      .el-icon-delete:before {
        color: #0077ff !important;
      }
      .el-icon-plus:before {
        color: #0077ff !important;
      }
    }
  }

  .ql-container {
    min-height: 400px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0px !important;
    display: block;
    font-size: 12px;
  }

  .el-popover {
    .el-checkbox__label {
      font-size: 12px;
    }
  }

  .el-checkbox-group {
    padding-top: 10px;
    .el-checkbox {
      padding-bottom: 10px;
    }
  }
   .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 80px;
    line-height: 80px;
}

</style>

