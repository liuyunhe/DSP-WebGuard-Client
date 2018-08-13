<template>
  <section class="ReservationRecord">
    <header>
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <!--查询表单-->
      <el-col :span="24" style="padding-bottom: 0px;">
        <div class="projectS">
          <div class="left">
          <template v-if="type==1">
            <div class="type1">
              <el-select v-model="type" solt="prepend" placeholder="请选择" @change="selectType" class="typeClass" size="small">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select
                v-model="type"
                filterable
                remote
                reserve-keyword
                placeholder="请选择查询条件或输入关键字搜索"
                :remote-method="remoteMethod"
                @change="pushTagesList('搜索关键字：'+kwType, 'kwType',kwType)"
                :loading="loading" size="mini" class="serachS"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.value }}</span>
                </el-option>

              </el-select>

            </div>
          </template>

          <template v-else-if="type==2">
            <div class="type2">
              <el-select v-model="type"
                         slot="prepend"
                         placeholder="请选择"
                         @change="selectType"
                         class="typeClass"
                         size="small">
                <el-option v-for="item in typeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-input
                        placeholder="请输入投放活动"
                        class="serachS"></el-input>


            </div>
          </template>

          <template v-else-if="type==3">
            <div class="type2">
              <el-select v-model="type"
                         slot="prepend"
                         placeholder="请选择"
                         @change="selectType"
                         class="typeClass"
                         size="small">
                <el-option v-for="item in typeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="advertisingTitle"
                        placeholder="请输入投放活动"
                        class="serachS"></el-input>
            </div>
          </template>

          <template v-else-if="type==4">
            <div class="type2">
              <el-select v-model="type"
                         slot="prepend"
                         placeholder="请选择"
                         @change="selectType"
                         class="typeClass"
                         size="small">
                <el-option v-for="item in typeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-input
                        placeholder="请输入投放活动"
                        class="serachS"></el-input>
            </div>
          </template>

          <template v-else-if="type==5">
            <div class="type2">
              <el-select v-model="type"
                         slot="prepend"
                         placeholder="请选择"
                         @change="selectType"
                         class="typeClass"
                         size="small">
                <el-option v-for="item in typeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-input
                        placeholder="请输入投放活动"
                        class="serachS"></el-input>
            </div>
          </template>

        </div>

          <div class="right">
            <div class="buttons">
              <el-button size="small" class="important" @click="imports = true">导出</el-button>
              <el-button size="small" class="important" @click="getStatus()">重置</el-button>
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
       <div class="effectiveness">
        <el-popover
          placement="bottom"
          width="50"
          v-model="cstValidityListBox"
          trigger="click">
          <el-checkbox :indeterminate="isCstValidityListAll" v-model="cstValidityListAll"
                       @change="CheckedCstValidityListAllAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="cstValidityListChecked" @change="CheckedcstValidityList">
            <el-checkbox v-for="item in brListCondtionList.cstValidityList" :label="item.value"
                         :key="item.code">{{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecCstValidityList">确定</el-button>
          <span slot="reference" class="title">有效性</span>
        </el-popover>
      </div>
      <!-- 意向程度 -->
    <div class="sourceChannel">
        <el-popover
          placement="bottom"
          width="50"
          v-model="channelBox"
          trigger="click">
          <el-checkbox :indeterminate="isChannelAll" v-model="channelAll" @change="CheckedChannelAll">全部
          </el-checkbox>
          <el-checkbox-group v-model="channelChecked" @change="CheckedChannel">
            <el-checkbox v-for="item in brListCondtionList.channel" :label="item.value" :key="item.code">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button type="primary" size="small" @click="savecChannel">确定</el-button>
          <span slot="reference" class="title">来源渠道</span>
        </el-popover>
      </div>

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
          label=""
          width="120">
        </el-table-column>

        <el-table-column
          prop="createTime"
          width="120"
          label="点击时间">
        </el-table-column>

        <el-table-column
          prop="channelName"
          label=""
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

    <!-- 预约详情 -->
    <div class="appointment">
      <el-dialog title="预约详情" :visible.sync="dialogFormVisible" width="760px" height="354px">
        <el-form :model="form">
          <el-form-item label="搜索关键词">
            <el-input v-model="form.name" placeholder="万科春风十里"></el-input>
          </el-form-item>
          <el-form-item label="来源渠道" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="百度"></el-input>
          </el-form-item>
          <el-form-item label="浏览时长" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="123秒"></el-input>
          </el-form-item>
          <el-form-item label="MAC">
            <el-input v-model="form.name" placeholder="MAC"></el-input>
          </el-form-item>
          <el-form-item label="防伪设备" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="pc"></el-input>
          </el-form-item>
          <el-form-item label="IMEI" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="2345"></el-input>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input v-model="form.name" placeholder="27.23.0.120"></el-input>
          </el-form-item>
          <el-form-item label="IP归属城市" style="margin-left:240px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="广州"></el-input>
          </el-form-item>
          <el-form-item label="点击时间" style="margin-left:490px;margin-top:-54px;">
            <el-input v-model="form.name" placeholder="2018-04-19 15:55:22"></el-input>
          </el-form-item>
          <el-form-item label="来源落地页">
            <router-link to="/">落地页链接</router-link>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" style="width:64px;height:36px;line-height:10px;">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
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


<script src="./script.js"></script>

<style lang="scss" type="text/scss" src="./style.scss">
</style>

