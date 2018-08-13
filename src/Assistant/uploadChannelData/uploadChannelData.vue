<template>
  <main class="uploadChannelData">
    <div class="header_title">
      <h2>渠道数据导入</h2>
    </div>
    <div class="content_title">上传渠道数据</div>

    <el-upload
      ref="upload"
      class="upload-file"
      drag
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :limit="4"
      :name="'csvFiles'"
      :multiple="true"
      :action="global_.config.baseUrl + '/api/private/1.0/ChannelImport/channelImportCsv'"
      :auto-upload="false"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖拽到此处上传，或<em> 点击上传</em></div>
      <div class="el-upload__text tips">如有多个文件，请打包上传(暂不支持)</div>
      <div class="el-upload__tip" slot="tip" style="font-size: 16px">提示：目前仅支持百度搜索、百度信息流、搜狗搜索、360搜索四个渠道数据导入。
      </div>
    </el-upload>
    <div class="button">
      <el-button size="medium "
                 type="primary"
                 @click="submitUpload">提交
      </el-button>
    </div>
    <div class="updata_tips">
      <div class="tips title">数据更新日期（括号内为截止昨日数据库未包含数据）： </div>
      <div class="tips"
           :title="item.lastOperateTime+'('+item.excludeTime.join(',')+')'"
           v-for="item in channelDayInfoList"
      >{{item.channelName}}:{{item.lastOperateTime}}({{item.excludeTime.join(",")}})</div>

    </div>
  </main>
</template>

<style type="text/css" lang="scss">
  .uploadChannelData{
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
        margin-left: 20px;
      }
    }
    .content_title{
      height: 100px;
      line-height: 100px;
      margin: 0 30px;
      color: #101010;
      font-size: 16px;
    }
    .upload-file{
      margin: 0 150px;
      .el-upload{
        .el-upload-dragger{
          width: 600px;
          height: 300px;
          .el-icon-upload{
            margin: 65px 0 30px;
            &:before{
              content: "";
              display: block;
              width: 75px;
              height: 75px;
              background-image: url("../../assets/commonIcons/upload.jpg");
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
          .el-upload__text{
            font-size: 18px;
          }
          .el-upload__text.tips{
            margin-top: 20px;
            color: #cccccc;
            font-size: 16px;
          }

        }
      }
      .el-upload-list{
        width: 600px;
      }
    }
    .button{
      .el-button{
        width: 100px;
        height: 32px;
        font-size: 12px;
        background: #0077ff;
        position: relative;
        left: 150px;
        margin-top: 50px;
      }

    }
    .updata_tips{
      border-top:1px solid #F2F4F8 ;
      padding-top: 20px;
      margin-top: 100px;
      padding-bottom: 100px;
      .tips{
        line-height: 50px;
        margin-left: 32px;
        height: 50px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.title{
          margin-left: 5px;
        }
      }

    }
  }

</style>

<script src="./uploadChannelData.js"></script>
