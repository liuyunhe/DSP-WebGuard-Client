<template>
  <div class="CoversStyle">
    <div class="cover">
      <!-- 中间得画布 -->
        <div class="coverRight">
            <span class="text">
              {{$store.state.moveEnd.template.data.label[$store.state.moveEnd.template.num].name}}
            </span>
            <div class="codeChunk" id="parent" ref="codeChunk" :style="imgbColor+';'+backgroundimg" ><!--:header="stylesArr[2].content"-->
                <router-view></router-view>
            </div>
            <!-- 画布小功能的按钮 -->
            <div class="coverBtn">
              <div class="coverReset" @click="coverEmpty">
                <img src="@/assets/imgs/icon-主画布-清除按钮.png" alt="">
              </div>
              <div class="coverBackground" @click="backgroundImg">
                <img src="@/assets/imgs/icon-主画布-画布按钮.png" alt="">
              </div>
              <div class="coverDelete" @click="deleteTemplate">
                <img src="@/assets/imgs/icon-主画布-删除按钮.png" alt="">
              </div>
            </div>
        </div>
    </div>
    <!-- 右边的布局 -->
    <div class="stylesRight">
      <!--  这是样式的实际操作, 包含着样式 插件 属性 -->
      <div class="stylesOperation">
        <!-- 这是样式 -->
        <div class="styles" v-if="$store.state.moveEnd.html1.stylesActive === 1">
            <span>
              样式
            </span>
            <div class="selectStyle" style="margin-bottom: 16px;">
              <el-row>
                <el-button
                size="small" style="margin-left:4px;"
                :type="$store.state.moveEnd.html1.primary === 1?'primary':'' "
                @click="btnType(1)"
                >图文样式</el-button>
                <el-button
                size="small"
                :type="$store.state.moveEnd.html1.primary === 2?'primary':'' "
                @click="btnType(2)"
                >图片样式</el-button>
                <el-button
                size="small"
                :type="$store.state.moveEnd.html1.primary === 3?'primary':'' "
                @click="btnType(3)"
                >文本样式</el-button>
              </el-row>
            </div>
            <!-- 图文样式 -->
            <ul class="selectStyle_1">
              <li v-for="(item, index) in stylesArr" :key="index" v-if="item.type === 1 && $store.state.moveEnd.html1.primary === 1" @click="getCanvasData(item)">
                <img :src="`${GLOBAL.config.imgH}${item.url}`" alt="">
              </li>
            </ul>
            <!-- 图片样式 -->
            <ul class="selectStyle_1">
              <li v-for="(item, index) in stylesArr" :key="index" v-if="item.type === 2 && $store.state.moveEnd.html1.primary === 2"  @click="getCanvasData(item)">
                <img :src="`${GLOBAL.config.imgH}${item.url}`" alt="">
              </li>
            </ul>
            <!-- 文本样式 -->
            <ul class="selectStyle_1">
              <li v-for="(item, index) in stylesArr" :key="index" v-if="item.type === 3 && $store.state.moveEnd.html1.primary === 3"  @click="getCanvasData(item)">
                <img :src="`${GLOBAL.config.imgH}${item.url}`" alt="">
              </li>
            </ul>
        </div>
        <!-- 这是插件的驻留按钮 -->
        <div class="plug-in" v-if="$store.state.moveEnd.html1.stylesActive === 2">
            <span>
              插件
            </span>
            <div class="plug-inBtn">
                <el-row>
                <el-button
                size="small" style="margin-left:4px; padding:9px 26px"
                :type="$store.state.moveEnd.html1.primary === 4?'primary':'' "
                @click="btnType(4)"
                >表单</el-button>
                <el-button
                size="small"
                style="padding:9px 26px"
                :type="$store.state.moveEnd.html1.primary === 5?'primary':'' "
                @click="btnType(5)"
                >驻留</el-button>
                <el-button
                size="small"
                style="padding:9px 26px"
                :type="$store.state.moveEnd.html1.primary === 6?'primary':'' "
                @click="btnType(6)"
                >视频</el-button>
              </el-row>
            </div>

            <ul class="plug-inBtn_1">
              <li v-for="(item, index) in stylesArr" :key="index" v-if="item.type === 6 && $store.state.moveEnd.html1.primary === 5" @click="getCanvasData(item)">
                <img  :src="`${GLOBAL.config.imgH}${item.url}`" alt="">
              </li>
            </ul>
        </div>

        <!-- 驻留按钮的合成表单, 里面的数据绑定 还是和下面的分离一样共用的 -->
        <div class="formLingeringMerge" v-if="$store.state.moveEnd.html1.isLingering === 1 && $store.state.moveEnd.html1.stylesActive === 3">
          <!-- 手机输入框 -->
          <div class="formPhoneNumber" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <span>
              设置电话号码
            </span>
            <span style="color:#999;">
              电话号码
            </span>
            <div>
              <el-input v-model="userDefinedForm.formName.phoneNumber" placeholder="请输入内容" size="small" style="width: 96%"></el-input>
              <span style="color:red;font-size:16px;">*</span>
            </div>
          </div>
          <!-- 预约按钮 -->
          <div class="formSubmitBtn" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <div class="inputBox">
              <span>
                设置预约按钮
              </span>
              <span style="color:#999; display: inline-block; width: 100%;">
                留电框
              </span>
              <div>
                <el-input v-model="userDefinedForm.formName.reserveNum" placeholder="请输入内容" size="small" style="width: 96%"></el-input>
                <span style="color:red;font-size:16px;">*</span>
              </div>
            </div>
          </div>
          <!-- 姓名输入框 -->
          <div class="formName" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <div class="choiceBtn" style="padding-bottom: 0;border-bottom:none">
              <div class="showChoice">
                <el-radio v-model="userDefinedForm.formName.nameIsShow" label="1">显示</el-radio>
                <el-radio v-model="userDefinedForm.formName.nameIsShow" label="2">隐藏</el-radio>
              </div>
              <div class="requiredChoice">
                <el-radio v-model="userDefinedForm.formName.nameIsRequired" label="1">选填</el-radio>
                <el-radio v-model="userDefinedForm.formName.nameIsRequired" label="2">必选</el-radio>
              </div>
            </div>
            <div class="inputBox">
              <span>
                姓名框
              </span>
              <div>
                <el-input v-model="userDefinedForm.formName.name" placeholder="请输入内容"  size="small" style="width: 96%"></el-input>
              </div>
            </div>
          </div>
          <!-- 预约时间 -->
          <div class="formAppointment" style="padding-bottom: 10px; border-bottom: 1px  solid #eee;">
            <div class="choiceBtn" style="padding-bottom: 0;border-bottom:none">
              <div class="showChoice">
                <el-radio v-model="userDefinedForm.formName.appointmentIsShow" label="1">显示</el-radio>
                <el-radio v-model="userDefinedForm.formName.appointmentIsShow" label="2">隐藏</el-radio>
              </div>
              <div class="requiredChoice">
                <el-radio v-model="userDefinedForm.formName.appointmentIsRequired" label="1">选填</el-radio>
                <el-radio v-model="userDefinedForm.formName.appointmentIsRequired" label="2">必选</el-radio>
              </div>
              <div class="ismultipleChoice">
                <el-radio v-model="userDefinedForm.formName.appointmentIsmultiple" label="1">多选</el-radio>
                <el-radio v-model="userDefinedForm.formName.appointmentIsmultiple" label="2">单选</el-radio>
              </div>
            </div>
            <div class="weeks">
              <span>
                选择预约时间
              </span>
              <!-- 单选 和 多选 两个代码 -->
              <div class="single" v-if="userDefinedForm.formName.appointmentIsmultiple === '2'">
                  <el-radio v-model="userDefinedForm.formName.single" label="1">周一</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="2">周二</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="3">周三</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="4">周四</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="5">周五</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="6">周六</el-radio>
                  <el-radio v-model="userDefinedForm.formName.single" label="7">周日</el-radio>
              </div>
              <div class="Multiple" v-if="userDefinedForm.formName.appointmentIsmultiple === '1'">
                <el-checkbox-group
                v-model="userDefinedForm.formName.checkList">
                  <el-checkbox label="1">周一</el-checkbox>
                  <el-checkbox label="2">周二</el-checkbox>
                  <el-checkbox label="3">周三</el-checkbox>
                  <el-checkbox label="4">周四</el-checkbox>
                  <el-checkbox label="5">周五</el-checkbox>
                  <el-checkbox label="6">周六</el-checkbox>
                  <el-checkbox label="7">周七</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <!-- 选择户型 -->
          <div class="formHouse" style="padding-top: 16px; border-bottom: 1px  solid #eee;">
            <div class="houseBtn">
              <div class="houseChoice">
                <el-radio v-model="userDefinedForm.formName.house.houseIsShow" label="1">显示</el-radio>
                <el-radio v-model="userDefinedForm.formName.house.houseIsShow" label="2">隐藏</el-radio>
              </div>
              <div class="houseChoice">
                <el-radio v-model="userDefinedForm.formName.house.houseIsRequired" label="1">选填</el-radio>
                <el-radio v-model="userDefinedForm.formName.house.houseIsRequired" label="2">必选</el-radio>
              </div>
              <div class="houseChoice">
                <el-radio v-model="userDefinedForm.formName.house.houseIsmultiple" label="1">多选</el-radio>
                <el-radio v-model="userDefinedForm.formName.house.houseIsmultiple" label="2">单选</el-radio>
              </div>
            </div>
            <div class="definitionHouse">
              <div class="houseText" style="display: flex;justify-content: space-between;line-height: 28px;">
                <span>可选户型</span>
                <span style="margin-right: 66px">{{userDefinedForm.formName.house.houseInput.length}}/9</span>
              </div>
              <div class="houseInput">
                <div v-if="userDefinedForm.formName.house.isinput1">
                  <el-input v-model="userDefinedForm.formName.house.input1" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput1}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(1)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput2">
                  <el-input v-model="userDefinedForm.formName.house.input2" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput2}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(2)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput3">
                  <el-input v-model="userDefinedForm.formName.house.input3" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput3}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(3)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput4">
                  <el-input v-model="userDefinedForm.formName.house.input4" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput4}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(4)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput5">
                  <el-input v-model="userDefinedForm.formName.house.input5" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput5}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(5)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput6">
                  <el-input v-model="userDefinedForm.formName.house.input6" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput6}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(6)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput7">
                  <el-input v-model="userDefinedForm.formName.house.input7" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput7}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(7)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput8">
                    <el-input v-model="userDefinedForm.formName.house.input8" placeholder="请输入内容" size="small"  maxlength="8"></el-input>
                    <span>{{houseIsinput8}}/8</span>
                    <div class="deleteHouse" @click="deleteHouse(8)" >
                      <i class="el-icon-delete"></i>
                    </div>
                </div>
                <div v-if="userDefinedForm.formName.house.isinput9">
                  <el-input v-model="userDefinedForm.formName.house.input9" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput9}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(9)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                  <!-- 添加 -->
                <div v-if="userDefinedForm.formName.house.houseInput.length  <= 8">
                  <el-input placeholder="请输入内容" size="small "></el-input>
                  <div class="deleteHouse" style="right:-12px;" @click="addHouse(userDefinedForm.formName.house.houseInput.length+1)" >
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


    <!-- 裁剪的模态框 -->
    <div  class="tailorBox">
      <el-dialog title="编辑图片" :visible.sync="dialogFormVisible"  width="50%">
        <div class="tailor"  style="width: 100%;height:500px;margin: 0 auto;">


          <VueCropper
            ref="cropper"
            :img="example2.img"
            :outputSize="example2.size"
            :outputType="example2.outputType"
            :info="example2.info"
            :centerBox="example2.centerBox"
            :canScale="example2.canScale"
            :autoCrop="example2.autoCrop"
            :autoCropWidth="example2.autoCropWidth"
            :autoCropHeight="example2.autoCropHeight"
            :fixed="example2.fixed"
            :fixedNumber="example2.fixedNumber"
          >
          </VueCropper>

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;$refs.cropper.refresh()">取 消</el-button>
          <el-button type="primary" @click="uploading"  v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </div>
      </el-dialog>
    </div>

        <!-- 以下是一些表单 和 文本框 和上传图片等 -->
        <!--  这是属性文本框 -->
        <div class="property" v-if="$store.state.moveEnd.html1.attribute === 1 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
            <div class="property_1">
              <el-input
                type="textarea"
                :rows="6"
                resize="none"
                placeholder="请输入内容"
                v-model="$store.state.moveEnd.userDefinedForm.textarea">
              </el-input>
            </div>
            <div class="colour">
              <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
              <span>颜色</span>
              <div class="hueBox">
                <div class="hue-kuang">
                  <span>#</span>
                  <el-input v-model="userDefinedForm.colourInput"
                  size="mini " style="display: inline-block;  width: 82px;"></el-input>
                </div>
                <div class="hue">
                  <el-color-picker v-model="userDefinedForm.color4" size="mini" ></el-color-picker>
                </div>
                <div :style="color" class="colorbox"></div>
              </div>
            </div>
        </div>
        <!-- 这是单图片 属性的上传图片框 -->
        <div class="uploadingImg" v-if="$store.state.moveEnd.html1.attribute === 2 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <el-upload
              action=""
              style="position: relative; text-align: center; width: 90%; margin: 0 auto;"
              ref="upload"
              :before-remove="deleteImg"
              :auto-upload="false"
              :on-change="CropState"
              :file-list="activeFormList"
              list-type="picture-card">
            <i class="el-icon-plus"></i>
              <div class="el-upload__text" >
                <em>上传</em> 或
                <em>拖动</em> 添加图片
              </div>
              <div class="el-upload__tip"
                    slot="tip"
                    style="
              width: 256px;color: #9FA9BA;margin-top: 20px">最多三张；支持jpg,png,jpeg；大小不超过600k；建议上传1920px*500px分辨率图片；</div>
          </el-upload>
        </div>
        <!-- 手机输入框 -->
        <!-- <div class="formPhoneNumber" v-if="$store.state.moveEnd.html1.attribute === 3 && $store.state.moveEnd.html1.stylesActive === 3">
          <span>
            输入框文案
          </span>
          <div>
            <el-input v-model="userDefinedForm.formName.phoneNumber" placeholder="请输入内容" size="small "></el-input>
          </div>
        </div> -->
        <!-- 姓名输入框 -->
        <div class="formName" v-if="$store.state.moveEnd.html1.attribute === 4 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="choiceBtn">
            <div class="showChoice">
              <el-radio v-model="userDefinedForm.formName.nameIsShow" label="1">显示</el-radio>
              <el-radio v-model="userDefinedForm.formName.nameIsShow" label="2">隐藏</el-radio>
            </div>
            <div class="requiredChoice">
              <el-radio v-model="userDefinedForm.formName.nameIsRequired" label="1">选填</el-radio>
              <el-radio v-model="userDefinedForm.formName.nameIsRequired" label="2">必选</el-radio>
            </div>
          </div>
          <div class="inputBox">
            <span>
              输入框文案
            </span>
            <div>
              <el-input v-model="userDefinedForm.formName.name" placeholder="请输入内容"  size="small "></el-input>
            </div>
          </div>
        </div>
        <!-- 预约时间 -->
        <div class="formAppointment" v-if="$store.state.moveEnd.html1.attribute === 5 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="choiceBtn">
            <div class="showChoice">
              <el-radio v-model="userDefinedForm.formName.appointmentIsShow" label="1">显示</el-radio>
              <el-radio v-model="userDefinedForm.formName.appointmentIsShow" label="2">隐藏</el-radio>
            </div>
            <div class="requiredChoice">
              <el-radio v-model="userDefinedForm.formName.appointmentIsRequired" label="1">选填</el-radio>
              <el-radio v-model="userDefinedForm.formName.appointmentIsRequired" label="2">必选</el-radio>
            </div>
            <div class="ismultipleChoice">
              <el-radio v-model="userDefinedForm.formName.appointmentIsmultiple" label="1">多选</el-radio>
              <el-radio v-model="userDefinedForm.formName.appointmentIsmultiple" label="2">单选</el-radio>
            </div>
          </div>
          <div class="weeks">
            <span>
              选择预约时间
            </span>
            <!-- 单选 和 多选 两个代码 -->
            <div class="single" v-if="userDefinedForm.formName.appointmentIsmultiple === '2'">
                <el-radio v-model="userDefinedForm.formName.single" label="1">周一</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="2">周二</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="3">周三</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="4">周四</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="5">周五</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="6">周六</el-radio>
                <el-radio v-model="userDefinedForm.formName.single" label="7">周日</el-radio>
            </div>
            <div class="Multiple" v-if="userDefinedForm.formName.appointmentIsmultiple === '1'">
              <el-checkbox-group
              v-model="userDefinedForm.formName.checkList">
                <el-checkbox label="1">周一</el-checkbox>
                <el-checkbox label="2">周二</el-checkbox>
                <el-checkbox label="3">周三</el-checkbox>
                <el-checkbox label="4">周四</el-checkbox>
                <el-checkbox label="5">周五</el-checkbox>
                <el-checkbox label="6">周六</el-checkbox>
                <el-checkbox label="7">周七</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <!-- 立即预约 -->
        <div class="formSubmitBtn" v-if="$store.state.moveEnd.html1.attribute === 6 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="inputBox">
            <span>
              输入框文案
            </span>
            <div>
              <el-input v-model="userDefinedForm.formName.submitBtn" placeholder="请输入内容" size="small "></el-input>
            </div>
          </div>
          <div class="submitColour">
            <!-- 按钮背景的颜色 -->
              <div class="colour">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>按钮颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="userDefinedForm.formName.bColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="userDefinedForm.formName.bColor4" size="mini" ></el-color-picker>
                  </div>
                  <div :style="btnColor" class="colorbox"></div>
                </div>
              </div>
              <!-- 按钮字体的颜色 -->
              <div class="colour" style="border-bottom: none">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>字体颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="userDefinedForm.formName.tColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="userDefinedForm.formName.tColor4" size="mini" ></el-color-picker>
                  </div>
                  <div :style="textColor" class="colorbox"></div>
                </div>
              </div>
          </div>
        </div>
        <!-- 选择户型 -->
        <div class="formHouse" v-if="$store.state.moveEnd.html1.attribute === 7 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="houseBtn">
            <div class="houseChoice">
              <el-radio v-model="userDefinedForm.formName.house.houseIsShow" label="1">显示</el-radio>
              <el-radio v-model="userDefinedForm.formName.house.houseIsShow" label="2">隐藏</el-radio>
            </div>
            <div class="houseChoice">
              <el-radio v-model="userDefinedForm.formName.house.houseIsRequired" label="1">选填</el-radio>
              <el-radio v-model="userDefinedForm.formName.house.houseIsRequired" label="2">必选</el-radio>
            </div>
            <div class="houseChoice">
              <el-radio v-model="userDefinedForm.formName.house.houseIsmultiple" label="1">多选</el-radio>
              <el-radio v-model="userDefinedForm.formName.house.houseIsmultiple" label="2">单选</el-radio>
            </div>
          </div>
          <div class="definitionHouse">
            <div class="houseText" style="display: flex;justify-content: space-between;line-height: 28px;">
              <span>可选户型</span>
              <span style="margin-right: 66px">{{userDefinedForm.formName.house.houseInput.length}}/9</span>
            </div>
            <div class="houseInput">
              <div v-if="userDefinedForm.formName.house.isinput1">
                <el-input v-model="userDefinedForm.formName.house.input1" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput1}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(1)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput2">
                <el-input v-model="userDefinedForm.formName.house.input2" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput2}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(2)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput3">
                <el-input v-model="userDefinedForm.formName.house.input3" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput3}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(3)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput4">
                <el-input v-model="userDefinedForm.formName.house.input4" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput4}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(4)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput5">
                <el-input v-model="userDefinedForm.formName.house.input5" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput5}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(5)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput6">
                <el-input v-model="userDefinedForm.formName.house.input6" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput6}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(6)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput7">
                <el-input v-model="userDefinedForm.formName.house.input7" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput7}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(7)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput8">
                  <el-input v-model="userDefinedForm.formName.house.input8" placeholder="请输入内容" size="small"  maxlength="8"></el-input>
                  <span>{{houseIsinput8}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(8)" >
                    <i class="el-icon-delete"></i>
                  </div>
              </div>
              <div v-if="userDefinedForm.formName.house.isinput9">
                <el-input v-model="userDefinedForm.formName.house.input9" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput9}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(9)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
                <!-- 添加 -->
              <div v-if="userDefinedForm.formName.house.houseInput.length  <= 8">
                <el-input placeholder="请输入内容" size="small "></el-input>
                <div class="deleteHouse" style="right:-12px;" @click="addHouse(userDefinedForm.formName.house.houseInput.length+1)" >
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 拨打电话 -->
        <div class="formDial" v-if="$store.state.moveEnd.html1.attribute === 8 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="dialInput">
            <span>
              按钮名称
            </span>
            <div>
              <el-input v-model="userDefinedForm.formName.dialBtnName" placeholder="请输入内容"  size="small "></el-input>
            </div>
            <span style="margin-top: 12px;">
              电话号码
            </span>
            <div style="padding-bottom: 14px;border-bottom: 1px solid #eee;">
              <el-input v-model="userDefinedForm.formName.dialPhoneName" placeholder="请输入内容"  size="small "></el-input>
            </div>
          </div>
            <div class="submitColour">
            <!-- 按钮背景的颜色 -->
              <div class="colour">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>按钮颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="userDefinedForm.formName.dialBColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="userDefinedForm.formName.dialBColor4" size="mini" ></el-color-picker>
                  </div>
                  <div :style="btnColor" class="colorbox"></div>
                </div>
              </div>
              <!-- 按钮字体的颜色 -->
              <div class="colour" style="border-bottom: none; margin-top:12px;">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>字体颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="userDefinedForm.formName.dialbColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="userDefinedForm.formName.dialbColor4" size="mini" ></el-color-picker>
                  </div>
                  <div :style="textColor" class="colorbox"></div>
                </div>
              </div>
          </div>
        </div>
        <!-- 这是单图 和 颜色背景的 -->
        <div class="uploadingImg"  v-if="$store.state.moveEnd.html1.attribute === 9 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
            <el-upload
                action=""
                style="position: relative; text-align: center; width: 90%; margin: 0 auto;"
                ref="upload"
                :auto-upload="false"
                :on-change="BCropState"
                :file-list="activeFormList"
                list-type="picture-card">
              <i class="el-icon-plus"></i>
                <div class="el-upload__text" >
                  <em>上传</em> 或
                  <em>拖动</em> 添加图片
                </div>
                <div class="el-upload__tip"
                      slot="tip"
                      style="
                width: 256px;color: #9FA9BA;margin-top: 20px">最多三张；支持jpg,png,jpeg；大小不超过600k；建议上传1920px*500px分辨率图片；</div>
            </el-upload>
          <div class="imghue" style="margin-top: 20px;">
              <div class="colour">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>设置背景颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="userDefinedForm.formName.imgtColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="userDefinedForm.formName.imgbColor4" size="mini" ></el-color-picker>
                  </div>
                  <div :style="imgbColor" class="colorbox"></div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <!--样式 插件 属性 tab栏系列 -->
      <div class="warehouse">
        <div
          :class="$store.state.moveEnd.html1.stylesActive === 1? 'active':'' "  class="yangshi" @click="actives(1)"
          >
          <div>
            <img src="@/assets/imgs/icon-右边栏-样式.png" alt="">
          </div>
          <span>
            样式
          </span>
        </div>
        <div
          class="yangshi" :class="$store.state.moveEnd.html1.stylesActive === 2? 'active':'' "  @click="actives(2)">
          <div>
            <i class="el-icon-setting"></i>
          </div>
          <span>
            插件
          </span>
        </div>
        <div
           class="yangshi"
           :class="$store.state.moveEnd.html1.stylesActive === 3? 'active':'' "  @click="actives(3)"
           >
          <div>
            <i class="el-icon-setting"></i>
          </div>
          <span>
            属性
          </span>
        </div>
      </div>
    </div>

    <div class="buttons">
      <el-row>
         <el-button size="medium" @click="back">返回</el-button>
        <el-button>取消</el-button>
        <el-button>预览</el-button>
        <!-- <el-button type="primary" style="background-color:#fff; color:#409eff;">保存</el-button> -->
        <el-button type="primary" @click="next">保存</el-button>
       </el-row>
    </div>
  </div>
</template>
<script src="./CoversStyle.js"></script>
<style lang="scss" scoped type="text/scss" src="./CoversStyle.scss">
</style>


