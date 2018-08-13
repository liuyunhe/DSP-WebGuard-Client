<template>
    <section class="view-container clearfix">
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
         <el-button size="small fr" type="primary" @click="EditCustomer()" style="margin-left:12px">编辑</el-button>
        <el-button size="small fr" class="important" @click="$router.go(-1)" >返回</el-button>
      </el-col>

     <!--基本资料-->
      <div class="biaoti">
        <span>基本资料</span>
      </div>
     <div class="ziliao clearfix">
       <ul>
         <li>客户姓名</li>
         <li>客户性别</li>
         <li>工作区域</li>
         <li>客户类型</li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.cstName}}</li>
         <li>{{cstInfo.gender}}</li>
         <li>{{cstInfo.workArea}}</li>
         <li>{{cstInfo.collectionMethod}}</li>
       </ul>
       <ul>
         <li>手机号码</li>
         <li>客户职业</li>
         <li>交通方式</li>
         <li>认知途径</li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.mobilePhone}}</li>
         <li>{{cstInfo.workType}}</li>
         <li>{{cstInfo.transportationTypeName}}</li>
         <li>{{cstInfo.cognitiveApproach}}</li>
       </ul>
       <ul>
         <li>所属项目</li>
         <li>客户年龄</li>
         <li>归属置业顾问</li>
         <li></li>
       </ul>
       <ul class="khxx" :v-model="cstInfo">
         <li class="xm" style="line-height:18px">{{cstInfo.projectName}}</li>
         <li>{{cstInfo.ageGroup}}</li>
         <li>{{cstInfo.consultantName}}</li>
         <li></li>
       </ul>
        <ul>
         <li>客户状态</li>
         <li>居住区域</li>
         <li>号码归属地</li>
         <li></li>
       </ul>
        <ul class="khxx" :v-model="cstInfo">
         <li>{{cstInfo.cstStatus}}</li>
         <li>{{cstInfo.homeArea}}</li>
         <li>{{cstInfo.mobileCity}}</li>
         <li></li>
       </ul>
     </div>

      <!--需求信息-->
      <div class="bt">
        <span>需求信息</span>
      </div>
     <div class="xuqiu clearfix">
       <ul>
         <li>需求类型</li>
         <li>需求户型</li>
       </ul>
       <ul class="khxx" :v-model="needInfo">
         <li>{{needInfo.needType}}</li>
         <li>{{needInfo.yxFangXing}}</li>
       </ul>
       <ul>
         <li>付款方式</li>
         <li>置业目的</li>
       </ul>
       <ul class="khxx" :v-model="needInfo">
         <li>{{needInfo.payWay}}</li>
         <li>{{needInfo.purpose}}</li>
       </ul>
       <ul>
         <li>预算单价</li>
         <li>意向程度</li>
       </ul>
       <ul class="khxx" :v-model="needInfo">
         <li>{{needInfo.budgetUnit}}</li>
         <li>{{needInfo.intentionalDegree}}</li>
       </ul>
        <ul>
         <li>需求面积</li>
         <li>备注</li>
       </ul>
        <ul class="khxx" :v-model="needInfo">
         <li>{{needInfo.yxArea}}</li>
         <li>{{needInfo.remark}}</li>
       </ul>
     </div>

       <!-- 预约信息 -->
      <div class="bt">
        <span>预约信息</span>
      </div>
     <div class="yyxx clearfix">
       <ul>
         <li>搜索关键词</li>
         <li>访问设备</li>
         <li>IP归属城市</li>
       </ul>
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
          <li v-if="typeof bespeakInfo.pageUrl!='undefined'"><el-button type="text" size="small" @click="link(bespeakInfo.pageUrl)" class="operation" style="text-decoration: underline;">链接</el-button></li>
           <li v-else></li>


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

    <!--预约信息-->
     <div class="bt">
        <span>通话记录</span>
      </div>
  <section class="listTables"
    style="width:1212px;height:212px">
      <el-table
      :data="callList"
      v-loading="loading"
      style="width:1212px;height:212px;">
        <el-table-column
          width="100">
        </el-table-column>

        <el-table-column
          type="index"
          label="序号"
          width="120">
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="contactTypeName"
          width="120"
          label="类型">
        </el-table-column>

        <el-table-column
          prop="phone"
          width="180"
          label="接电号码/外呼号码">
        </el-table-column>

        <el-table-column
          prop="contactOpr"
          label="置业顾问"
          width="120">
        </el-table-column>

        <el-table-column
          prop="callOpTime"
          width="180"
          label="通话时间">
          <template slot-scope="scope">
            {{ timestampToDate('Y-m-d H:i:s',scope.row.callOpTime/1000)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="callTimes"
          label="通话时长"
          width="120">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="width:32px" @click="recording = true;getCdrRecord(scope)">录音</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

     <div class="jdjl">
        <span>进度记录</span>
      </div>
    <section class="listTables"
    style="width:1212px;height:212px">
      <el-table
      :data="ctoBhaTouchList"
      v-loading="loading"
      style="width:1212px;height:212px;">
        <el-table-column
          width="100">
        </el-table-column>

        <el-table-column
          type="index"
          label="序号"
          width="200">
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目名称"
          width="200">
        </el-table-column>

        <el-table-column
          prop="contactTypeName"
          width="200"
          label="进度类型">
        </el-table-column>

        <el-table-column
          prop="contactOpr"
          label="置业顾问"
          width="200">
        </el-table-column>

        <el-table-column
          prop="contactTime"
          label="记录时间"
          width="200">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="width:32px" @click="getQueryProgressDetail(scope);">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>


   <!-- 录音 -->
   <div class="recording">
      <el-dialog
      title="录音"
      :visible.sync="recording"
      width="630px"
      height="279px">
      <div class="record clearfix">
        <ul>
          <li>归属项目:</li>
          <li>接电人员:</li>
        </ul>
        <ul class="recordlist" :v-model="recordInfo">
          <li>{{recordInfo.projectName}}</li>
          <li>{{recordInfo.consultantName}}</li>
        </ul>
        <ul class="recordli">
          <li>客户号码:</li>
          <li>来电时间:</li>
        </ul>
        <ul class="recordlist" :v-model="recordInfo">
          <li>{{recordInfo.mobilePhone}}</li>
          <li>{{recordInfo.callinTime}}</li>
        </ul>
      </div>
      <template :v-model="recordInfo">
        <div>
          <audio :src="recordInfo.recordFile" controls="controls" style="width:540px;height:54px;margin-top:40px;border-radius:0;background: #F1F3F4;">

          </audio>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button style="width:64px;height:36px;line-height:10px;" @click="recording = false">取 消</el-button>
        <el-button type="primary" style="width:64px;height:36px;line-height:10px;" @click="recording = false">确 定</el-button>
      </span>
    </el-dialog>
   </div>

     <!-- 外呼 -->
    <!-- <div class="outbound">
      <el-dialog title="外呼人员号码确认" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="外呼人员号码">
            <el-select v-model="form.region" placeholder="13766066200"></el-select>
            <span class="custom">自定义</span>
          </el-form-item>
        </el-form>
        <span class="wh">(外呼人员默认为项目管理员号码,如需更换外呼人员点击自定义)</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Outbound = false">取 消</el-button>
          <el-button type="primary" @click="Outbound = false">呼叫</el-button>
        </div>
      </el-dialog>
    </div> -->

      <!-- 来电详情 -->
       <!-- :disabled="true" 禁用 -->
     <div class="callerre">
     <el-dialog title="来电详情" :visible.sync="ctoBhaCalls" width="760px" height="264px">
      <el-form :v-model="ctoBhaCall">
        <el-form-item label="手机号码">
          <el-input v-model="ctoBhaCall.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="接电号码" style="margin-left:250px;margin-top:-54px;" >
          <el-input v-model="ctoBhaCall.callPhone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="接电人员" style="margin-left:500px;margin-top:-54px;">
          <el-input v-model="ctoBhaCall.callOperator" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通话状态" >
          <el-input v-model="ctoBhaCall.callStatus" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通话时间" style="margin-left:250px;margin-top:-54px;">
          <el-input v-model="ctoBhaCall.createtime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通话时长" style="margin-left:500px;margin-top:-54px;">
          <el-input v-model="ctoBhaCall.callTimes" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="margin-top: -16px;">
        <el-button @click="ctoBhaCalls = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
        <el-button type="primary" @click="ctoBhaCalls = false" style="width:64px;height:36px;line-height:10px;">确 定</el-button>
      </div>
    </el-dialog>
    </div>

      <!-- 来访详情 -->
     <div class="visit">
     <el-dialog title="来访详情" :visible.sync="ctoBhaVisits" width="527px" height="332px">
      <el-form :v-model="ctoBhaVisit">
        <el-form-item label="到访时间">
          <el-input v-model="ctoBhaVisit.visitTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="到访类型" style="margin-left:246px;margin-top:-54px;" >
          <el-input v-model="ctoBhaVisit.visitType" :disabled="true"></el-input>
        </el-form-item>
        <div class="demand">
          <div class="left"><span>需求备注</span></div>
          <div class="right">
            <el-input type="textarea" v-model="ctoBhaVisit.note" :disabled="true"></el-input>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 106px;">
        <el-button @click="ctoBhaVisits = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
        <el-button type="primary" @click="ctoBhaVisits = false" style="width:64px;height:36px;line-height:10px;">确 定</el-button>
      </div>
    </el-dialog>
    </div>

      <!-- 认筹信息 -->
     <div class="visit">
     <el-dialog title="认筹信息" :visible.sync="ctoBhaSureBuys" width="527px" height="332px">
      <el-form :v-model="ctoBhaSureBuy">
        <el-form-item label="认筹时间">
          <el-input v-model="ctoBhaSureBuy.sureBuyTime" :disabled="true"></el-input>
        </el-form-item>
        <div class="demand">
          <div class="left"><span>需求备注</span></div>
          <div class="right">
            <el-input type="textarea" v-model="ctoBhaSureBuy.note" :disabled="true"></el-input>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top: 106px;">
        <el-button @click="ctoBhaSureBuys = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
        <el-button type="primary" @click="ctoBhaSureBuys = false" style="width:64px;height:36px;line-height:10px;">确 定</el-button>
      </div>
    </el-dialog>
    </div>

    <!-- 认购信息 -->
     <div class="subscription">
     <el-dialog title="认购信息" :visible.sync="ctoBhaBuys" width="760px">
      <el-form :v-model="ctoBhaBuy">
        <el-form-item label="认购时间">
          <el-input v-model="ctoBhaBuy.buyTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房源地址" style="margin-left:250px;margin-top:-54px;" >
          <el-input v-model="ctoBhaBuy.houseAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房源类型" style="margin-left:500px;margin-top:-54px;">
          <el-input v-model="ctoBhaBuy.udClientDemand" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房号" style="margin-left:24px;">
          <el-input v-model="ctoBhaBuy.houseRoomNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总成交价" style="margin-left:250px;margin-top:-54px;">
          <el-input v-model="ctoBhaBuy.afterDiscountPrice" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div class="demand">
          <div class="left"><span>需求备注</span></div>
          <div class="right">
            <el-input type="textarea" v-model="ctoBhaBuy.note" :disabled="true"></el-input>
          </div>
        </div>

      <div slot="footer" class="dialog-footer" style="margin-top: 76px;">
        <el-button @click="ctoBhaBuys = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
        <el-button type="primary" @click="ctoBhaBuys = false" style="width:64px;height:36px;line-height:10px;">确 定</el-button>
      </div>
    </el-dialog>
    </div>

      <!-- 签约信息 -->
     <div class="contract">
     <el-dialog title="签约信息" :visible.sync="ctoBhaSigns" width="760px">
      <el-form :model="ctoBhaSign">
        <el-form-item label="认购时间">
          <el-input v-model="ctoBhaSign.dealTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房源地址" style="margin-left:250px;margin-top:-54px;" >
          <el-input v-model="ctoBhaSign.houseAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房源类型" style="margin-left:500px;margin-top:-54px;">
          <el-input v-model="ctoBhaSign.udClientDemand" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房号" style="margin-left:24px;">
          <el-input v-model="ctoBhaSign.houseRoomNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总成交价" style="margin-left:250px;margin-top:-54px;">
          <el-input v-model="ctoBhaSign.afterDiscountPrice" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="成交编码" style="margin-left:500px;margin-top:-54px;">
          <el-input v-model="ctoBhaSign.dealCode" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div class="demand">
          <div class="left"><span>需求备注</span></div>
          <div class="right">
            <el-input type="textarea" v-model="ctoBhaSign.note" :disabled="true"></el-input>
          </div>
        </div>

      <div slot="footer" class="dialog-footer" style="margin-top: 76px;">
        <el-button @click="ctoBhaSigns = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
        <el-button type="primary" @click="ctoBhaSigns = false" style="width:64px;height:36px;line-height:10px;">确 定</el-button>
      </div>
    </el-dialog>
    </div>

     <!-- 预约详情 -->
    <div class="appointment">
      <el-dialog title="预约详情" :visible.sync="bespeakRecords" width="760px" height="354px">
        <el-form :v-model="bespeakRecord">
          <el-form-item label="搜索关键词">
            <el-input v-model="bespeakRecord.keyWord" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="来源渠道" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.channelName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="浏览时长" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.pageViewTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="MAC">
            <el-input v-model="bespeakRecord.mac" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="访问设备" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.equipment" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="IMEI" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.imei" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input v-model="bespeakRecord.ip" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="IP归属城市" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.ipCity" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="点击时间" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="bespeakRecord.clickTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="来源落地页">
            <span style="margin-left: 12px;color: #409EFF;text-decoration:underline;" @click="link(bespeakRecord.pageUrl)">落地页链接</span>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="bespeakRecords = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
          <el-button type="primary" @click="bespeakRecords = false" style="width:64px;height:36px;line-height:10px;">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

      <footerA style="position: fixed;bottom:0px"></footerA>
    </section>
</template>

<script src="./script.js"></script>
<style lang="scss" type="text/scss" src="./style.scss">
</style>


