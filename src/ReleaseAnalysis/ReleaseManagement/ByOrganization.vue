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
            <div class="type1" style="border: none">
              <el-autocomplete
                v-model="fromDataList.keywd"
                value-key="name"
                :placeholder="placeholder"
                :fetch-suggestions="inputOnChange"
                class="serachS"
                @select="inputOnSelect"
                ref="yang">
                <template slot="prepend">机构名称</template>
                <template slot-scope="{ item }">
                  <div class="name"
                       style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{
                    item.name }}
                  </div>
                  <span class="addr"
                        style="float: right;color: #99A9BF;width: 50px">机构名称</span>
                </template>
              </el-autocomplete>
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
          <div class="left" style="">
            <el-button type="text" @click="manageDate(true)">昨天</el-button>
            <el-button type="text" @click="manageDate(false)">今天</el-button>
            <el-checkbox
              v-model="fromDataList.tf"
              @change="tfOnChange"
            >推广中</el-checkbox>
          </div>
          <div class="right">
            <div class="buttons">
              <el-button size="small" class="important" @click="customerExport">导出</el-button>
              <el-button size="small" class="important" @click="getReset()">重置</el-button>
              <el-button size="small" class="important" @click="getList(true)">查询</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </header>

    <!--列表-->
    <section class="ReservationRecordTable">

      <el-table
        :data="dataList"
        v-loading="loading">
        <el-table-column
          width="50">
        </el-table-column>

        <el-table-column
          prop="org_name"
          label="机构名称"
          width="180">
        </el-table-column>


        <el-table-column
          prop="create_time"
          width="150"
          label="机构创建时间">
        </el-table-column>

        <el-table-column
          prop="projectCount"
          width="150"
          label="项目数量">
        </el-table-column>

        <el-table-column
          prop="running"
          label="推广中项目"
          width="120">
        </el-table-column>

        <el-table-column
          prop="contractMoney"
          width="120"
          label="总合同金额"
        >
        </el-table-column>

        <el-table-column
          prop="ad_consum"
          label="消费金额"
          width="150"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.ad_consum }}</span>
            <span v-else>{{ scope.row.ad_consum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="consumRatio"
          width="100"
          label="消费占比"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.consumRatio }}</span>
            <span v-else>{{ scope.row.consumRatio }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="promiseCustomers"
          width="100"
          label="承诺获客数"
        >
        </el-table-column>

        <el-table-column
          prop="client_num"
          label="实际获客数"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.client_num }}</span>
            <span v-else>{{ scope.row.client_num }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="clientRate"
          label="单客价"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.clientRate }}</span>
            <span v-else>{{ scope.row.clientRate }}</span>
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
          共<span>{{total}}</span>条记录
        </div>
      </section>
    </div>
    <footerA style="position: fixed;bottom:0px"></footerA>
  </section>
</template>


<script src="./ByOrganization.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>

