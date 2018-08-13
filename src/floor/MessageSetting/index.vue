<template>
  <section class="view-container clearfix">

    <el-col :span="24"
      class="toolbar clearfix">
      <!--步骤条-->
      <div style="display: flex">
        <!--step1-->

        <!--step2-->
        <!--step3-->
        <div class="backBtn   1"
          v-if="settingStepsActive===2&&step2ActiveTpye==='banner'"
          @click="step3BnnerCancel()"></div>
        <div class="backBtn  2"
          v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0"
          @click="step3LabelCancel()"></div>
        <div class="backBtn  3"
          v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1"
          @click="step3EditorCancel()"></div>
        <div class="backBtn 4"
          v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'"
          @click="step3PluginCancel()"></div>

        <crm-steps :steps="settingSteps"
          :active="settingStepsActive"></crm-steps>
      </div>

      <!--步骤1-->
      <div id="step1"
        class="clearfix"
        v-if="step1Show">

<!--
        <div class="el-form-item el-form-item&#45;&#45;small">
          <label class="el-form-item__label" style="width: 100px;">落地页名称</label>
          <div class="el-form-item__content" style="margin-left: 100px;">
            <div  class="el-input el-input&#45;&#45;small"  style="width: 320px;">
              <input type="text" autocomplete="off" placeholder="输入落地页名称" v-model="steps1.pageName"  maxlength="32" class="el-input__inner">
            </div>
            <span  class="important">*</span>
          </div>
        </div>
