<template>
  <section class="view-container clearfix  templateView">
    <!--面包屑-->
    <div  class="title">
        <h2>从模板中创建</h2>
      <el-button size="small fr"  v-if="id=='1'"
        @click="cancelSelect">取消</el-button>
    </div>
    <!--筛选功能-->
    <el-col :span="24"
      class="tag-title toolbar"
      style="margin-bottom: 32px;border-bottom: 1px solid #F2F4F8;
  ">
      <div class="title-name">筛选模板</div>

      <div class="select-tag-zone">
        <div class="select-tag clearfix">
          <label class="el-form-item__label">展示项目数</label>
          <el-radio-group v-model="tagsProNumModel" size="small"  @change="getTemplateList">
            <el-radio  :label="item.value" border class="selectTag"  :key="item.value"  v-for="item in tagsProNum">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="select-tag-zone">
        <div class="select-tag clearfix">
          <label class="el-form-item__label">浏览方式</label>
          <el-radio-group v-model="browsingModel" size="small"  @change="getTemplateList">
            <el-radio  :label="item.value" border class="selectTag"  :key="item.value"  v-for="item in browsing">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="select-tag-zone">
        <div class="select-tag clearfix">
          <label class="el-form-item__label">展示重点</label>
          <el-radio-group v-model="emphasisModel" size="small"  @change="getTemplateList">
            <el-radio  :label="item.value" border class="selectTag"  :key="index"  v-for="(item,index) in emphasis">{{item.label}}</el-radio>
          </el-radio-group>
        </div>
      </div>




    </el-col>
    <!--模板列表-->
    <el-col :span="24"
      class="toolbar">
      <div class="template-list">
        <div class="template add">
          <div class="ctrl">
            <div class="add-icon">+</div>
            <div class="content">新建模板</div>
            <div class="content">(功能开发中)</div>
          </div>
        </div>
        <div class="template"
          v-for="(item,index) in templateList"
          :style="{backgroundImage:`url(${ GLOBAL.config.imgH+item.imgurl})`}"
          :key="index">
          <div class="mask">
            <div class="mask-layer"></div>
            <div class="ctrl">
              <div class="btn browse"
                @click="previewTemplate(item)">浏 览</div>
              <div class="btn use"
                @click="useTemplate(item)">应 用</div>
            </div>
          </div>

        </div>

      </div>
    </el-col>
    <div class="tops">
      <img src="../../assets/landingpage/回到顶部@2x.png">
    </div>

    <footerA class="mainApp"
             style="position: fixed;bottom:0px"></footerA>
  </section>
</template>

<script src="./script.js">
</script>

<style lang="scss" scoped src="./style.scss">
</style>
