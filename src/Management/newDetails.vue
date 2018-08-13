<template  >
  <main class="Launch">
    <div class="header_title">
      <h2>投放渠道详情</h2>
      <div class="btn">
        <el-button size="small" @click="modification" >返回</el-button>
      </div>
    </div>
    <div class="newMain">
      <section class="newList">
        <div class="type">


          <el-popover
            placement="bottom"
            v-model="pageTypeBox"
            width="50"
            trigger="click">
            <el-checkbox :indeterminate="isPageTypeAll" v-model="pageTypeAll" @change="CheckedPageTypeAll">
              全部
            </el-checkbox>
            <el-checkbox-group v-model="pageTypeChecked" @change="CheckedPageType">
              <el-checkbox v-for="(item,i) in  brListCondtionDataPageType" :label="item" :key="i">
                {{item.value}}
              </el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" size="small" @click="pageTypeSaveCheckeds">确定</el-button>
            <span slot="reference" class="title">落地页类型</span>
          </el-popover>


        </div>
        <div class="channelType">



          <el-popover
            placement="bottom"
            v-model="channelNameBox"
            width="50"
            trigger="click">
            <el-checkbox :indeterminate="isChannelNameAll" v-model="channelNameAll" @change="CheckedChannelNameAll">
              全部
            </el-checkbox>
            <el-checkbox-group v-model="channelNameChecked" @change="CheckedChannelName">
              <el-checkbox v-for="item in  brListCondtionData.channel" :label="item" :key="item.value">
                {{item.value}}
              </el-checkbox>
            </el-checkbox-group>
            <el-button type="primary" size="small" @click="channelNameSaveCheckeds">确定</el-button>
            <span slot="reference" class="title">投放渠道</span>
          </el-popover>

        </div>
        <el-table :data="NewList" v-loading="loading">
          <el-table-column prop="tfId" label="投放ID" ></el-table-column>
          <el-table-column prop="projectName" label="所属项目" ></el-table-column>
          <el-table-column prop="pageType" label="">
            <template slot-scope="scope">
            {{scope.row.pageType == '1' ? "移动端" : "PC端"}}
          </template>
          </el-table-column>
          <el-table-column prop="pageName" label="落地页名称"></el-table-column>
          <el-table-column prop="channelName" label=""></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" >
              <el-button type="text" size="small" @click="link(scope)" class="operation">链接</el-button>



              <el-button type="text" size="small" @click="launchSet=true;Seting(scope)" v-if="scope.row.channelName=='百度信息流'" class="operation">设置</el-button>

              <div class="shezhi clearfix">
                <el-dialog title="百度信息流设置" :visible.sync="launchSet"  :before-close="launchSethandleClose">
                <div class="newID">
                  <div class="left"><span>页面ID</span></div>
                  <div class="right">
                    <el-input type="textarea"  v-model="baiDuPageId" placeholder="请输入6位数的页面ID。如有多个请用逗号隔开" ></el-input>
                  </div>
                </div>
                <div class="launch_btn">
                  <el-button size="small"  @click="launchSet = false;">返回</el-button>
                   <el-button size="small"  type="primary" @click="launchSet = false;returnSeting(scope);"  style="color：#fff">确定</el-button>
                </div>
              </el-dialog>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>

    <footerA style="position: fixed;bottom:0px"></footerA>

  </main>
</template>
<script src="./newDetails.js"></script>
<style type="text/scss" lang="scss">

  .Launch{
    width: 1380px;
    height: 100%;
    margin:0 auto;
    .header_title{
      height: 77px;
      border-bottom: 1px solid #F2F4F8;
      margin-bottom: 15px;
      h2{
        height:17px;
        width: 98px;
        font-size:16px;
        display: inline-block;
        font-family:MicrosoftYaHei;
        color:#1A173B;
        line-height: 77px;
      }
      .btn{
        float: right;
        height: 32px;
        line-height: 77px;
        .el-button{
          width: 100px;
          border-color: #0077FF;
          color: #0077FF;
        }
        .dsa{
          display: none;
        }
      }
    }
    .tagList {
      width: 100%;
      .el-tag {
        margin: 8px 12px 8px 0 ;

      }
    }
    .newMain{
      width: 100%;
      padding-top: 15px;

      .newList {
        position: relative;
        padding-bottom: 80px;
        .type,.channelType{
          position: absolute;
          text-align: left;
          z-index: 1;
          .title {
            padding-top: 5px;
            line-height: 30px;
            height: 30px;
            color: #909399;
            display: block;
          }
          .title:before {
            content: "";
            float: right;
            padding-left: 2px;
            background: url("../assets/images/dropDown2.png") center center no-repeat;
            width: 20px;
            height: 30px;
          }
        }
        .type{
          left: 394.45px;
        }
        .channelType{
          left: 787.79px;
        }
        .el-table__header-wrapper{
          height: 45px;
        }
        .el-table {
          font-size: 12px;
          color:rgba(26,23,59,1);
          .cell{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            .el-button {
              width: 30px;
            }
            .operation{
                span{
                  text-decoration:underline;
                }
            }

            .aa:before{
              float: right;
            }
          }
          .el-table__body-wrapper {
            border: 1px solid #EFEFEF;
            border-bottom: 0;
            border-top: 0;
            td {
              text-align: center;
              padding: 0;
              height: 36px;
            }
          }
        }
        .el-table th {
          padding: 0;
          line-height: 45px;
          background: #f4f4f4 !important;
          text-align: center;
        }
      }
      //百度信息流弹窗
      .shezhi {
      .el-dialog{
        width: 448px;
        height: 240px;
        box-shadow: 0 0 0 0 white;
        .el-dialog__header{
          text-align: left;
          height: 53px;
          border-bottom: 1px solid #F2F4F8;
          padding: 0;
          .el-dialog__title{
            height:14px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(0,0,1,1);
            line-height: 53px;
            padding-left: 17px;
          }
          .el-dialog__headerbtn{
            top: 23px;
            right: 18px;
          }
        }

        .el-dialog__body{
          padding: 16px  18px 20px 18px;
          .newID{
            height: 99px;
            width: 412px;
            margin-bottom: 13px;
            .left,.right{
              float:left;
            }
            .left{
              margin-top: 0;
              height:12px;
              line-height: 12px;
              width: 37px;
              font-size:12px;
              font-family:MicrosoftYaHei;
              color:rgba(26,23,59,1);
              margin: -2px 15px 0 0;
            }
            .right{
              width: 360px;
              .el-textarea{
                border-radius:3px;
                .el-textarea__inner{
                  resize:none;
                }
                textarea::-webkit-input-placeholder {
                  font-size: 12px;
                  font-family:MicrosoftYaHei;
                  color:rgba(204,209,214,1);
                }
                .el-textarea__inner{
                  height: 99px;
                }
              }
            }
          }
          .launch_btn{
            text-align: right;
            .el-button{
              width: 90px;
              padding-left: 11px;
              margin-left: 10px;
            }
          }

        }
      }

    }
  }
  }
.newMain .newList .el-table .cell .el-button {
   width: 30px;
}
</style>
