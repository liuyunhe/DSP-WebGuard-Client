<template>
  <div class="releaseManagementData">
    <div class="header_title">
      <h2>投放统计</h2>
    </div>
    <div class="toolbar" style="margin-top:32px">
      <el-radio-group v-model="callType" size="small" @change="changeCallType">
        <el-radio-button v-for="(item,i) in  tabs" :label="item.value" :key="i">{{item.name}}
        </el-radio-button>
      </el-radio-group>
    </div>
    <router-view></router-view>

  </div>
</template>

<style type="text/css" lang="scss">
  .releaseManagementData{
    width: 1380px;
    margin: 0 auto;
    .header_title{
      height: 77px;
      border-bottom: 1px solid #F2F4F8;
      h2 {
        height: 17px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #1A173B;
        line-height: 77px;
      }
    }
    .el-tabs__header{
      margin-bottom: 30px;
    }
  }
</style>

<script>
  export default {
    name: "",
    data() {
      return {
        tabs:[
          {
            name:"按活动",
            value:"ByActivity"
          },
          {
            name:"按项目",
            value:"ByItem"
          },
          {
            name:"按机构",
            value:"ByOrganization"
          },
          {
            name:"按城市",
            value:"ByCity"
          },
          {
            name:"按渠道",
            value:"ByChannel"
          }
        ],
        callType:"ByActivity",
      }
    },
    created(){
      if(this.$route.path=="/ReleaseManagement/ByActivity"){
        this.callType = "ByActivity"
      }else if(this.$route.path=="/ReleaseManagement/ByItem"){
        this.callType = "ByItem"
      }else if(this.$route.path=="/ReleaseManagement/ByOrganization"){
        this.callType = "ByOrganization"
      }else if(this.$route.path=="/ReleaseManagement/ByCity"){
        this.callType = "ByCity"
      }else if(this.$route.path=="/ReleaseManagement/ByChannel"){
        this.callType = "ByChannel"
      }

    },
    methods:{
      changeCallType(val) {
        this.$router.push('/ReleaseManagement/' + val);
      }
    }
  }
</script>