-->




        <el-form :model="steps1"
          :size="'small'"
          ref="steps1Form"
          label-width="100px">



          <el-form-item label="落地页名称">
            <el-input v-model="steps1.pageName"
              placeholder="输入落地页名称"
              maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>


          <el-form-item label="所属机构">
            <el-select v-model="steps1.orgName"
              placeholder="请选择"   @change="getProjectList"
              :disabled="steps1.uuid !==''">
              <el-option v-for="item in orgNameList"
                :key="item.orgId"
                 :label="item.orgName"
                :value="item.orgName">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>


          <el-form-item label="投放项目">
            <el-select v-model="steps1.projectCode"  @change="projectPhone"
              placeholder="请选择"
              :disabled="steps1.uuid !==''">
              <el-option v-for="(item,index) in projectList"
                :key="index"
                :value="item.id"
                :label="item.projectName">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="投放活动">
            <el-select v-model="steps1.archiveId"
              placeholder="请选择"
             >
              <el-option v-for="(item,index) in archiveList"
                :key="index"
                :value="item.id+''"
                :label="item.advertisingTitle">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>

          <div  class="el-form-item el-form-item--small">
            <label class="el-form-item__label" style="width: 100px;">400电话</label>
            <div class="el-form-item__content" style="margin-left: 100px;">
              <span style="margin: 0px 10px;">400 -</span>
              <div class="callTel1 el-input el-input--small">
                <input type="text" autocomplete="off" placeholder="数字" v-model="steps1.callTel1" maxlength="11" class="el-input__inner">
                </div>
              <span  style="margin: 0px 5.5px;">转</span>
              <div  class="callTel2 el-input el-input--small">
                <input type="text" autocomplete="off" placeholder="数字" v-model="steps1.callTel2"  maxlength="11" class="el-input__inner">
              </div> <span  class="important">*</span>
            </div>
          </div>


         <!-- <el-form-item label="400电话">
            <span style="margin: 0 10px;">400 -</span>
            <el-input v-model.number="steps1.callTel1"  :disabled="callTelDisabled"
              class="callTel1"
              placeholder="数字"
              type="text"
              maxlength="11"></el-input>
            <span style="margin: 0 5.5px;">转</span>
            <el-input v-model.number="steps1.callTel2"  :disabled="callTelDisabled"
              class="callTel2"
              placeholder="数字"
              type="text"
              maxlength="11"></el-input>
            <span class="important">*</span>
          </el-form-item>-->

          <el-form-item label="网页标签名">
            <el-input v-model="steps1.label"
              placeholder="输入落地页名称"
              maxlength="32"></el-input>
          </el-form-item>
          <span class="tips">指落地页在网页名称或分享后显示的链接标题</span>
          <el-form-item style="margin-top: 10px;"
            label="投放渠道">
            <el-checkbox-group v-model="steps1.deliveryManagements">
              <el-checkbox v-for="(item,index) in channelList"
                style="display: block; margin-left: 0;"
                :key="index"
                :disabled="copyDeliveryManagements.includes(item.channelName)"
                :label="item.channelName"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="warning-zone"
          v-if="step1Warining">
          <div class="warning-item clearfix">
            <div class="warning-wrap"
              v-if="steps1.pageName =='' ">
              <div class="warning-icon">!</div>
              <span>请输入落地页名称</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap"
              v-if="steps1.orgName =='' ">
              <div class="warning-icon">!</div>
              <span>请选择所属机构</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap"
              v-if="steps1.projectCode =='' ">
              <div class="warning-icon">!</div>
              <span>请选择投放项目</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap"
              v-if="steps1.archiveId =='' ">
              <div class="warning-icon">!</div>
              <span>请选择投放活动</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap"
              v-if="steps1.callTel1 == '' || steps1.callTel2 == '' ">
              <div class="warning-icon">!</div>
              <span>无法获取项目电话，请手动输入</span>
            </div>
            <div class="warning-wrap"
              v-if="steps1.callTel1 !== '' && steps1.callTel2 !== ''  && !/\d{8}$/.test('400'+steps1.callTel1+steps1.callTel2)">
              <div class="warning-icon">!</div>
              <span>请输入正确的400电话</span>
            </div>
          </div>
        </div>
      </div>
      <!--步骤2-->
      <div id="step2"
        v-if="step2Show">
        <div class="left">
          <!--头图设置-->
          <div class="top-setting">
            <div class="banner item"
              :class="{active:item.name == step2Active}"
              v-for="(item, index) in step2.basic"
              @click="editItem(item,'',1)"
              :key="index">
              <img class="icon"
                :src="item.url"
                width="40"
                alt="">
              <p>{{ item.name }}</p>
              <div class="edit" v-if="item.active == 1 ||  picsLenght.length>0" ></div>
            </div>
          </div>
          <!--功能设置-->
          <div class="func-setting">
            <div class="title">
              <span>导航栏与模块</span>
              <el-button class="important"
                size="small fr"
                @click="editNav('导航栏')">编辑导航栏</el-button>
            </div>
            <div class="body">
              <draggable class="item-list"
                v-model="step2.label"
                element="div"
                :options="dragOptions"
                @update="datadragEnd">
                <transition-group type="transition"
                  :name="'flip-list'"
                  tag="div"
                  style="width: 928px;display: flex;flex-wrap: wrap;">

                  <div class="item"
                    :class="[{active:item.name == step2Active}]"
                    v-for="(item,index) in step2.label"
                    :key="index"
                    @click="editItem(item,index,0)">
                    <img class="icon"
                      :src="`${GLOBAL.config.imgH}${item.url}`"
                      width="40"
                      alt="">
                    <p>{{ item.name }} </p>
                    <template  v-if="item.hasOwnProperty('fields')">
                      <div class="edit" v-if="item.active == 1 ||  typeof(item.fields)== 'object' "></div>
                    </template>
                    <template  v-else>
                      <div class="edit" v-if="item.active == 1  "></div>

                    </template>

                    <div class="dl"
                      @click.stop="deleteItem(item,index)"></div>
                  </div>

                  <div class="item add"   key="add"
                       @click="addLabel()">
                    <img class="icon"
                         src="../../assets/landingpage/settings/setting_add_icon@3x.png"
                         style="margin-bottom: 9px"
                         width="31"
                         alt="">
                    <p>添加导航模块</p>
                  </div>





                </transition-group>


              </draggable>


            </div>

          </div>

          <!--选择添加的标签模块弹窗-->
          <div  class="addTagBox">
            <el-dialog title="选择添加的标签模块"
                       :visible.sync="dialogTableVisible"
                       :before-close="handleCloseTableBox"
                       width="400px">
              <div class="tab">
                <h2>模块名称</h2>
                <el-checkbox-group v-model="step2LabelList">
                  <div  class="list" v-for="(item, index) in step2DialogLabel"
                       :key="index">
                    <el-checkbox :label="item"
                                 :key="item.order">{{item.name}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>

              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="handleCloseTableBox"
                           size="small">取 消</el-button>
                <el-button type="primary"
                           @click="dialogTableVisible = false; step2LabelSubmit()"
                           size="small">确 定</el-button>
              </div>
            </el-dialog>
          </div>



          <!--插件设置-->
          <div class="plugin-setting"
            style="margin-bottom: 0px;border: none">
            <div class="title">
              <span>插件</span>
              <el-button class="important"
                size="small fr">编辑插件</el-button>
            </div>
            <div class="body">
              <div class="item"
                :class="{active:item.name == step2Active}"
                v-for="(item,index) in step2.plugins"
                @click="editItem(item,index,1)"
                :key="index">
                <img class="icon"
                  :src="`${GLOBAL.config.imgH}${item.url}`"
                  width="40"
                  alt="">
                <p>{{ item.name }} </p>
                <template  v-if="item.hasOwnProperty('fields')">
                <div class="edit" v-if="item.active == 1  ||  typeof(step1Plugins.fields)== 'object' " ></div>
                </template>
                <template v-else>
                  <div class="edit" v-if="item.active == 1 " ></div>
                </template>
                <div class="dl"></div>
              </div>
            </div>
          </div>
        </div>
        <!--功能-->
        <div class="right"
          v-if="step2Active">
          <div class="wrap">
            <div class="title clearfix">
              <img class="title-icon"
                v-if="step2Right.type!=0"
                :src="`${GLOBAL.config.imgH}${step2Right.url}`"
                width="40">
              <img class="title-icon"
                v-else-if="step2Right.type==0"
                :src="`${step2Right.url}`"
                width="40">
              <div class="title-name">{{step2Right.name}}设置</div>
            </div>
            <div class="form clearfix"
              v-if="step2Right.type == 1">
              <div class="form-item">
                <div class="form-item-name">在导航栏中的名称</div>
                <el-input class="form-item-input"
                  :placeholder="step2Right.name"
                  maxlength="4"
                  :size="'small'"
                  v-model="step2Right.rename"
                  @change="step2.label[step2Right.idx].rename = step2Right.rename">
                </el-input>
              </div>
            </div>
            <el-button v-if="step2Right.type == 0"
              class="important form-item-btn"
              :size="'small'"
              @click="editBanner()">编辑模块内容</el-button>
            <el-button v-if="step2Right.type == 1"
              class="important form-item-btn"
              :size="'small'"
              @click="editStyle()">编辑模块内容</el-button>
            <el-button v-if="step2Right.type == 2"
              class="important form-item-btn"
              :size="'small'"
              @click="editPlugin()">编辑模块内容</el-button>
          </div>
        </div>
        <!--按钮-->
        <div class="right"
          v-if="step2BtnActive">
          <div class="wrap">
            <div class="title clearfix">
              <div class="title-name">{{step2BtnActive}}设置</div>
            </div>
            <div class="form clearfix">
              <div class="form-item">
                <div class="form-item-name">在界面状态</div>

                <el-radio-group class="radio"
                  v-model="navVisibility">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="0" >隐藏</el-radio>
                </el-radio-group>
              </div>
            </div>
            <!--<el-button class="important form-item-btn"
              :size="'small'"
              @click="b">编辑模块内容</el-button>-->
          </div>
        </div>
      </div>
      <!--步骤3-->
      <div id="step3"
        v-if="step3Show">
        <!--头图设置-->
        <div id="banner-setting"
          v-if="step2ActiveTpye == 'banner'">
          <div class="title">编辑内容</div>
          <div class="content clearfix">
            <div class="label left">上传图片</div>
            <div class="img-upload right"  >

             <!-- <template  v-if="topBannerD==true">-->
              <el-upload :action="GLOBAL.config.imgUpload" ref="upload"
                list-type="picture-card"
                drag
                         :before-remove="beforeRemove"
                :on-success="uploadSuccess"
                :file-list="bannerFileList"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUploadBanner"
                :disabled="uploadDisabled">
                <!--:on-remove="handleRemove"  :before-remove="beforeRemove" -->

                <i class="el-icon-plus"></i>
                  <div class="el-upload__text" >
                    <em>上传</em> 或
                    <em>拖动</em> 添加图片
                  </div>
                  <div class="el-upload__tip"
                       slot="tip"
                       style="width: 360px;color: #9FA9BA;margin-top: 20px">最多三张；支持jpg,png,jpeg；大小不超过600k；建议上传1920px*500px分辨率图片；</div>
              </el-upload>

         <!--     </template>-->
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                  :src="dialogImageUrl"
                  alt="">
              </el-dialog>
            </div>
          </div>
        </div>
        <!--标签模块设置-->
        <div id="label-setting"
          v-if="step2ActiveTpye == 'label'">

          <div class="plugin-form-top clearfix"
            v-show="step3.status == 1">
            <img :src="`${GLOBAL.config.imgH}${step2Right.url}`"
              width="40"
              alt="">
            <div class="name">{{ step2Right.name }}设置</div>
          </div>


          <!--样式库模式-->
          <div class="content"
            v-if="step3.status == 0">
            <!--样式库列表-->
            <div class="styel-list left">
              <div class="style-list-ltem">
                <div class="title">单图样式</div>
                <div class="list">
                  <div class="list-item"
                       :class="{active:item.id == step3ActiveStyleId}"
                       v-for="(item,index) in styleList"
                       :key="index"
                       v-if="item.type === 4"
                       @click="selectStyle(item,index,'1')"  :style="{backgroundImage:`url(${item.url})`}"></div>
                  <!---->
                </div>
              </div>


              <div class="style-list-ltem">
                <div class="title">图文样式</div>
                <div class="list">
                  <div class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    :key="index"
                    v-if="item.type === 1"
                    @click="selectStyle(item,index,'0')"  :style="{backgroundImage:`url(${item.url})`}"></div>
                  <!---->
                </div>
              </div>
              <div class="style-list-ltem">
                <div class="title">图片样式</div>
                <div class="list">
                  <div class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    :key="index"
                    v-if="item.type === 2"
                    @click="selectStyle(item,index,'0')" :style="{backgroundImage:`url(${item.url})`}"></div>
                </div>
              </div>
              <div class="style-list-ltem">
                <div class="title">文字样式</div>
                <div class="list">
                  <div class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    :key="index"
                    v-if="item.type === 3"
                    @click="selectStyle(item,index,'0')"  :style="{backgroundImage:`url(${item.url})`}"></div>
                </div>
              </div>




            </div>
            <!--表单-->
            <div class="from-list middle">

              <div class="title">
                <el-radio-group v-model="step3.status"
                                :size="'small'"
                                @change="step3GetStatus">
                  <el-radio-button label="0">样式库模式</el-radio-button>
                  <el-radio-button label="1">编辑器模式</el-radio-button>
                </el-radio-group>
                <p v-if="isEditorTextShow">请在样式库中选择合适的样式，然后替换样式中相应的内容，如图片、标题、副标题、正文等</p>
                <p v-else>编辑内容</p>
              </div>
              <div>
                <el-form :model="step3"
                  :size="'small'"
                  label-width="100px"
                  ref="styleForm">
                  <template v-for="(item,index) in activeFormList">
                   <!-- {{item}}-->
                    <!--图片1-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===0"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading0"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess0"
                        :before-upload="beforeAvatarUpload0">
                        <img v-if="imageUrl0"
                          :src="imageUrl0"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                     <div class="el-upload__tip"  v-if="isOneImg"
                             slot="tip"
                             style="width: 360px;color: #9FA9BA;margin-top: 20px">支持jpg,png,jpeg；大小不超过600k；宽900px,高度不限</div>
                      </el-upload>
                    </el-form-item>
                    <!--图片2-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===1"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading1"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload1">
                        <img v-if="imageUrl1"
                          :src="imageUrl1"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片3-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===2"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading2"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload2">
                        <img v-if="imageUrl2"
                          :src="imageUrl2"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片4-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===3"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading3"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess3"
                        :before-upload="beforeAvatarUpload3">
                        <img v-if="imageUrl3"
                          :src="imageUrl3"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片5-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===4"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading4"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess4"
                        :before-upload="beforeAvatarUpload4">
                        <img v-if="imageUrl4"
                          :src="imageUrl4"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片6-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===5"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading5"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess5"
                        :before-upload="beforeAvatarUpload5">
                        <img v-if="imageUrl5"
                          :src="imageUrl5"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片7-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===6"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading6"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess6"
                        :before-upload="beforeAvatarUpload6">
                        <img v-if="imageUrl6"
                          :src="imageUrl6"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片10-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===9"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading9"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess9"
                        :before-upload="beforeAvatarUpload9">
                        <img v-if="imageUrl9"
                          :src="imageUrl9"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片13-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===12"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading12"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess12"
                        :before-upload="beforeAvatarUpload12">
                        <img v-if="imageUrl12"
                          :src="imageUrl12"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片16-->
                    <el-form-item :label="item.name"
                      v-if="item.type === 1&&index ===15"
                      :key="index">
                      <el-upload class="avatar-uploader"
                        :action="GLOBAL.config.imgUpload"
                        v-loading="imgLoading15"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess15"
                        :before-upload="beforeAvatarUpload15">
                        <img v-if="imageUrl15"
                          :src="imageUrl15"
                          class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>

                    <el-form-item :label="item.name"
                      v-if="item.type === 2"
                      :key="index">
                      <el-input v-model="item.value"
                        :placeholder="item.tips"
                        maxlength="32"></el-input>
                    </el-form-item>

                    <el-form-item :label="item.name"
                      v-if="item.type === 3"
                      :key="index">
                      <el-input type="textarea"
                        rows="4"
                        v-model="item.value"
                        resize="none"></el-input>
                    </el-form-item>

                    <el-form-item :label="item.name"
                      v-if="item.type === 4"
                      :key="index">
                      <div class="drag">
                        <el-upload :action="GLOBAL.config.imgUpload"
                          list-type="picture-card"
                          drag
                          :on-success="uploadSuccessStyle"
                          :file-list="item.value"
                          :on-remove="handleRemoveStyle"
                          :before-upload="beforeUploadBanner"
                          :disabled="uploadDisabled">
                          <i class="el-icon-plus"></i>
                          <div class="el-upload__text">
                            <em>上传</em> 或
                            <em>拖动</em> 添加图片
                          </div>
                          <div class="el-upload__tip"
                            slot="tip"
                            style="width: 360px;color: #9FA9BA;margin-top: 20px">支持jpg,png,jpeg；大小不超过600k；建议上传1920px*500px分辨率图片；</div>
                        </el-upload>
                      </div>
                    </el-form-item>
                  </template>
                </el-form>
              </div>

            </div>
            <!--展示图片-->
            <div class="pic-list right">
              <div class="title">当前样式</div>
              <div class="style-img">
             <!--   <div v-for="(item, index) in currentActiveFormList"
                  :key="index"
                  class="style-container">
                  <div v-if="currentActiveType === 1"
                    :style="`background-image: url('${item.cover.value || require('../../assets/example.png')}'); width: 388px; height: 166px; position: absolute;`"></div>
                  <div v-if="currentActiveType === 2"
                    v-for="(cover, i) in ((item.cover && item.cover.value) || [])"
                    :key="i"
                    :style="`background-image: url('${cover.url || require('../../assets/example.png')}'); width: 388px; height: 166px; position: absolute;`"></div>
                  <div v-if="currentActiveType === 4"
                    :style="`background-image: url('${item.cover.value || require('../../assets/example.png')}'); width: 388px; height: 166px; position: absolute;`"></div>
                  <div v-if="currentActiveType === 1"
                    style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; text-align: center;">
                    <h2 style="margin-top: 50px; font-size: 20px; ">{{item.title.value || '这是标题'}}</h2>
                    <p>{{item.desc.value || '这是正文'}}</p>
                  </div>
                  <div v-if="currentActiveType === 3">
                    <h2 style="margin-top: 50px; font-size: 20px; ">{{item.title.value || '这是标题'}}</h2>
                    <p>{{item.desc.value || '这是正文'}}</p>
                  </div>
                </div>-->
                 <img :src="ClickSelectImg"
                  width="388"
                  alt="">
              </div>
            </div>
          </div>
          <!--编辑器模式-->
          <template v-if="step3.status == 1">
            <div  style="padding-top: 32px;padding-bottom: 15px;">
              <el-radio-group v-model="step3.status"
                              :size="'small'"
                              @change="step3GetStatus">
                <el-radio-button label="0">样式库模式</el-radio-button>
                <el-radio-button label="1">编辑器模式</el-radio-button>
              </el-radio-group>
            </div>



            <crm-editor :detailContent="editorContent"
              @on-change="changeContent"></crm-editor>
          </template>
        </div>

        <!--插件设置-->
        <div id="plugin-setting"
          v-if="step2ActiveTpye == 'plugin'">
          <div class="plugin-form-top clearfix">
            <img :src="`${GLOBAL.config.imgH}${step2Right.url}`"
              width="40"
              alt="">
            <div class="name">{{ step2Right.name }}设置</div>
          </div>
          <div class="plugin-form-wrap">
            <el-form :size="'small'"
              label-width="100px">
              <el-form-item label="模式选择">
                <el-radio v-model="pluginForm[0].value"
                  label="0">400电话+留电+姓名</el-radio>
                <el-radio v-model="pluginForm[0].value"
                  label="1">400电话+留电</el-radio>
                <el-radio v-model="pluginForm[0].value"
                  label="2">留电+姓名</el-radio>
                <el-radio v-model="pluginForm[0].value"
                  label="3">留电</el-radio>
                <el-radio v-model="pluginForm[0].value"
                  label="4">400电话
                  <span class="important">*</span>
                </el-radio>

              </el-form-item>
              <el-form-item label="设置400电话">
                <el-radio v-model="pluginForm[1].value"
                  label="0"
                  @change="telTypeChange">400电话样式</el-radio>
                <el-radio v-model="pluginForm[1].value"
                  label="1"
                  @change="telTypeChange">普通电话样式
                  <span class="important">*</span>
                </el-radio>
              </el-form-item>
              <el-form-item label=""
                style="margin-bottom: 28px">
                <template v-if="pluginForm[1].value == 0">
                  <span>400 -</span>
                  <el-input v-model="pluginForm[2].value1"
                    class="callTel1"
                    placeholder="请输入">400电话样式</el-input>
                  <span>转</span>
                  <el-input v-model="pluginForm[2].value2"
                    class="callTel2"
                    placeholder="请输入">普通电话样式</el-input>
                </template>
                <template v-if="pluginForm[1].value == 1">
                  <el-input v-model="pluginForm[2].value"
                    class="callTel"
                    placeholder="请输入客户拨打的电话号码">400电话样式</el-input>
                </template>
              </el-form-item>
              <el-form-item label="设置提交按钮"
                style="margin-bottom: 24px">
                <div class="left">
                  <el-input v-model="pluginForm[3].value"
                            label="0"
                            class="callTel"
                            maxlength="4"></el-input>
                  <span style="margin-left: 25px">按钮颜色</span>

                </div>

                <div class="pickerColor">
                  <el-color-picker v-model="pluginForm[4].value"
                                   class="color-picker" ></el-color-picker>
                  <span class="text">{{pluginForm[4].value}}</span>
                  <span class="img"> <el-color-picker v-model="pluginForm[4].value"
                                                      class="color-picker-sucker" ></el-color-picker></span>
                  <span class="importants">*</span>

                </div>



              </el-form-item>


              <el-form-item label="预约时间"
                style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[5].value"
                  label="0">显示</el-radio>
                <el-radio v-model="pluginForm[5].value"
                  label="1">隐藏
                  <span class="important">*</span>
                </el-radio>
              </el-form-item>
              <template v-if="pluginForm[5].value=='0'">
                <el-form-item label=""
                              style="margin-bottom: 12px">
                  <el-radio v-model="pluginForm[6].value"
                            label="0">选填</el-radio>
                  <el-radio v-model="pluginForm[6].value"
                            label="1">必填</el-radio>
                </el-form-item>
                <el-form-item label=""
                              style="margin-bottom: 20px">
                  <el-checkbox-group v-model="pluginForm[7].value"  class="weekClass">
                    <el-checkbox label="周一">周一</el-checkbox>
                    <el-checkbox label="周二">周二</el-checkbox>
                    <el-checkbox label="周三">周三</el-checkbox>
                    <el-checkbox label="周四">周四</el-checkbox>
                    <el-checkbox label="周五">周五</el-checkbox>
                    <el-checkbox label="周六">周六</el-checkbox>
                    <el-checkbox label="周日">周日</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </template>





              <el-form-item label="户型"
                style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[8].value"
                  label="0">显示</el-radio>
                <el-radio v-model="pluginForm[8].value"
                  label="1">隐藏
                  <span class="important">*</span>
                </el-radio>
              </el-form-item>

              <template v-if="pluginForm[8].value=='0'">
                <el-form-item label=""
                              style="margin-bottom: 12px">
                  <el-radio v-model="pluginForm[9].value"
                            label="0">选填</el-radio>
                  <el-radio v-model="pluginForm[9].value"
                            label="1">必填</el-radio>
                </el-form-item>
                <el-form-item label=""
                              v-for="(item,index) in pluginForm[10]"
                              :key="index"
                              style="margin-bottom: 12px">
                  <el-input v-model="item.value"
                            class="callTel3"
                            placeholder="请输入户型"></el-input>
                  <el-button icon="el-icon-delete"
                             size="small"
                             style="width: 32px;padding: 9px 0px"
                             @click="removeRoom(item,index)"></el-button>
                  <el-button icon="el-icon-plus"
                             size="small"
                             style="width: 32px;padding: 9px 0px"
                             v-if="index == pluginForm[10].length-1"
                             @click="addRoomType()"></el-button>
                </el-form-item>
              </template>

            </el-form>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="24"
      style="height: 92px; padding: 30px 0; border-top: 1px solid  #F2F4F8;">
      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===0"
        @click="nextStep()">下一步</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===0"
        @click="saveStep1('确定保存当前编辑内容？',true)"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        v-if="settingStepsActive===0"
        @click="previewLandingPage">预览</el-button>
      <el-button size="small fr"
        v-if="settingStepsActive===0"
        @click="cancelEdit()">取消</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===0"
        @click="changeTemplate()">更换模板</el-button>

      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===1"
        @click="lastStep()">上一步</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===1"
        @click="saveStep2(0)"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        v-if="settingStepsActive===1"
        @click="saveStep2('publish')">发布</el-button>
      <el-button size="small fr"
        v-if="settingStepsActive===1"
        @click="saveStep2('preview')">预览</el-button>
      <el-button size="small fr"
        v-if="settingStepsActive===1"
        @click="cancelStep2()">取消</el-button>

      <!--banner图按钮-->
      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='banner'"
        @click="saveStep3Banner()"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===2&&step2ActiveTpye==='banner'"
        @click="bbb()">重置</el-button>
      <!--<el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='banner'" @click="step3BnnerCancel()">取消</el-button>-->
      <el-button size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='banner'"
        @click="saveStep3Banner('preview')">预览</el-button>

      <!--样式库按钮-->
      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0"
        @click="saveStep3Label()"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0"
        @click="resetStyle()">重置</el-button>
      <!--<el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0" @click="step3LabelCancel()">取消</el-button>-->
      <el-button size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0"
        @click="saveStep3Label('preview')">预览</el-button>

      <!--编辑器按钮-->
      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1"
        @click="saveStep3Editor()"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1"
        @click="resetEditor()">重置</el-button>
      <!--<el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1" @click="step3EditorCancel()">取消</el-button>-->
      <el-button size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1"
        @click="saveStep3Editor('preview')">预览</el-button>

      <!--插件按钮-->
      <el-button type="primary"
        size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'"
        @click="saveStep3Plugin()"
        :disabled="saveDisabled">保存</el-button>
      <el-button size="small fr"
        class="important"
        v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'"
        @click="ccc()">重置</el-button>
      <!--<el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'" @click="step3PluginCancel()">取消</el-button>-->
      <el-button size="small fr"
        v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'"
        @click="saveStep3Plugin('preview')">预览</el-button>

    </el-col>
    <footerA class="mainApp"
      style="position: fixed;bottom:0px"></footerA>
  </section>
</template>

<script src="./script.js">
</script>

<style lang="scss" scoped src="./style.scss">
</style>


