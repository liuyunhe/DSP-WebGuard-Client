<template>
  <section class="ReservationRecord">
    <header>
      <el-col :span="24" style="padding-bottom: 0px;">
        <div class="projectS">
          <div class="left">
              <div class="type1" style="border: none">
                <el-autocomplete
                  v-model="fromDataList.keywd"
                  value-key="channelName"
                  :placeholder="placeholder"
                  :fetch-suggestions="inputOnChange"
                  class="serachS"
                  @select="inputOnSelect"
                  :select-when-unmatched="true"
                  ref="yang">
                  <template slot="prepend">投放渠道</template>
                  <template slot-scope="{ item }">
                    <div class="name"
                         style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{
                      item.channelName }}
                    </div>
                    <span class="addr"
                          style="float: right;color: #99A9BF;width: 50px">渠道名称</span>
                  </template>
                </el-autocomplete>
                <!--<el-input v-model="keyWordText" placeholder="请输入" class="serachS"-->
                          <!--@blur="pushTagesList('条件查询：' + keyWordText, 'keyWord', keyWordText);"></el-input>-->
              </div>
          </div>
          <div class="left">
            <span style="margin-right: 20px">统计周期</span>
            <el-date-picker
              v-model="datepicker"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              value-format="yyyy-MM-dd"
              @change="datepickerOnChange"
              :picker-options="{disabledDate}"
            >
            </el-date-picker>
          </div>
          <div class="left">
            <el-button type="text" @click="manageDate(true)">昨天</el-button>
            <el-button type="text" @click="manageDate(false)">今天</el-button>
            <!--<el-checkbox-->
              <!--v-model="fromDataList.tf"-->
              <!--@change="tfOnChange"-->
            <!--&gt;推广中</el-checkbox>-->
          </div>
          <div class="right">
            <div class="buttons">
              <el-button size="small" class="important" v-loading.fullscreen.lock="fullscreenLoading" @click="customerExport">导出</el-button>
              <el-button size="small" class="important" @click="getReset()">重置</el-button>
              <el-button size="small" class="important" @click="getList()">查询</el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="24" class="toolbar" style="margin-left: 12px;" v-if="tags.length>0">
        <label class="el-form-item__label" style="line-height: 30px">已选条件：</label>
        <el-tag style="margin-left: 12px;"
                v-for="tag in tags"
                :key="tag.name"
                @close="handleClose(tag)"
                closable
                :type="tag.type">
          {{tag.name}}
        </el-tag>
      </el-col>

    </header>

    <!--列表-->
    <section class="ReservationRecordTable">
      <!-- 有效性 -->
       <div class="effectiveness" style="left: 330px;right: inherit">
        <el-popover
          placement="bottom"
          width="50"
          v-model="pageTypeListBox"
          trigger="click">
          <el-checkbox :indeterminate="isPageTypeListAll" v-model="pageTypeListAll"
                       @change="CheckedPageTypeListAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="pageTypeListChecked" @change="CheckedpageTypeList">
            <el-checkbox
              v-for="item in brListCondtionList.pageTypeList"
              :label="item.code"
              :key="item.code">{{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecPageTypeList">确定</el-button>
          <span slot="reference" class="title">终端类型</span>
        </el-popover>
      </div>
      <!-- 意向程度 -->
    <div class="sourceChannel" style="left: 180px;right: inherit">
        <el-popover
          placement="bottom"
          width="50"
          v-model="channelBox"
          trigger="click">
          <el-checkbox :indeterminate="isChannelAll" v-model="channelAll" @change="CheckedChannelAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="channelChecked" @change="CheckedChannel">
            <el-checkbox v-for="item in brListCondtionList.channelTypeList" :label="item.value" :key="item.code">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecChannel">确定</el-button>
          <span slot="reference" class="title">渠道类型</span>
        </el-popover>
      </div>

      <el-table
        :data="dataList"
        v-loading="loading">
        <el-table-column
          width="50">
        </el-table-column>

        <el-table-column
          prop="channelName"
          label="投放渠道"
          width="120">
        </el-table-column>

        <el-table-column
          prop="channelTypeName"
          label=""
          width="150">
        </el-table-column>

        <el-table-column
          prop="pageType"
          label=""
          width="150">
        </el-table-column>

        <el-table-column
          prop="projectNum"
          width="150"
          label="推广中项目">
        </el-table-column>

        <el-table-column
          prop="consumStr"
          width="150"
          label="总消费金额">
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.consumStr }}</span>
            <span v-else>{{ scope.row.consumStr }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="consumRatioStr"
          label="消费占比"
          width="120">
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.consumRatioStr }}</span>
            <span v-else>{{ scope.row.consumRatioStr }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="clientPriceStr"
          width="120"
          label="单客价"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.clientPriceStr }}</span>
            <span v-else>{{ scope.row.clientPriceStr }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="clientNum"
          label="获客数"
          width="150"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.clientNum }}</span>
            <span v-else>{{ scope.row.clientNum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="clickPrice"
          width="100"
          label="点击成本"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.clickPrice }}</span>
            <span v-else>{{ scope.row.clickPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="clickRate"
          width="120"
          label="点击率"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.clickRate }}</span>
            <span v-else>{{ scope.row.clickRate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--工具条-->
    <div>
      <section class="adPage" v-if="dataList.length>0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <div class="pageLeft">
          共 <span>{{total}}</span>个客户，今日新增56条<!--，第 {{currentPage}} / {{rowNowCount}}}} 页-->
        </div>
      </section>
    </div>
    <footerA style="position: fixed;bottom:0px"></footerA>
  </section>
</template>


<script src="./ByChannel.js"></script>
<style lang="scss" type="text/scss" src="./style.scss"></style>

