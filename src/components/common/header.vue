<template>
  <div>
    <div class="headBg">
      <div class="head">
        <div class="logo">
          <img src="../../assets/images/logo.png"
            alt="logo">
        </div>
        <div class="line"></div>
        <h2>全网导客平台</h2>

        <div class="nav">
         <template v-for="(item,index) in navMenu">
           <el-dropdown   trigger="click"  :class="['navLi',{'action':options==item.moduleCode}]"  placement="bottom-start" v-if="item.subsetList.length>0">
            <span class="el-dropdown-link  " >
              {{item.moduleName}}<i class="el-icon-arrow-down el-icon--right" v-if="item.subsetList.length>0"></i>
            </span>

             <el-dropdown-menu slot="dropdown"  class="navBox"  :attr="item.moduleCode" >
               <el-dropdown-item :command="child" :key="child.moduleCode" v-for="child in item.subsetList" >
                 <template   v-if="child.moduleType=='0'">
                    <router-link :to="child.moduleUrl">{{child.moduleName}}</router-link>
                 </template>
                 <template   v-else-if="child.moduleType=='1'">
                     <a  :href="qwdkJump+'?moduleUrl='+child.moduleUrl"  target="_blank">{{child.moduleName}}</a>
                 </template>
                 <template v-else-if="child.moduleType=='2'">
                   <a  :href="child.moduleUrl"  target="_blank">{{child.moduleName}}</a>
                 </template>

               </el-dropdown-item>
             </el-dropdown-menu>




           </el-dropdown>

           <template  v-else>
             <div :class="['navLi','el-dropdown',{'action':options=='home'}]"  >
               <span  class="el-dropdown-link  ">
               <router-link to="/index">
                 首页
               </router-link>
               </span>
             </div>
           </template>
         </template>

           <li class="name">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{userInfo.operName}}<span class="dropDown"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>


        </div>
      </div>
    </div>
    <div class="qiehuan clearfix" @click="removeEvt" v-if="userInfo.operatorType==2">
      <div class="tubiao">
        <img src="../../assets/landingpage/banben.jpg"
          alt="tubiao">
      </div>
      <div class="wenben">切换版本</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: '',
      navMenu: [],
      userInfo: '',
      isCollapse: false,
      keys:'',
      isNavShow:false,
      qwdkJump:'',//用于跳转旧版全网导客
    };
  },
  created() {
    // console.log(this.$route);
    this.judgeRouter(this.$route.path);
    this.byAccount();
    this.accountInfo();
  },
  methods: {
    navLink(command){
      if(command.moduleCode=='yxch'){
        this.$router.push('/LandingPageSetting')
      }else if(command.moduleCode=='ldymb'){
        this.$router.push('/SelectLandingPageTemplate/0')
      }
      else if(command.moduleCode=='khlb'){
        this.$router.push('/CustomerList')
      } else if(command.moduleCode=='ldjl'){
        this.$router.push('/CallerRecord/all')
      }
      else if(command.moduleCode=='yyjl'){
        this.$router.push('/ReservationRecord')
      }
      else if(command.moduleCode=='tfgl'){
        this.$router.push('/Management')
      }
      else if(command.moduleCode=='qdsjdr'){
        this.$router.push('/Assistant/uploadChannelData')
      }
      else if(command.moduleCode=="tffx-tftj"){
        this.$router.push('/ReleaseManagement')
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      this.isNavShow =true;
      this.keys =key;

    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    removeEvt(){
      window.location.href =this.userInfo.dspexUrl+'?appEnterKey='+localStorage.getItem('appEnterKey');
    },
      handleCommand() { //退出
        localStorage.setItem('yys_token','');
        localStorage.setItem('projectId','');
        localStorage.setItem('isToken','');


        window.open("about:blank","_self").close()
        window.open("","_self").close()
        window.opener=null;
        window.open('','_self');
        window.close();
        //  window.location.href = this.GLOBAL.config.exit
      },
    byAccount() {
      // 首页的菜单获取
      this.$request.get('common/menu/list/by-account', {}).then(res => {
        // console.log(res);
       /* for(var i=0;res.menu_list.length>i;i++){
          for(var n =0;res.menu_list[i].subsetList.length>n;n++){
            if(res.menu_list[i].subsetList[n].moduleCode=='yxch'){
              res.menu_list[i].subsetList[n].moduleUrl='/LandingPageSetting';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='ldymb'){
              res.menu_list[i].subsetList[n].moduleUrl='/SelectLandingPageTemplate/0';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='khlb'){
              res.menu_list[i].subsetList[n].moduleUrl='/CustomerList';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='ldjl'){
              res.menu_list[i].subsetList[n].moduleUrl='/CallerRecord/all';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='yyjl'){
              res.menu_list[i].subsetList[n].moduleUrl='/ReservationRecord';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='tfgl'){
              res.menu_list[i].subsetList[n].moduleUrl='/Management';
            }
            else if(res.menu_list[i].subsetList[n].moduleCode=='qdsjdr'){
              res.menu_list[i].subsetList[n].moduleUrl='/Assistant/uploadChannelData';
            }
          }
        }*/
        this.qwdkJump = res.qwdkJump;

        this.navMenu = res.menu_list;
        console.log(this.$store)
        this.$store.headerData =res;


      });
    },
    accountInfo() {
      // 账号基本信息
      this.$request.get('common/account-info', {}).then(res => {
        this.userInfo = res;
        // console.log(res);
        // if(res.code==1){
        //   this.
        // }
      });
    },
    handleSelect(res) {
         console.log(res)
    },
    judgeRouter(path) {
      console.log(path)
      //判断路径
      if (path === '/LandingPageSetting' ||  path=='/SelectLandingPageTemplate/:id'  || path=='/MessageSetting/:uuid/:templateId') {
        this.options = 'qdtf';
      }else  if(path=='/Management'){
        this.options = 'qdmanager';
      }else if(path=='/CallerRecord/:callType' || path=='/ReservationRecord' || path=='/CustomerList' ){
        this.options = 'khgl';
      }else if(path=='/index'){
        this.options = 'home';
      }else if(path=='/Assistant/uploadChannelData'){
        this.options = 'yyzs';
      }
      else if(path=='/ReleaseManagement'){
        this.options = 'tffx';
      }
    },
    flushCom: function() {
      this.$router.go(0);
    }
  },
  watch: {
    '$route'(val) {
      console.log(val.matched[0].path)
      this.judgeRouter(val.matched[0].path);
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
  .navBox{
    background:#1f2d3d;
    border: 0px;
    border-radius: 0px;
    margin-top: -1px;
    width: 110px;
    font-size: 14px;
    .el-dropdown-menu__item{
      color: #fff;
      padding: 0px;
      text-align: center;
      width: 110px;
      font-size: 14px;
    }
    .el-dropdown-menu__item:hover{
      background: #0077ff;
    }
    .popper__arrow::after{
      background:#1f2d3d;
      display: none;
    }
  }

.headBg {
  background: rgba(31, 45, 61, 1);
}
.bgShow{
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 500;

}
.head {
  height: 80px;
  width: 1440px;
  margin: 0px auto;
  .logo {
    padding-top: 28px;
    padding-left: 30px;
    float: left;
    img {
      width: 104px;
      height: 25px;
    }
  }
  .line {
    float: left;
    margin-left: 14px;
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 1);
    opacity: 0.35;
    margin-top: 30px;
  }
  h2 {
    margin: 0;
    height: 24px;
    font-size: 24px;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    padding-top: 28px;
    padding-left: 15px;
    float: left;
  }
  .nav {
    float: right;
    height: 80px;
    line-height: 78px;
    .el-dropdown{
       color: #ffffff !important;
    }
    .navLi{
      width: 110px;
      text-align: center;
      .el-dropdown-link{
        cursor: pointer;
        outline:none
      }
    }
    .action{
      border-bottom: 2px solid #0077ff;
    }

    ul {
      margin: 0;
      padding: 0;
      height: 36px;
      color: rgba(138, 150, 160, 1);
      float: left;
    }
    .active:before {
      display: inline-block;
      content: '';
      position: absolute;
      bottom: -35px;
      width: 56px;
      height: 4px;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 119, 255, 1);
    }
    .name {
      display: inline-block;
      margin-left: 20px;
      padding-left: 30px;
      height: 20px;
      line-height: 23px;
      margin-top: 20px;
      color: rgba(255, 255, 255, 1);
      background: url('../../assets/images/1.jpg') center left no-repeat;
      .dropDown {
        float: right;
        margin-left: 33px;
        margin-right: 37px;
        margin-top: 9px;
        width: 10px;
        height: 5px;
        background: url('../../assets/images/dropDown1.png') no-repeat;
      }
    }
  }
}
.qiehuan {
  // 切换版本
  width: 32px;
  height: 112px;
  display: block;
  position: absolute;
  background: rgba(31, 45, 61, 1);
  right: 0px;
  bottom: 793px;
  top: 261px;
  cursor: pointer;
  // background: brown;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.35);
  border-radius: 3px 0px 0px 3px;
  opacity: 0.9;
  .tubiao {
    width: 14px;
    height: 12px;
    // margin: 0 auto;
    // // background: rgba(255, 255, 255, 1);
    // margin-top: 9px;
    // padding-right: 9px;
  }
  .wenben {
    width: 11px;
    height: 60px;
    margin: 0 auto;
    font-size: 11px;
    color: rgba(255, 255, 255, 1);
    line-height: 15px;
    margin-top: 18px;
  }
}
</style>
