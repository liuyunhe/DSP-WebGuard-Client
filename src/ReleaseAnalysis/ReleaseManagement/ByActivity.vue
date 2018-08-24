<template>
  <section class="ReservationRecord">
    <header>
      <!--面包屑-->
      <!--<el-col :span="24" class="breadcrumb-container">-->
        <!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
          <!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
            <!--{{ item.name }}-->
          <!--</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
      <!--</el-col>-->
      <!--查询表单-->
      <el-col :span="24" style="padding-bottom: 0px;">
        <div class="projectS">
          <div class="left">
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
                  v-model="fromDataList.keywd"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请选择查询条件或输入关键字搜索"
                  :remote-method="remoteMethod"
                  @change="pushTagesList('搜索关键字：'+fromDataList.keywd, 'keywd',fromDataList.keywd)"
                  :loading="loading" size="mini" class="serachS" ref="yang">
                  <el-option
                    v-for="(item,i) in typeOptions"
                    :key="i"
                    :label="item.lable"
                    :value="item.value">
                    <!-- <span style="float: left">{{ item.completionName }}</span>
                    <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.source }}</span> -->
                  </el-option>
                </el-select>
              </div>


          </div>
          <div class="left">
            <span style="margin-right: 20px">统计周期</span>
            <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              value-format="yyyy-MM-dd"
              :picker-options="{disabledDate}"
            >
            </el-date-picker>
          </div>
          <div class="right">
            <div class="buttons">
              <el-button size="small" class="important" @click="customerExport">导出</el-button>
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

      <!-- 意向程度 -->


      <el-table
        :data="dataList"
        v-loading="loading">
        <el-table-column
          width="50">
        </el-table-column>

        <el-table-column
          prop="mobilePhone"
          label="手机号码"
          width="180">
        </el-table-column>

        <el-table-column
          prop="clientName"
          label="客户姓名"
          width="120">
        </el-table-column>

        <el-table-column
          prop="projectName"
          width="150"
          label="归属项目">
        </el-table-column>

        <el-table-column
          prop="consultantName"
          width="150"
          label="置业顾问">
        </el-table-column>

        <el-table-column
          prop="status"
          label="有效性"
          width="120">
        </el-table-column>

        <el-table-column
          prop="createTime"
          width="120"
          label="点击时间">
        </el-table-column>

        <el-table-column
          prop="channelName"
          label="意向程度"
          width="150">
        </el-table-column>

        <el-table-column
          width="100"
          label="关键词">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="Details(scope)" style="width:32px">详情</el-button>
            <!-- <el-button type="text" size="small" @click="changeState(scope)" style="width:32px">补录</el-button> -->
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


<script src="./ByActivity.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>

