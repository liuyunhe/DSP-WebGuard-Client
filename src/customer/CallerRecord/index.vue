<template>
  <section class="CallRecords">
    <div class="CallRecordsTitle">
      <!--面包屑-->
      <div class="breadcrumb-container">
        来电记录
      </div>

      <div class="toolbar">
        <el-radio-group v-model="callType" size="small" @change="changeCallType">
          <el-radio-button v-for="(item,i) in  initList.callTypeList" :label="item.code" :key="i">{{item.value}}
          </el-radio-button>
        </el-radio-group>
      </div>


      <!--查询表单-->
      <section class="projectS">
        <div class="left">

          <div class="type1">
            <el-select v-model="type" slot="prepend" placeholder="请选择" class="typeClass"
                       size="small">

              <el-option
                v-for="item in initList.conditionList"
                :key="item.code"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select
              v-model="formQueryCallerList.keyWord"
              filterable
              reserve-keyword
              placeholder="手机号码/客户姓名/归属项目/接电人员"
              :filter-method="BespeakRecordKeyword"
              @change="pushTagesList('搜索关键字：'+formQueryCallerList.keyWord, 'keyWord',formQueryCallerList.keyWord)"
              :loading="loading" size="mini" class="serachS">
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.detail"
                :value="item.detail">
                <span style="float: left">{{ item.detail }}</span>
                <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.source }}</span>
              </el-option>
            </el-select>
          </div>

        </div>
        <div  class="isNoOwnership" v-if="callType!='notDialing'">
          <el-checkbox v-model="isNoOwnership" @change="Nochange">无归属项目</el-checkbox>
        </div>

        <div class="right" style="text-align: right">
          <el-button plain size="medium" @click=" customerExport()">导 出</el-button>
          <el-button plain size="medium" @click=" rest()">重 置</el-button>
          <el-button type="primary" size="medium" @click="formQueryCallerList.pageNo=1;queryCallerListFun()">查 询
          </el-button>
        </div>


        <div class="tagList" v-if="tags.length>0">
          已选条件
          <el-tag
            v-for="tag in tags"
            :key="tag.type"
            @close="handleClose(tag)"
            closable>
            {{tag.name}}
          </el-tag>
        </div>
      </section>
    </div>

    <!--列表-->

    <!--选择项目-->
    <div class="projectBox">
      <el-dialog
        title="选择项目"
        :visible.sync="dialogVisibleProjectList"
        width="30%"
        :before-close="handleCloseProject">
        <div class="main">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input
                placeholder="输入关键字进行过滤" size="small"
                v-model="searchKeyfilterText">
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="getOrginfoAndProjectList"  size="small">查 询</el-button>
            </el-col>

          </el-row>

          <div  class="selectedText">
            已选：<template v-for="item in getClickProjectList"> {{item}}、</template>
          </div>

          <el-tree
            class="filter-tree"
            :data="ProjectListData"
            node-key="id"
            @check-change="getClickProject"
            :props="defaultProps"
            :default-expand-all="false"
            show-checkbox
            ref="tree">
          </el-tree>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
  </span>
      </el-dialog>
    </div>



    <section class="adServingTable">

      <div  class="dialogVisibleProjectList"  @click="dialogVisibleProjectList=true;">
          <span  class="title" >归属项目</span>
      </div>

      <!-- @command="handleCommandStatus" -->
      <div class="tableStatus">
        <el-popover
          placement="bottom"
          v-model="customer_listBox"
          width="50"
          trigger="click">
          <el-checkbox :indeterminate="isCustomer_listAll" v-model="customer_listAll" @change="CheckedCustomer_listAll">
            全部
          </el-checkbox>
          <el-checkbox-group v-model="customer_listChecked" @change="CheckedCustomer_list">
            <el-checkbox v-for="item in  initList.cstValidityList" :label="item.value" :key="item.value">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="saveCheckeds">确定</el-button>
          <span slot="reference" class="title">客户有效性</span>
        </el-popover>
      </div>

      <div class="tableIntention">
        <el-popover
          placement="bottom"
          width="50"
          v-model="channelBox"
          trigger="click">
          <el-checkbox :indeterminate="isChannel" v-model="channelAll" @change="CheckedChannelAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="channelChecked" @change="CheckedChannel">
            <el-checkbox v-for="item in  initList.channel" :label="item.value" :key="item.code">{{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecChannel">确定</el-button>
          <span slot="reference" class="title">来源渠道</span>
        </el-popover>
      </div>

      <!-- @change="searchList" -->
      <div class="tabDatePick">
        <el-date-picker
          type="datetimerange"
          v-model="establishDate"
          clearable
          range-separator="来电时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00','23:59:59']"
          class="dateHeader">
        </el-date-picker>
      </div>

      <!-- :data="listData" -->
      <el-table :data="listData" v-loading="loading">
        <el-table-column
          width="10">
        </el-table-column>

        <el-table-column
          prop="mobilePhone"
          label="手机号码"
          width="130">
        </el-table-column>

        <el-table-column
          prop="cstName"
          label="客户姓名"
          width="130">
        </el-table-column>

        <el-table-column
          width="200"
          label=""
          prop="projectName">
        </el-table-column>

        <el-table-column
          width="130"
          prop="consultantName"
          label="接电人员">
        </el-table-column>


        <el-table-column
          prop="status"
          label=""
          width="150">
        </el-table-column>

        <el-table-column
          prop="createTime"
          width="150"
          label="">
          <template slot-scope="scope">
            {{ timestampToDate('Y-m-d H:i:s',scope.row.createTime/1000)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="callDuration"
          label="通话时长"
          width="150">
        </el-table-column>

        <el-table-column
          prop="channelName"
          width="120"
          label="">
        </el-table-column>

        <el-table-column
          prop="keyword"
          width="100"
          label="关键词">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">

             <!-- <el-button type="text" size="small" class="el-button-h" @click="click_detail">
                <router-link :to="'/Access/collectDetail/'+scope.row.project_id">详情</router-link>
              </el-button> -->

               <!-- this.$router.push('/CallDetails/' + index.row.uuid); -->

              <el-button type="text" size="small" @click="callerCustomerDetail(scope)">
                     详情
                </el-button>
              <el-button type="text" size="small"  v-if=" scope.row.callResult != '0' && scope.row.callResult != '2' " @click="recording = true;callerGetRecord(scope)">录音</el-button>


               <!-- || scope.row.callDuration==''  -->

        <!--    <template  v-else slot-scope="scope">
              <el-button type="text" size="small" @click="callerCustomerDetail(scope)">详情</el-button>
              &lt;!&ndash;<el-button type="text" size="small" @click="configuration(scope)">补录</el-button>&ndash;&gt;

            </template>-->


          </template>
        </el-table-column>
      </el-table>
    </section>

    <!--工具条-->
    <section class="adPage" v-if="listData.length>0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="formQueryCallerList.pageNo"
        :page-size="10"
        background
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <div class="pageLeft">
        共 <span>{{total}}</span>个客户，今日新增{{newlyNumber}}条<!--，第 {{currentPage}} / {{ Math.ceil(total/10)}} 页-->
      </div>
    </section>

    <!-- 来电详情 -->
    <div class="callerre">
      <el-dialog title="来电详情" :visible.sync="dialogFormVisible" width="760px" height="264px">
        <el-form :model="form">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="接电号码" style="margin-left:250px;margin-top:-54px;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="接电人员" style="margin-left:500px;margin-top:-54px;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="通话状态">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="通话时间" style="margin-left:250px;margin-top:-54px;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="通话时长" style="margin-left:500px;margin-top:-54px;">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="margin-top: -16px;">
          <el-button @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 录音 -->
   <div class="recording luyin">
      <el-dialog
      title="录音"
      :visible.sync="recording"
      :before-close="handleCloseBox"
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
          <li>{{timestampToDate('Y-m-d H:i:s',recordInfo.callinTime/1000)}}</li>
        </ul>
      </div>
      <template :v-model="recordInfo">
        <div>
          <audio :src="recordInfo.recordFile" id="audio" controls="controls" style="width:540px;height:54px;margin-top:20px;border-radius:0;background: #F1F3F4;">
          </audio>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button size="small" @click="handleCloseBox">取 消</el-button> -->
         <el-button type="primary" size="small" @click="copyUrl" >复制录音链接</el-button>
        <el-button type="primary" size="small"  @click="handleCloseBox">确 定</el-button>
      </span>
    </el-dialog>
   </div>

    <footerA style="position: fixed;bottom:0px"></footerA>
  </section>
</template>


<script src="./script.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>


