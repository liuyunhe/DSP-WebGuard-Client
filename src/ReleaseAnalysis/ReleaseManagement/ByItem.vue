<template>
  <section class="ReservationRecord">
    <header>

      <!--查询表单-->
      <el-col :span="24" style="padding-bottom: 0px;">
        <div class="projectS">
          <div class="left">
            <div class="type1">
                <el-select v-model="type"
                           slot="prepend"
                           placeholder="请选择"
                           class="typeClass"
                           size="small"
                           @change="selectOnChange(type)"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-autocomplete
                  v-model="fromDataList.keywd"
                  value-key="name"
                  :placeholder="placeholder"
                  :fetch-suggestions="inputOnChange"
                  class="autocomplete"
                  @select="inputOnSelect"
                  ref="yang">
                  <template slot-scope="{ item }">
                    <div class="name"
                         style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                      {{item.name }}
                    </div>
                    <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.type == "projectId"?"项目名称":"机构名称"}}</span>
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
          <div class="left">
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
              <el-button size="small" class="important" @click="getList()">查询</el-button>
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
          prop="project_name"
          label="项目名称"
          width="180">
        </el-table-column>

        <el-table-column
          prop="org_name"
          label="机构名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="create_time"
          width="150"
          label="项目创建时间">
        </el-table-column>

        <el-table-column
          prop="status"
          width="150"
          label="项目状态">
        </el-table-column>

        <el-table-column
          prop="contractMoney"
          label="总合同金额"
          width="120">
        </el-table-column>

        <el-table-column
          prop="ad_consum"
          width="120"
          label="消费金额"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.ad_consum }}</span>
            <span v-else>{{ scope.row.ad_consum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="consumRatio"
          label="消费占比"
          width="150"
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
          width="100"
          label="实际获客数"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.client_num }}</span>
            <span v-else>{{ scope.row.client_num }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="clientRate"
          label="客单价"
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


<script src="./ByItem.js"></script>

<style lang="scss" type="text/scss" src="./style.scss"></style>
<style scoped>

</style>

