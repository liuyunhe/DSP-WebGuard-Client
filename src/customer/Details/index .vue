<template>
    <section class="view-container clearfix  callerreDetail">
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-button size="small fr" class="important" @click="$router.go(-1)" style="width: 100px;height: 32px;">返回</el-button>
      </el-col>

     <!--基本资料-->
      <div class="biaoti">
        <span>基本资料</span>
      </div>
     <div class="ziliaos clearfix">
       <ul>
         <li>客户姓名</li>
         <li>客户类型</li>
         <li>需求备注</li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>{{bespeakRecordInfo.cstName}} </li>
         <li v-if="bespeakRecordInfo.intentionalDegree =='directcall'">主动来电</li>
         <li v-else-if="bespeakRecordInfo.intentionalDegree =='bespeak'">留电预约</li>
         <li>{{bespeakRecordInfo.remark}}</li>
       </ul>
       <ul>
         <li>手机号码</li>
         <li>归属置业顾问</li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>{{bespeakRecordInfo.mobilePhone}}</li>
         <li>{{bespeakRecordInfo.consultantName}}</li>
       </ul>
       <ul>
         <li>所属项目</li>
         <li>客户有效性</li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>万科春风十里</li>
         <li>{{bespeakRecordInfo.status}}</li>
       </ul>
        <ul>
         <li>号码归属地</li>
         <li>意向程度</li>
       </ul>
        <ul class="khxx" :v-model="bespeakRecordInfo">
          <li><template v-if="bespeakRecordInfo.province" >{{ bespeakRecordInfo.province}}省</template> {{bespeakRecordInfo.mobileCity}}</li>
         <li>{{bespeakRecordInfo.intentionalDegree}}</li>
       </ul>
     </div>

      <!--需求信息-->
      <div class="bt">
        <span>需求信息</span>
      </div>
     <div class="xuqiu clearfix">
       <ul>
         <li>搜索关键词</li>
         <li>访问设备</li>
         <li>IP归属城市</li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>{{bespeakRecordInfo.keyword}}</li>
         <li>{{bespeakRecordInfo.equipment}}</li>
         <li>{{bespeakRecordInfo.ipCity}}</li>
       </ul>
       <ul>
         <li>來源渠道</li>
         <li>IMEI</li>
         <li>预约时间</li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>银行转账</li>
         <li>{{bespeakRecordInfo.imei}}</li>
         <li>{{ timestampToDate('Y-m-d H:i:s',bespeakRecordInfo.createTime/1000)}}</li>
       </ul>
       <ul>
         <li>来源落地页</li>
         <li>MAC</li>
         <li></li>
       </ul>
       <ul class="khxx" :v-model="bespeakRecordInfo">
         <li><el-button type="text" size="small" @click="link(bespeakRecordInfo.url)" class="operation" style="text-decoration: underline;">链接</el-button></li>
         <li>{{bespeakRecordInfo.mac}}</li>
         <li></li>
       </ul>
        <ul>
         <li>浏览时长</li>
         <li>IP地址</li>
         <li></li>
       </ul>
        <ul class="khxx" :v-model="bespeakRecordInfo">
         <li>{{bespeakRecordInfo.pageViewTime}}秒</li>
         <li></li>
         <li></li>
       </ul>
     </div>
      <footerA style="position: fixed;bottom:0px"></footerA>
    </section>
</template>

<script src="./script.js"></script>
<style lang="scss" type="text/scss" src="./style.scss">
</style>
