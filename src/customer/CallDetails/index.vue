<template>
    <section class="view-container clearfix  cellDateile">
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
         <!-- <el-button size="small fr" class="important"  type="primary" @click="addTemplate" style="margin-left:12px;color:#ffffff">保存</el-button> -->
        <el-button size="small fr" class="important" @click="$router.go(-1)">返回</el-button>
      </el-col>

     <!--基本资料-->
      <div class="biaoti">
        <span>基本资料</span>
      </div>
     <div class="ziliao clearfix">
       <ul>
         <li>客户姓名</li>
         <li>客户类型</li>
         <li>通话时长</li>
         <li>意向程度</li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.cstName}}</li>
         <li>{{cstInfo.collectionMethod}}</li>
         <li>{{cstInfo.callDuration}}</li>
         <li>{{cstInfo.intentionalDegree}}</li>
       </ul>
       <ul>
         <li>手机号码</li>
         <li>接电号码</li>
         <li>通话时间</li>
         <li>需求备注</li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.mobilePhone}}</li>
         <li>{{cstInfo.consultantPhone}}</li>
         <li>{{cstInfo.callinTime}}</li>
         <li>{{cstInfo.remark}}</li>
       </ul>
       <ul>
         <li>所属项目</li>
         <li>接电人员</li>
         <li>录音</li>
         <li></li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.projectName}}</li>
         <li>{{cstInfo.consultantOper}}</li>
         <li>{{cstInfo.sessionUuid}}</li>
         <li></li>
       </ul>
        <ul>
         <li>号码归属地</li>
         <li>归属营业顾问</li>
         <li>客户有效性</li>
         <li></li>
       </ul>
        <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.mobileCity}}</li>
         <li>{{cstInfo.consultantName}}</li>
         <li>{{cstInfo.status}}</li>
         <li></li>
       </ul>
     </div>

      <!--需求信息-->
      <div class="bt">
        <span>预约信息</span>
      </div>
     <div class="yyxx clearfix">
       <ul>
         <li>搜索关键词</li>
         <li>访问设备</li>
         <li>IP归属城市</li>
       </ul>
       <!-- :v-for="callerDetail" -->
       <ul class="khxx" :v-model="bespeakInfo">
         <li>{{bespeakInfo.keyword}}</li>
         <li>{{bespeakInfo.equipment}}</li>
         <li>{{bespeakInfo.ipCity}}</li>
       </ul>
       <ul>
         <li>来源渠道</li>
         <li>IMEI</li>
         <li>点击时间</li>
       </ul>
       <ul class="khxx" :v-model="bespeakInfo">
         <li>{{bespeakInfo.channelName}}</li>
         <li>{{bespeakInfo.imei}}</li>
         <li>{{bespeakInfo.clickTime}}</li>
       </ul>
       <ul>
         <li>来源落地页</li>
         <li>MAC</li>
         <li></li>
       </ul>
       <ul class="khxx" :v-model="bespeakInfo">
         <!-- <li>{{callerDetail.pageUrl}}</li> -->
         <li><el-button type="text" size="small" @click="link(bespeakInfo.pageUrl)" class="operation" style="text-decoration: underline;">链接</el-button></li>
         <li>{{bespeakInfo.mac}}</li>
       </ul>
        <ul>
         <li>浏览时长</li>
         <li>IP地址</li>
       </ul>
        <ul class="khxx" :v-model="bespeakInfo">
         <li>{{bespeakInfo.pageViewTime}}秒</li>
         <li>{{bespeakInfo.ipAdress}}</li>
       </ul>
     </div>
      <footerA style="position: fixed;bottom:0px"></footerA>
    </section>
</template>

<script src="./script.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>
