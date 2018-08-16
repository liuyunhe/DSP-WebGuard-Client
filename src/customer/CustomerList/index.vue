<template>
  <section class="customerListM">
    <header>
      <!-- 面包屑 -->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24" style="padding-bottom: 0px;">

        <div class="projectS">
          <div class="left">
            <template v-if="type=='全部'">
              <div class="type1">
                <el-select v-model="type" slot="prepend" placeholder="请选择" class="typeClass"
                           size="small">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select
                  v-model="formQueryCustomersList.keyWord"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="手机号码/客户姓名/归属项目/置业顾问"
                  :remote-method="remoteMethod"
                  @change="pushTagesList('搜索关键字：'+formQueryCustomersList.keyWord, 'keyWord',formQueryCustomersList.keyWord)"
                  :loading="loading" size="mini" class="serachS" ref="yang">
                  <el-option
                    v-for="(item,i) in options.keywordList"
                    :key="i"
                    :label="item.completionName"
                    :value="item.completionName">
                    <span style="float: left">{{ item.completionName }}</span>
                    <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.source }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>

            <template v-else-if="type!='全部'">
              <div class="type2">
                <el-select v-model="type" slot="prepend" placeholder="请选择" class="typeClass"
                           size="small">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-input v-model="keyWordText" placeholder="请输入" class="serachS"
                          @blur="pushTagesList('条件查询：' + keyWordText, 'keyWord', keyWordText);"></el-input>
              </div>
            </template>


          </div>


          <div class="right">
            <div class="buttons">
              <el-button size="small" class="important" @click="imports = true">导入</el-button>
              <el-button size="small" class="important" @click="customerExport">导出</el-button>
              <el-button size="small" class="important" @click=" queryConsultantList()">分配
              </el-button>
              <el-button size="small" class="important" @click="recovery()">回收</el-button>
            </div>
          </div>


        </div>


      </el-col>

      <el-col :span="24" class="toolbar" style="margin-left: 12px;">
        <label class="el-form-item__label" style="line-height: 30px" v-if="tags.length<=0">已选条件：</label>
        <el-tag style="margin-left: 12px;"
                v-for="tag in tags"
                :key="tag.name"
                @close="handleClose(tag)"
                closable
                :type="tag.type">
          {{tag.name}}
        </el-tag>
        <div class="buttonlis">
          <el-button size="small" class="important" @click="getStatus">重置</el-button>
          <el-button type="primary" size="small" @click="queryCustomersList">查询</el-button>
        </div>
      </el-col>
    </header>

    <!--列表-->

    <section class="adServingTable">

      <div class="tabDatePick">
        <el-date-picker
          type="datetimerange"
          v-model="guestDate"
          clearable
          range-separator="获客时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00','23:59:59']"
          class="dateHeader">
        </el-date-picker>
      </div>


      <div  class="dialogVisibleProjectList"  @click="dialogVisibleProjectList=true;getOrginfoAndProjectList()">
        <span  class="title" >归属项目</span>
      </div>

      <!-- @command="handleCommand" -->
      <div class="customer_list">
        <el-popover
          placement="bottom"
          v-model="customer_listBox"
          width="50"
          trigger="click">
          <el-checkbox :indeterminate="isCustomer_listAll" v-model="customer_listAll" @change="CheckedCustomer_listAll">
            全部
          </el-checkbox>
          <el-checkbox-group v-model="customer_listChecked" @change="CheckedCustomer_list">
            <el-checkbox v-for="item in  customersListConditionList.cstTypeList" :label="item.value" :key="item.value">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="saveCheckeds">确定</el-button>
          <span slot="reference" class="title">客户类型</span>
        </el-popover>

      </div>

      <!-- @command="handleCommandStatus" -->
      <div class="tableStatus">
        <el-popover
          placement="bottom"
          width="50"
          v-model="cstStatusListBox"
          trigger="click">
          <el-checkbox :indeterminate="isCstStatusList" v-model="cstStatusListAll" @change="CheckedCstStatusListAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="cstStatusListChecked" @change="CheckedCstStatusList">
            <el-checkbox v-for="item in  customersListConditionList.cstStatusList" :label="item.value" :key="item.code">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecStStatusList">确定</el-button>
          <span slot="reference" class="title">客户状态</span>
        </el-popover>
      </div>

      <div class="tableChannel">

        <el-popover
          placement="bottom"
          width="50"
          v-model="channelBox"
          trigger="click">
          <el-checkbox :indeterminate="isChannel" v-model="channelAll" @change="CheckedChannelAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="channelChecked" @change="CheckedChannel">
            <el-checkbox v-for="item in  customersListConditionList.channel" :label="item.value" :key="item.code">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecChannel">确定</el-button>
          <span slot="reference" class="title">来源渠道</span>
        </el-popover>


      </div>

      <div class="tableIntention">

        <el-popover
          placement="bottom"
          width="50"
          v-model="intentionalDegreeListBox"
          trigger="click">
          <el-checkbox :indeterminate="isIntentionalDegreeList" v-model="IntentionalDegreeListAll"
                       @change="CheckedIntentionalDegreeListAllAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="intentionalDegreeListChecked" @change="CheckedIntentionalDegreeList">
            <el-checkbox v-for="item in  customersListConditionList.intentionalDegreeList" :label="item.value"
                         :key="item.code">{{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecIntentionalDegreeList">确定</el-button>
          <span slot="reference" class="title">意向程度</span>
        </el-popover>


      </div>

      <!-- :data="listData" -->
      <el-table
        :data="customerList"
        highlight-current-row
        @row-click="rowClick"
        @selection-change="rowClickhandleCurrentChange"
        ref="customerListTable"
        v-loading="loading">
        <el-table-column
          width="10">
        </el-table-column>

        <el-table-column
          type="selection"
          width="40">
        </el-table-column>

        <el-table-column
          prop="mobilePhone"
          width="120"
          label="手机号码">
        </el-table-column>

        <el-table-column
          prop="cstName"
          width="120"
          label="客户姓名">
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="">
        </el-table-column>

        <el-table-column
          prop="consultantName"
          width="120"
          label="置业顾问">
        </el-table-column>

        <el-table-column
          prop="collectionMethod"
          label=""
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.collectionMethod =='directcall'">
              主动来电
            </template>
            <template v-else-if="scope.row.collectionMethod =='bespeak'">
              留电预约
            </template>
          </template>
        </el-table-column>

        <el-table-column
          prop="cstStatus"
          width="120">
        </el-table-column>

        <el-table-column
          prop="createTime"
          label=""
          width="150">
          <template slot-scope="scope">
            {{ timestampToDate('Y-m-d H:i:s',scope.row.createTime/1000)}}
          </template>
        </el-table-column>

        <el-table-column
          prop="channelName"
          width="120"
          label="">
        </el-table-column>

        <el-table-column
          prop="intentionalDegree"
          width="120">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getQueryCustomerData(scope)">详情</el-button>
            <el-button type="text" size="small" @click="configuration(scope)">编辑</el-button>
            <!-- customerTocallout(scope) -->
         <!--  <el-button type="text" size="small" @click="Outbound = true;customerTocallout(scope)">外呼</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!--工具条-->
    <section class="adPage" v-if="customerList.length>0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="formQueryCustomersList.pageNo"
        :page-size="10"
        background
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <div class="pageLeft">
        共 <span>{{total}}</span>个客户，今日新增{{rowNowCount}}条<!--，第 {{currentPage}} / {{ Math.ceil(total/10)}} 页-->
      </div>
    </section>
    <!-- 分配 -->
    <el-dialog
      title="置业顾问列表"
      :visible.sync="dialogVisible"
      :before-close="handleCloseBox"
    >
      <div class="cx" style="margin-top: -20px;">
        <el-input placeholder="请输入置业顾问姓名" style="width:412px;"></el-input>
        <el-button size="small" class="important" style="width:60px;height:28px;line-height:10px; float:right;"
                   @click="queryConsultantList">查询
        </el-button>
      </div>

      <section class="listTable">
        <el-table
          :data="consultantList"
          highlight-current-row
          @current-change="rowClickConsultant"
          ref="singleTable"
          height="240"
          v-loading="allocationLoading">
          <el-table-column
            width="50">
          </el-table-column>

          <el-table-column
            prop="oper_name"
            label="置业顾问姓名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="oper_id"
            label="手机号码"
            width="150">
          </el-table-column>

          <el-table-column
            prop="state"
            label="状态">
          </el-table-column>
        </el-table>
      </section>

      <section class="adPage">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="consultantListCurrentPage"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="consultantListTotal">
        </el-pagination>

      </section>
      <div class="df">
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" style="width:65px;height:32px;line-height: 0;">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;updateCstByBesId()"
                     style="width:65px;height:32px;line-height: 0;">保存</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 补录 -->
    <div class="record">
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="736px">
        <el-form :model="form">
          <el-form-item label="手机号码" style="margin-left:12px">
            <el-input v-model="form.name" auto-complete="off" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="项目" style="margin-left: 268px;margin-top: -54px;" @click="dialogVisible = true">
            <el-select v-model="form.region" placeholder="请选择" style="width:160px">
            </el-select>
          </el-form-item>
          <el-form-item label="性别" style="margin-left: 500px;margin-top: -54px;">
            <el-select v-model="form.region" placeholder="请选择" style="width:160px">
            </el-select>
          </el-form-item>
          <el-form-item label="来源落地页">
            <el-select v-model="form.region" placeholder="请选择" style="width:160px">
            </el-select>
          </el-form-item>
          <el-form-item label="意向程度" style="margin-left: 246px;margin-top: -54px;">
            <el-select v-model="form.region" placeholder="请选择" style="width:160px">
            </el-select>
          </el-form-item>
          <div class="srk">
            <span
              style="width:48px;height:17px;font-size:12px;color:rgba(138,150,160,1);line-height:17px;margin-left:12px;margin-right:12px">需求备注</span>
            <el-input v-model="input" class="inputss"></el-input>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">
            保存
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 外呼 -->
    <div class="outbound">
      <el-dialog title="外呼人员号码确认" :visible.sync="Outbound">
        <el-form>
           <template>
             <el-form-item label="外呼人员号码" :model="calloutTel">
             <el-select v-model="calloutTel" placeholder=""></el-select>
             <span class="custom">自定义</span>
             <span class="wh">(外呼人员默认为项目管理员号码,如需更换外呼人员点击自定义)</span>
          </el-form-item>
           </template>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="Outbound = false">取 消</el-button>
          <el-button type="primary" @click="Outbound = false;customerCallout()">呼叫</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 外呼 -->
    <div class="outbound">
      <el-dialog title="外呼人员号码确认" :visible.sync="outcryInformation">
      <el-form>
        <el-form-item label="外呼人员号码">
          <el-input maxlength="20"></el-input>
          <span class="custom">默认</span>
          <span class="wh">(如需更换为项目管理员号码，请点击默认)</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outcryInformation = false">取 消</el-button>
        <el-button type="primary" @click="outcryInformation = false;">呼叫</el-button>
      </div>
    </el-dialog>
    </div>

    <!-- 导入 -->
    <div class="imports">
      <el-dialog
        title="批量导入客户信息"
        :visible.sync="imports"  :before-close="importsHandleClose"
        width="686px">
        <div class="dr">
          <p>1、下载《导入模板》； </p>
          <p>
            2、按模板格式整理好需要导入的客户资料信息，包括客户号码、客户姓名、客户基本信息、客户需求等，导入完善客户信息模板，只能完善已有客户的客户信息，不能新增新客户；导入新客户模板，会同时新增客户并完善客户资料。客户状态、性别、需求类型、付款方式、置业目的、意向程度等字段只能录入系统设置的选项；</p>
          <p>3、信息整理完毕，点击“选择文件”按钮，选择excel文档；</p>
          <p>4、点击“开始导入”，导入客户信息； </p>
          <p>5、每次导入数据建议小于1000条！</p>
        </div>
        <div class="mb clearfix">
          <ul>
            <li><a :href="exportH+'/api/private/1.0/customer/dlImportTemplate'" style="text-decoration:underline">模版-导入新客户</a>
            </li>
            <li style="margin-left:31px"><a :href="exportH+'/api/private/1.0/customer/dlModifyTemplate'"
                                            style="text-decoration:underline">模版-完善客户信息</a></li>
          </ul>
        </div>
        <div class="xzwj">
          <el-upload
            class="upload-demo"
            ref="upload"

            :action="exportH+'/api/private/1.0/customer/modifyCusts'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :on-change="errorUpload"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small">选择文件</el-button>
          </el-upload>
          <!--:headers="{'Content-Type':'multipart/form-data'}"-->
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="imports = false;fileList=[]" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="submitUpload">开始导入</el-button>
          <!-- <el-button type="primary" @click="imports = false; submitUpload">开始导入</el-button> -->
      </span>
      </el-dialog>
    </div>

    <!--导入失败-->
    <div class="imports">
      <el-dialog
        title="导入结果"
        :visible.sync="ImportFailure"
        width="686px">
        <div class="mainT" v-html="ImportFailureT"></div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="ImportFailure = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="ImportFailure=false;queryCustomersList()">确 定</el-button>
      </span>
      </el-dialog>
    </div>



    <div  class="importsS">
      <el-dialog
        title="导入结果"
        :visible.sync="ImportSuccess"
        width="686"  height="197">
            <div class="success">
              导入成功{{ImportSuccessInfo.success}}行，导入失败{{ImportSuccessInfo.failed}}行
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="ImportSuccess = false" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="ImportSuccess=false">确 定</el-button>
          </span>
      </el-dialog>
    </div>



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
            已选：<template v-for="(item,index) in getClickProjectList"> {{item}}<template v-if="getClickProjectList.length>index+1">、</template></template>
          </div>


          <el-tree
            class="filter-tree"
            :data="ProjectListData"
            node-key="id"
            @check-change="getClickProject"
            :default-checked-keys="getClickProjectListId"
            :props="defaultProps"
            :default-expand-all="false"
            show-checkbox
            ref="tree">
          </el-tree>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleProjectList = false" size="small">取 消</el-button>
    <el-button type="primary" @click="getCheckedKeys" size="small">确 定</el-button>
  </span>
      </el-dialog>
    </div>



    <footerA style="position: fixed;bottom:0px"></footerA>
  </section>
</template>

<script src="./script.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>
