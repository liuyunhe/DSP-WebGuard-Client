<template>
  <section class="ReleaseManagement">
    <header>

      <!--查询表单-->
      <el-col :span="24" style="padding-bottom: 0px;">
        <div class="projectS">
          <div class="left">
            <div class="type1">
              <el-select
                v-model="type"
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
                :select-when-unmatched="true"
                class="autocomplete"
                @select="inputOnSelect"
                ref="yang">
                <template slot-scope="{ item }">
                  <div class="name"
                       style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                    {{item.name }}
                  </div>
                  <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.source }}</span>
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
              <el-button size="small" class="important" v-loading.fullscreen.lock="fullscreenLoading" @click="customerExport">导出</el-button>
              <el-button size="small" class="important" @click="getReset()">重置</el-button>
              <el-button size="small" class="important" @click="getList()">查询</el-button>
            </div>
          </div>
        </div>
      </el-col>

    </header>
    <!--列表-->
    <section class="ReleaseManagementTable">
      <el-table
        :data="dataList"
        v-loading="loading">
        <el-table-column
          width="50">
        </el-table-column>

        <el-table-column
          prop="advertisingTitle"
          label="投放活动"
          width="180">
        </el-table-column>

        <el-table-column
          prop="projectName"
          label="项目名称"
          width="150">
        </el-table-column>

        <el-table-column
          prop="advertisingBegin"
          width="120"
          label="投放开始时间">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.advertisingBegin).Format("yyyy/MM/dd") }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="advertisingEnd"
          width="120"
          label="投放结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.advertisingEnd?new Date(scope.row.advertisingEnd).Format("yyyy/MM/dd"):"" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="timePastRate"
          label="推广完成率"
          width="120">
           <template slot-scope="scope">
            <span >{{ scope.row.timePastRate +"%" }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="contractMoney"
          width="120"
          label="合同金额"
        ></el-table-column>

        <el-table-column
          prop="totalConsum"
          width="120"
          label="消费金额"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.totalConsum }}</span>
            <span v-else>{{ scope.row.totalConsum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="consumRate"
          label="消费占比"
          width="120"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.consumRate + "%" }}</span>
            <span v-else>{{ scope.row.consumRate + "%"}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="promiseCustomers"
          width="100"
          label="承诺获客数"
        >
        </el-table-column>
        <el-table-column
          prop="totalClientNum"
          width="100"
          label="实际获客数"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.totalClientNum }}</span>
            <span v-else>{{ scope.row.totalClientNum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="perClientConsum"
          label="客单价"
        >
          <template slot-scope="scope">
            <span v-if="red" style="color: red">{{ scope.row.perClientConsum }}</span>
            <span v-else>{{ scope.row.perClientConsum }}</span>
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


<script src="./ByActivity.js"></script>

<style lang="scss" type="text/scss" src="./style.scss"></style>
<style scoped>

</style>

