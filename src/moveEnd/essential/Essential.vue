<template>
  <div class="essential clearfix">
    <!-- 步骤条 -->
    <div class="step">
      <div class="step1 active">
        <span class="spanFigure activeFigure">1</span>
        <span>基本信息</span>
      </div>
      <div class="step2">
        <i class="strip"></i>
        <span class="spanFigure">2</span>
        <span>编辑模板</span>
      </div>
      <div class="step3">
        <i class="strip"></i>
        <span class="spanFigure">3</span>
        <span>编辑内容</span>
      </div>
    </div>
    <div class="step_1 clearfix">
     <el-form ref="form" :model="form" label-width="95px" :label-position="labelPosition" size="small" class="clearfix">
      <el-form-item label="落地页名称">
        <el-input v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
        <span class="important">*</span>
      </el-form-item>

      <el-form-item label="所属机构">
        <el-select
          :disabled="forbidden"
          filterable
          v-model="formLabelAlign.construction"
          placeholder="请选择"
          @change="project"
          style="width:100%">
            <el-option
              v-for="(item,index) in organizationArr"
              :key="index"
              :label="item.orgName"
              :value="item">
            </el-option>
        </el-select>
        <span class="important">*</span>
      </el-form-item>

      <el-form-item label="所属项目">
        <el-select
          :disabled="forbidden"
          filterable
          v-model="formLabelAlign.project"
          placeholder="请选择"
          @change="castRelease"
          style="width:100%">
          <el-option
            v-for="(item, index) in projectAerr"
            :key="index"
            :label="item.projectName"
            :value="item">
          </el-option>
        </el-select>
        <span class="important">*</span>
      </el-form-item>
      <el-form-item label="投放活动" style="width:100%;">
        <el-select filterable v-model="formLabelAlign.projectCode"
          placeholder="请选择" style="width:100%;">
          <el-option v-for="(item,index) in projectArr"
            :key="index"
            :value="item.id"
            :label="item.advertisingTitle">
          </el-option>
        </el-select>
        <span class="important">*</span>
      </el-form-item>
      <el-form-item label="400电话">
        <el-col class="line" :span="3">400&nbsp- &nbsp</el-col>
        <el-col :span="11">
          <el-input v-model="formLabelAlign.phone1" placeholder="数字"></el-input>
        </el-col>
        <el-col class="line" :span="3"> &nbsp &nbsp转</el-col>
        <el-col :span="6">
          <el-input v-model="formLabelAlign.phone2" placeholder="数字"></el-input>
        </el-col>
        <span class="important">*</span>
      </el-form-item>
      <el-form-item label="网页标签名">
        <el-input v-model="formLabelAlign.webpageName" placeholder="请输入内容"></el-input>
        <div class="webpageHint" style="font-size: 12px;color: #999;">指落地页在网页名称或分享后显示的连接标题</div>
      </el-form-item>
      <el-form-item style="margin-top: 10px;"
        label="投放渠道">
        <el-checkbox-group v-model="formLabelAlign.deliveryManagements">
          <el-checkbox  v-for="(item,index) in channelArr"
            style="display: block; margin-left: 0;"
            :key="index"
            :disabled="isdisable.includes(item.channelName)"
            :label="item.channelName"
            @change="channelId(item)"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
      <div class="warning-zone" v-if="hint">
        <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.name ==''">
            <div class="warning-icon">!</div>
            <span>请输入落地页名称</span>
          </div>
        </div>
        <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.construction ==''">
            <div class="warning-icon">!</div>
            <span>请选择所属机构</span>
          </div>
        </div>
        <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.project ==''">
            <div class="warning-icon">!</div>
            <span>请选择所属项目</span>
          </div>
        </div>
        <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.projectCode =='' ">
            <div class="warning-icon">!</div>
            <span>请选择投放活动</span>
          </div>
        </div>
        <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.phone1 == '' || formLabelAlign.phone2 == '' ">
            <div class="warning-icon">!</div>
            <span>无法获取项目电话，请手动输入</span>
          </div>
          <div class="warning-wrap"
            v-if="formLabelAlign.phone1 !== '' && formLabelAlign.phone2 !== ''  && !/\d{8}$/.test('400'+formLabelAlign.phone1+formLabelAlign.phone2)">
            <div class="warning-icon">!</div>
            <span>请输入正确的400电话</span>
          </div>
        </div>
        <!-- <div class="warning-item clearfix">
          <div class="warning-wrap"
            v-if="formLabelAlign.webpageName ==''">
            <div class="warning-icon">!</div>
            <span>请输入网页标签名</span>
          </div>
        </div> -->
      </div>
    </div>
    <div class="buttons">
        <el-row >
        <!-- 我 -->
         <!-- <el-button class="mybutton" size="medium" @click="back">返回</el-button> -->
        <el-button class="mybutton" size="medium" @click="cancel">取消</el-button>
        <!-- <el-button size="medium" @click="previewLandingPage(scope.row,GLOBAL.config.imgH)">预览</el-button> -->
        <el-button size="medium" class="mybutton"  @click="previewLandingPage(GLOBAL.config.PreUrl)" :disabled="isBtn">预览</el-button>

        <el-button type="primary" class="mybutton" style="background-color:#fff; color:#409eff;" size="medium" @click="next(2)" :disabled="isBtn">保存</el-button>
        <el-button class="mybutton" type="primary" @click="next(1)" size="medium" :disabled="isBtn">下一步</el-button>


        <!-- <el-button type="primary" class="mybutton" style="background-color:#fff; color:#409eff;" size="medium" @click="save" :disabled="isBtn">保存</el-button>
        <el-button class="mybutton" type="primary" @click="Newnext" size="medium" :disabled="isBtn">下一步</el-button> -->


       </el-row>
    </div>
  </div>
</template>
<script src="./Essential.js">
</script>
<style lang="scss" scoped src="./Essential.scss">
</style>
