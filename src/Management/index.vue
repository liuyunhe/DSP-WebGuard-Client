<template>
  <main class="Administration">
    <div class="header_title">
      <h2>投放管理</h2>
    </div>
    <div class="main">
      <div class="template">

        <div class="left">
          <template v-if="type==1">
            <div class="type1">
              <el-select v-model="type" solt="prepend" placeholder="请选择" @change="selectType" class="typeClass" size="small">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select
                v-model="searchKey"
                filterable
                remote
                reserve-keyword
                placeholder="查询投放活动、所属项目、所属机构"
                :remote-method="remoteMethod"
                @change="pushTagesList('搜索关键字：'+searchKey, 'searchKey',searchKey);pageNo=1"
                :loading="loading" size="mini" class="serachS"
              >
                <el-option
                  v-for="item in options"
                  :key="item.searchKeyList"
                  :label="item.searchKeyFull"
                  :value="item.searchKeyFull">
                  <span style="float: left">{{ item.searchKeyFull }}</span>
                  <span style="float: right; color: #CCD1D6; font-size: 12px">{{ item.source }}</span>
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
              <el-input v-model="advertisingTitle"
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
              <el-input v-model="projectName"
                        placeholder="请输入所属项目"
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
              <el-input v-model="orgName"
                        placeholder="请输入所属机构"
                        class="serachS"></el-input>
            </div>
          </template>

        </div>

        <div class="right">
          <el-button plain size="medium" @click="restList">重 置</el-button>
          <el-button type="primary" size="medium" @click="getProjectList()">查询</el-button>
        </div>

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
      <section class="ManagementList">
        <div class="alternativeStart"  >
          <el-date-picker
            @change="getProjectList"
            type="datetimerange"
            v-model="searchStart"
            clearable
            range-separator="投放开始时间"
            value-format="yyyy-MM-dd "
            :default-time="[]"
            class="dateHeader">
          </el-date-picker>

        </div>
        <div class="alternativeEnd"  >
          <el-date-picker
            @change="getProjectList"
            type="datetimerange"
            v-model="searchEnd"
            clearable
            range-separator="投放结束时间"
            value-format="yyyy-MM-dd "
            :default-time="[]"
            class="dateHeader">
          </el-date-picker>

        </div>

        <div class="launchStatus">
          <el-dropdown @command="statusType" trigger="click" placement='bottom-start'>
            <span class="el-dropdown-link">投放状态<i class="el-icon-caret-bottom"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="待投放">待投放</el-dropdown-item>
              <el-dropdown-item command="已结束">已结束</el-dropdown-item>
              <el-dropdown-item command="投放中">投放中</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

        <el-table :data="listData"  v-loading="ChannelLoading">
          <el-table-column prop="advertisingTitle" label="投放活动" ></el-table-column>
          <el-table-column prop="projectName" label="所属项目" width="200" ></el-table-column>
          <el-table-column prop="orgName" label="所属机构"></el-table-column>
          <el-table-column prop="advertisingBegin" label="  " ></el-table-column>
          <el-table-column prop="advertisingEnd" label=""></el-table-column>
          <el-table-column prop="deliveryCount" label="投放渠道"></el-table-column>
          <el-table-column prop="status" label=""></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" >
              <el-button type="text" size="small" @click="modification(scope)">详情</el-button>
              <el-dropdown trigger="click">
                <el-button type="text" size="small">
                  <span class="el-dropdown-link" @click="getList(scope)" >链接</span>
                </el-button>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,i) in link   "  :key="i"  v-if="i<10">
                    <div class="dropdown_title" >{{item.channelName}}<span class="linking" @click="linking(item)">链接</span></div>

                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="adPage" v-if="listData.length>0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </section>
    </div>
    <footerA style="position: fixed;bottom:0px"></footerA>
  </main>
