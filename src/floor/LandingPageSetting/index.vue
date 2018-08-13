<template>
  <section class="landingPageSetting view-container clearfix">
    <!--面包屑-->
    <div
      class="breadcrumb-container">
      落地页制作
      <el-button size="small fr"
                 class="important"
                 @click="landingPage=true">新增
      </el-button>
    </div>
    <!-- addTemplate -->
    <!--已发布/未上架-->
    <div
      class="toolbar  ">
      <el-radio-group v-model="filters.status"
                      :size="'small'"
                      @change="getStatus">
        <el-radio-button label="0">已发布</el-radio-button>
        <el-radio-button label="1">未上架</el-radio-button>
      </el-radio-group>
    </div>
    <!--查询表单-->
    <div
      class="toolbar"
      style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="filters">
        <el-form-item :size="'small'">
          <el-autocomplete placeholder="搜索机构、项目、城市、落地页名称/ID"
                           v-model="filters.search"
                           class="input-with-select"
                           @select="handleSelect"
                           :fetch-suggestions="querySearch"
                           :trigger-on-focus="false"
                           ref="autocomplete">
            <template slot-scope="{ item }">
              <div class="name"
                   style="width: 180px;float: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{
                item.value }}
              </div>
              <span class="addr"
                    style="float: right;color: #99A9BF">{{ item.tag }}</span>
            </template>
            <el-select v-model="filters.type"
                       slot="prepend"
                       placeholder="请选择"
                       class="input-left"
                       :size="'small'">
              <el-option label="全部"
                         value="name"></el-option>
              <el-option label="落地页ID"
                         value="gid"></el-option>
              <el-option label="落地页名称"
                         value="pageName"></el-option>
              <el-option label="所属项目"
                         value="projectName"></el-option>
              <el-option label="所属机构"
                         value="orgName"></el-option>
              <el-option label="城市"
                         value="cityName"></el-option>
            </el-select>
          </el-autocomplete>
        </el-form-item>
        <!--<el-form-item label="所属城市">-->
        <!--<el-select :size="'small'" class="w120" v-model="filters.city" placeholder="请选择">-->
        <!--<el-option label="餐厅名" value="1"></el-option>-->
        <!--<el-option label="订单号" value="2"></el-option>-->
        <!--<el-option label="用户电话" value="3"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="投放时间"
                      :size="'small'">
          <el-date-picker value-format="yyyy-MM-dd"
                          v-model="filters.time"
                          :clearable="false"
                          @change="configTime();showTime=true"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="fr mr0"
                      :size="'small'">
          <el-button type="primary"
                     size="small"
                     @click="commitForm">查询
          </el-button>
        </el-form-item>
        <el-form-item class="fr"
                      :size="'small'">
          <el-button size="small"
                     class="important"
                     @click="getStatus">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--已选标签-->
    <div
      class="toolbar  tags"
      v-if="pageType || showTime || showLabel || showCityName  ">
      <label class="el-form-item__label">已选条件：</label>
      <div class="crm-tag clearfix"
           v-if="pageType">
        <div class="ms">落地页类型:{{pageType==="1"?"移动落地页":"pc落地页"}}</div>
        <i class="el-tag__close el-icon-close del"
           @click="deleteTag"/>
      </div>
      <div class="crm-tag clearfix"
           v-if="showLabel && filters.search!=''">
        <div class="ms">
          {{filters.type === 'name' ? '搜索关键字' : ''}} {{filters.type === 'gid' ? '落地页ID': ''}} {{filters.type ===
          'pageName' ? '落地页名称': ''}} {{filters.type === 'orgName' ? '所属机构': ''}} {{filters.type === 'cityName' ? '城市':
          ''}} {{filters.type === 'projectName' ? '所属项目': ''}}:{{filters.search}}
        </div>
        <i class="el-tag__close el-icon-close del"
           @click="deleteFilterLabel"/>
      </div>
      <div class="crm-tag clearfix"
           v-if="showTime">
        <div class="ms">投放时间：{{filters.time[0]}} - {{filters.time[1]}}</div>
        <i class="el-tag__close el-icon-close del"
           @click="deleteFilterTime"/>
      </div>

      <div class="crm-tag clearfix"
           v-if="showCityName">
        <div class="ms">所在城市：{{filters.cityName}}</div>
        <i class="el-tag__close el-icon-close del"
           @click="deleteCityName"/>
      </div>

    </div>


    <!--列表-->
    <div class="adServingTable">
      <div class="tabDatePick">
        <el-dropdown trigger="click"
                     @command="pageTypeHandle" placement="bottom-start">
                <span>
                  落地页类型  <span class="title"></span>
                </span>
          <el-dropdown-menu slot="dropdown" class="12">
            <el-dropdown-item :class="{active:pageType === ''}"
                              command="">全部
            </el-dropdown-item>
            <el-dropdown-item :class="{active:pageType === '0'}"
                              command="0">PC落地页
            </el-dropdown-item>
            <el-dropdown-item :class="{active:pageType === '1'}"
                              command="1">移动端落地页
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="tabDatePickst">


        <el-dropdown trigger="click"
                     @command="cityNameHandle" placement="bottom-start">
                <span>
                  所在城市  <span class="title"></span>
                </span>
          <el-dropdown-menu slot="dropdown" class="cityBox  ">
            <el-dropdown-item :command="item" v-for="(item,i) in dataList" :key='i'>{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-table :data="pageList" v-loading="listLoading">
        <el-table-column
          width="10">
        </el-table-column>

        <el-table-column
          prop="gid"
          label="落地页ID"
          width="130">
        </el-table-column>

        <el-table-column
          prop="pageName"
          label="落地页名称"
        >
        </el-table-column>

        <el-table-column
          label="所属项目"
          prop="projectName">
        </el-table-column>

        <el-table-column
          width="150"
          prop="orgName"
          label="所属机构">
        </el-table-column>

        <el-table-column
          prop="cityName"
          label=""
          width="150">
        </el-table-column>

        <el-table-column
          prot="pageType"
          width="120"
          label="">
          <template slot-scope="scope">
            {{scope.row.pageType == '1' ? "移动" : "PC"}}
          </template>
        </el-table-column>

        <el-table-column
          prop="updateTime"
          label="更新时间"
        >
        </el-table-column>

        <!--        <el-table-column
                  prop="updateOperName"
                  width="120"
                  label="操作人员">
                </el-table-column>-->

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="previewLandingPage(scope.row)">预览</el-button>
            <el-button type="text" size="small" v-if="filters.status==='1'"
                       @click="editLandingpage(scope.row)">编辑
            </el-button>
            <el-button type="text" size="small" v-if="filters.status==='0'"
                       @click="handleUpdateStatus(scope.row)">下架
            </el-button>
            <el-button type="text" size="small" v-if="filters.status==='1'"
                       @click="handleUpdateStatus(scope.row)">发布
            </el-button>
            <el-button type="text" size="small" @click="handleCopyUrl(scope.row)">复制链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 新增落地页 -->
    <div class="newLandingPage">
      <el-dialog
        title="新增落地页"
        :visible.sync="landingPage"
        width="516px">
        <div class="tupian clearfix">
          <template  v-if="addLandingPage==false">
            <div class="left"  @click="addLandingPage=true;">
              <div class="img">
                <img src="../../assets/landingpage/pcTemplate_select.png" alt="PC落地页">
              </div>
              <p>PC落地页</p>
            </div>
            <div class="left">
              <div class="img">
                <img src="../../assets/landingpage/mobileTemplate_select.png" alt="手机端落地页">
              </div>
              <p>手机端落地页</p>
            </div>
          </template>


          <template  v-else>
            <div class="left">
              <div class="img">
                <img src="../../assets/landingpage/ldixz1234.jpg" alt="创建空白落地页">
              </div>
              <p>创建空白落地页<br/>(功能开发中)</p>
            </div>
            <div class="left"  @click="templateLink">
                <div class="img">
                  <img src="../../assets/landingpage/ldy112.jpg" alt="从模板中创建">
                </div>
                <p>从模板中创建</p>
            </div>
          </template>




        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width:79px;height:32px;line-height:8px;" @click="landingPage = false;addLandingPage=false">取 消</el-button>
        </span>
      </el-dialog>
    </div>


<!--
    <div class="newLandingPage">
      <el-dialog
        title="新增落地页"
        :visible.sync="addLandingPage"
        width="516px">
        <div class="tupian clearfix">

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width:79px;height:32px;line-height:8px;" @click="landingPage = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
-->



    <!--工具条-->
    <section class="adPage" v-if="pageList.length>0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        background
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <div class="pageLeft">
        共 <span>{{total}}</span>条记录
      </div>
    </section>

    <footerA class="mainApp"
             style="position: fixed;bottom:0px"></footerA>
  </section>
</template>


<script src="./script.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>