</template>
<script src="./index.js"></script>
<style type="text/scss" lang="scss">
  .el-dropdown-menu{
    .linking{
      text-decoration: underline;
    }
  }
  .el-picker-panel {
    .el-picker-panel__body-wrapper{
      .el-picker-panel__footer{
        .el-button{
          display: none;
        }
      }
    }
    .el-picker-panel__body {
      .el-date-range-picker__time-header {
        display: none;
      }

    }
  }

  .Administration {
    height: 100%;
    width: 1380px;
    margin: 0 auto;
    .header_title {
      height: 77px;
      border-bottom: 1px solid #F2F4F8;
      h2 {
        height: 17px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #1A173B;
        line-height: 77px;
      }
    }
    .main {
      margin-top: 19px;
      padding-bottom: 50px;
      .tagList {
        width: 100%;
        .el-tag {
          margin: 8px 12px 8px 0 ;

        }
      }
      .template {
        height: 32px;
        margin-bottom: 16px;

        .left {
          float: left;
          width: 445px;
          height: 32px;
          .el-input__inner{
            border: 0;
          }

          .type1 {
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            width: 445px;
            height: 35px;
            .el-select .el-input__inner {
              border: none;
              height: 32px;
              line-height: 32px;
              cursor: text;
            }
            .typeClass {
              .el-input__suffix {
                border-right: 1px solid #dcdfe6;
              }
            }
            .serachS {
              .el-input {
                width: 310px;
              }
              .el-input__suffix {
                display: none;
              }
              .el-input--suffix .el-input__inner {
                padding-right: 0px;
              }
            }
          }
          .type2 {
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            width: 400px;
            // height: 34px;
            .el-select .el-input__inner {
              border: none;
              height: 32px;
              line-height: 32px;
            }
            .typeClass {
              .el-input__suffix {
                border-right: 1px solid #dcdfe6;
              }
            }
            .serachS {
              width: 268px;
              .el-input__inner {
                height: 32px;
                line-height: 32px;
                border: 0px;
              }
            }
          }

          .input-with-select {
            input::-webkit-input-placeholder { /*WebKit browsers*/
              font-size: 12px;
              color: rgba(204, 209, 214, 1);
            }
          }
          .el-select .el-input {
            font-size: 12px;
            width: 126px;
            .el-icon-arrow-up:before {
              display: none;
            }
            .el-icon-arrow-up {
              background: url("../assets/images/dropDown2.png") center center no-repeat;
              transform: rotateZ(0deg);
            }
            .is-reverse {
              transform: rotateZ(180deg);
            }
            .el-select__caret {
              line-height: 32px;
            }
          }
          .input-with-select .el-input-group__prepend {
            background-color: #fff;
          }

        }
        .right {
          float: right;
          height: 32px;
          .el-button {
            width: 100px;
            height: 32px;
            font-size: 12px;
          }
          .el-button--default {
            color: rgba(0, 119, 255, 1);
            border-color: rgba(0, 119, 255, 1);
          }
          .el-button--primary {
            background: rgba(0, 119, 255, 1);
          }

        }
      }
      .ManagementList {
        padding-top: 16px;
        position: relative;
        .alternativeStart{
          left: 592px;
        }
        .alternativeEnd{
          left:759px;
        }
        .alternativeStart,.alternativeEnd{
          position: absolute;
          top: 16.43px;
          line-height: 45px;

          z-index: 1;
          text-align: left;
          .el-date-editor{
            width: 100%;
            border: 0;
            background: #f4f4f4 !important;
            padding: 0;
            .el-input__icon{
              display: none;
            }
            .el-range-separator{
              width: 100%;
              text-align: left;
              font-size:12px;
              display: inline-block;
              /*padding-right: 0;*/
              font-family:MicrosoftYaHei;
              color:rgba(138,150,160,1);
              line-height: 45px;
            }
            .el-range-separator::after{
              content:url("../assets/images/dropDown2.png" );
              margin-left: 5px;
            }
            input{
              display: none;
              background: #f4f4f4 !important;
            }

          }
        }
        .launchStatus {
           position: absolute;
           height: 46px;
           line-height: 46px;
           width: 98px;
            right: 194px;
            top: 14px;
            z-index: 999;
            font-size: 12px;
            cursor: pointer;
            .title {
            padding-top: 5px;
            line-height: 30px;
            height: 30px;
            color: #909399;
            display: block;
          }
          .el-dropdown-link {
            width: 100%;
            text-align: left;
            font-size: 12px;
            display: inline-block;
            /* padding-right: 0; */
            font-family: MicrosoftYaHei;
            color: #8a96a0;
            // line-height: 45px;
          }
          .el-icon-caret-bottom {
            font-size: 16px;
            color: #c0c4cc;
            padding-left: 4px;
            width: 25px;
            // display: inline-block;
            line-height: 50px;
            float: right;
        }
            }
        .el-table__header-wrapper {
          height: 45px;
        }
        .el-table {
          font-size: 12px;
          color: rgba(26, 23, 59, 1);
          .cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            padding-left: 56px;
            .el-button{
               width: 30px;
              span{
                text-decoration:underline;
                width: 30px;
              }

            }
            .el-icon-caret-bottom:before {
              float: right;
              color: rgba(138, 150, 160, 1);
            }

          }
          .el-table__body-wrapper {
            border: 1px solid #EFEFEF;
            border-bottom: 0;
            border-top: 0;
            height: 360px;
            td {
              text-align: left;
              padding: 0px;
              height: 36px;

            }
          }
        }
        .el-table th {
          padding: 0;
          line-height: 45px;
          background: #f4f4f4 !important;

        }
        .el-button{
          margin-right: 19px;
        }
        .el-dropdown, .el-button {
          font-size: 12px;
          color: rgba(0, 119, 255, 1);
        }

      }


      .adPage {
        padding-top: 32px;
        text-align: right;
        height: auto;
        overflow: hidden;
        .el-pagination {
          float: right;
        }
        .el-pagination.is-background .btn-next,
        .el-pagination.is-background .btn-prev,
        .el-pagination.is-background .el-pager li {
          background: none;
          border: 1px solid rgba(220, 224, 230, 1);
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background: rgba(0, 119, 255, 1);
          border-radius: 3px;
        }
        .pageLeft {
          padding-top: 3px;
          float: right;
          width: 300px;
          line-height: 30px;
          height: 30px;
          color: #8a96a0;
          .red {
            color: #fe0000;
          }
        }
      }
    }
  }
  .el-dropdown-menu {
    width: 178px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(0, 0, 0, 1);
    .dropdown_title{


    }
    .el-dropdown-menu__item {
      padding: 0 10px;
      font-size: 12px;
      .dropdown_title {

        color: #000000;
        font-family: MicrosoftYaHei;
        span {
          height: 13px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(0, 119, 255, 1);

          float: right;
        }
      }
    }


  }
</style>
