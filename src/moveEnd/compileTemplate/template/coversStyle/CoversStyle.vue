<template>
  <div class="CoversStyle">
    <div class="cover">
      <!-- 中间得画布 -->
        <div class="coverRight">
            <span class="text" style="display: inline-block;text-align: center;width: 100%;">
              {{$store.state.moveEnd.template.data.label[$store.state.moveEnd.template.num].name}}
            </span>
            <div class="codeChunk" id="parent" ref="codeChunk" :style="$store.getters.background" v-if="$store.state.moveEnd.styleCode"><!--:header="stylesArr[2].content"-->
              <!-- <vue-html-panel   :isHtml.asyc="isHtml" ></vue-html-panel> -->
             <router-view ></router-view>
            </div>

            <!-- 画布小功能的按钮 -->
            <div class="coverBtn">
              <div class="coverReset" @click="coverEmpty">
                <img src="@/assets/imgs/icon-主画布-清除按钮.png" alt="">
              </div>
              <div class="coverBackground" @click="backgroundImg">
                <img src="@/assets/imgs/icon-主画布-画布按钮.png" alt="">
              </div>
              <template v-if="$store.state.moveEnd.template.num==0">
                <div class="coverDelete" >
                  <img src="@/assets/imgs/icon-主画布-删除按钮2.png" alt="">
                </div>
              </template>
              <template v-else>
                <div class="coverDelete" @click="deleteTemplate" >
                  <img src="@/assets/imgs/icon-主画布-删除按钮.png" alt="">
                </div>
              </template>

            </div>
        </div>

        <!-- 开发商信息 -->
        <div class="exploitData" v-if="$store.state.moveEnd.exploitData">
          <div>
            <span @click="exploit" v-html="$store.state.moveEnd.exploitInput[0].value.replace(/\n|\r\n/g,'<br/>')">
            </span>
          </div>
        </div>

        <!-- 插件表单 -->
        <div  class="plug" style="
        "    v-if="$store.state.moveEnd.plugForm">
          <div
            class="special" :class="$store.state.moveEnd.isPitch === 0? 'pitch':'' "
            @click="formMenu(0)"
            >
              {{$store.state.moveEnd.fromMenuData[0].value}}
          </div>

          <!-- 表单框 -->
            <form action="" style="padding:0 2.9375rem 1.25rem 2.9375rem;">
              <input type="text"
              readonly
              class="input" :class="$store.state.moveEnd.isPitch === 1? 'pitch':'' "
              @click="formMenu(1)"
              oninput="if(value.length>11)value=value.slice(0,11)"
              :value="$store.state.moveEnd.fromMenuData[1].value"
              style="
              ">
              <input type="text"
              readonly
              class="input" :class="$store.state.moveEnd.isPitch === 2? 'pitch':'' " @click="formMenu(2)"
              :value="$store.state.moveEnd.fromMenuData[2].value"
              style="
              ">
              <input type="text"
              readonly
              class="input" :class="$store.state.moveEnd.isPitch === 3? 'pitch':'' "
              @click="formMenu(3)"
              :value="$store.state.moveEnd.fromMenuData[3].value"
              style="
              ">
              <input type="text"
              readonly
              class="input" :class="$store.state.moveEnd.isPitch === 4? 'pitch':'' "
              @click="formMenu(4)"
              :value="$store.state.moveEnd.fromMenuData[4].value"
              style="
              margin-bottom:  2.5rem
              ">
              <input
              type="button"
              :value="$store.state.moveEnd.fromMenuData[5].value" :class="$store.state.moveEnd.isPitch === 5? 'pitch':'' "
              @click="formMenu(5)"
              style="
              width: 100%;
              height:2.5rem;
              border-radius: .625rem;
              border: .0625rem solid #f2f2f2;
              font-size: 1.0625rem;
              color: #ffffff;
              box-shadow:0 0 1px 1px #bbbbbb;
              background: linear-gradient(#7bc275,#a7d068);
              margin-bottom: 1.25rem
              "
              :style=" Color+';'+btnColor"
              >
              <input
              type="button"
              :value="$store.state.moveEnd.fromMenuData[6].value"  :class="$store.state.moveEnd.isPitch === 6? ':class':'' "
              @click="formMenu(6)"
              style="
              width: 100%;
              height:2.5rem;
              border-radius: .625rem;
              border: .0625rem solid #f2f2f2;
              font-size: 1.0625rem;
              color: #ffffff;
              box-shadow:0 0 1px 1px #bbbbbb;
              background: linear-gradient(#ee7614,#f5a743)
              "
              :style=" dialColor+';'+dialbColor"
              >
          </form>
        </div>
        <!-- 插件驻留按钮 -->
        <div v-if="$store.state.moveEnd.isLingeringBtn" class="lingeringBtn">
          <div style="width: 100%;position: absolute;bottom: 30px;" class="lingerings ">
            <img style="width: 60px; height: 60px; margin-left: 60px" src="@/assets/imgs/icon-驻留按钮-电话图标（空心橙色）.png" alt="" @click="clickElment(0)"
              class="lingeringLeft">
            <img style="margin-left: 116px; width: 60px; height: 60px;" src="@/assets/imgs/icon-驻留按钮-预约图标.png" alt="" @click="clickElment(1)"
              class="lingeringRight">
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
                :disabled="$store.state.moveEnd.isBtn"
                size="small" style="margin-left:4px;"
                :type="$store.state.moveEnd.html1.primary === 1?'primary':'' "
                @click="btnType(1)"
                >图文样式</el-button>
                <el-button
                :disabled="$store.state.moveEnd.isBtn"
                size="small"
                :type="$store.state.moveEnd.html1.primary === 2?'primary':'' "
                @click="btnType(2)"
                >图片样式</el-button>
                <el-button
                :disabled="$store.state.moveEnd.isBtn"
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
                :disabled="$store.state.moveEnd.isBtn"
                size="small" style="margin-left:4px; padding:9px 26px"
                :type="$store.state.moveEnd.html1.primary === 4?'primary':'' "
                @click="btnType(4)"
                >表单</el-button>
                <el-button
                :disabled="!$store.state.moveEnd.isBtn"
                size="small"
                style="padding:9px 26px"
                :type="$store.state.moveEnd.html1.primary === 5?'primary':'' "
                @click="btnType(5)"
                >驻留</el-button>
                <el-button
                :disabled="$store.state.moveEnd.isBtn"
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
              <li v-for="(item, index) in stylesArr" :key="index" v-if="item.type === 5 && $store.state.moveEnd.html1.primary === 4" @click="getCanvasData(item)">
                <img  :src="`${GLOBAL.config.imgH}${item.url}`" alt="">
              </li>

              <!-- <li  v-if="$store.state.moveEnd.html1.primary === 4" @click="getCanvasData(7)">
                <img  src="@/assets/from.png" alt="">
              </li> -->
            </ul>
        </div>

        <!-- 驻留按钮的合成表单, 里面的数据绑定 还是和下面的分离一样共用的 -->
        <div class="formLingeringMerge" v-if="$store.state.moveEnd.html1.isLingering === 1 && $store.state.moveEnd.html1.stylesActive === 3">
          <!-- 手机输入框 -->
          <!-- <div class="formPhoneNumber" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <span>
              属性
            </span>
            <div>
              <span style="font-size: 14px;">
                设置电话号码
              </span>
              </div>
            <div>
              <span style="color:#999;font-size: 14px;">
                电话号码
              </span>
            </div>
            <div>
              <el-input v-model="" size="small" style="width: 96%"></el-input>
              <span style="color:red;font-size:16px;">*</span>
            </div>
          </div> -->
          <!-- 留电框 -->
          <div class="formSubmitBtn" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <div class="inputBox">
              <span>
                设置预约按钮
              </span>
              <span style="color:#999; display: inline-block; width: 100%;">
                留电框
              </span>
              <div>
                <el-input v-model="lingeringBtn[1].value"  size="small" style="width: 96%"></el-input>
                <span style="color:red;font-size:16px;">*</span>
              </div>
            </div>
          </div>
          <!-- 姓名输入框 -->
          <div class="formName" style="padding-bottom: 20px; border-bottom: 1px  solid #eee;">
            <div class="choiceBtn" style="padding-bottom: 0;border-bottom:none">
              <div class="showChoice">
                <el-radio v-model="lingeringBtn[2].isVisual" label="0">显示</el-radio>
                <el-radio v-model="lingeringBtn[2].isVisual" label="1">隐藏</el-radio>
              </div>
              <div class="requiredChoice">
                <el-radio v-model="lingeringBtn[2].isMust" label="0">选填</el-radio>
                <el-radio v-model="lingeringBtn[2].isMust" label="1">必选</el-radio>
              </div>
            </div>
            <div class="inputBox">
              <span>
                姓名框
              </span>
              <div>
                <el-input v-model="lingeringBtn[2].value" placeholder="请输入内容"  size="small" style="width: 96%"></el-input>
              </div>
            </div>
          </div>
          <!-- 预约时间 -->
          <div class="formAppointment" style="padding-bottom: 10px; border-bottom: 1px  solid #eee;">
            <div class="choiceBtn" style="padding-bottom: 0;border-bottom:none">
              <div class="showChoice">
                <el-radio v-model="lingeringBtn[3].isVisual" label="0">显示</el-radio>
                <el-radio v-model="lingeringBtn[3].isVisual" label="1">隐藏</el-radio>
              </div>
              <div class="requiredChoice">
                <el-radio v-model="lingeringBtn[3].isMust" label="0">选填</el-radio>
                <el-radio v-model="lingeringBtn[3].isMust" label="1">必选</el-radio>
              </div>
              <div class="ismultipleChoice">
                <el-radio v-model="lingeringBtn[3].checkType" label="0">多选</el-radio>
                <el-radio v-model="lingeringBtn[3].checkType" label="1">单选</el-radio>
              </div>
            </div>
            <div class="weeks">
              <span>
                选择预约时间
              </span>
              <div class="Multiple">
                <el-checkbox-group
                v-model="lingeringBtn[3].checkList" >
                  <el-checkbox label="周一">周一</el-checkbox>
                  <el-checkbox label="周二">周二</el-checkbox>
                  <el-checkbox label="周三">周三</el-checkbox>
                  <el-checkbox label="周四">周四</el-checkbox>
                  <el-checkbox label="周五">周五</el-checkbox>
                  <el-checkbox label="周六">周六</el-checkbox>
                  <el-checkbox label="周七">周七</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <!-- 选择户型 -->
          <div class="formHouse" style="padding-top: 16px; border-bottom: 1px  solid #eee;">
            <div class="houseBtn">
              <div class="houseChoice">
                <el-radio v-model="lingeringBtn[4].isVisual" label="0">显示</el-radio>
                <el-radio v-model="lingeringBtn[4].isVisual" label="1">隐藏</el-radio>
              </div>
              <div class="houseChoice">
                <el-radio v-model="lingeringBtn[4].isMust" label="0">选填</el-radio>
                <el-radio v-model="lingeringBtn[4].isMust" label="1">必选</el-radio>
              </div>
              <div class="houseChoice">
                <el-radio v-model="lingeringBtn[4].checkType" label="0">多选</el-radio>
                <el-radio v-model="lingeringBtn[4].checkType" label="1">单选</el-radio>
              </div>
            </div>
            <div class="definitionHouse">
              <div class="houseText" style="display: flex;justify-content: space-between;line-height: 28px;">
                <span>可选户型</span>
                <span style="margin-right: 66px">{{userDefinedForm.formName.house.houseInput.length}}/9</span>
              </div>
              <div class="houseInput">
                <div v-for="(item, index) in lingeringBtn[4].input" :key="index">
                  <el-input v-model="lingeringBtn[4].input[index]" :placeholder="lingeringBtn[4].input
                  [index].item" size="small" maxlength="8"></el-input>
                  <span>{{item.length}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(index)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <!-- <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput2">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input2" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput2}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(2)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput3">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input3" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput3}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(3)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput4">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input4" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput4}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(4)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput5">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input5" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput5}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(5)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput6">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input6" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput6}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(6)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput7">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input7" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput7}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(7)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput8">
                    <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input8" placeholder="请输入内容" size="small"  maxlength="8"></el-input>
                    <span>{{houseIsinput8}}/8</span>
                    <div class="deleteHouse" @click="deleteHouse(8)" >
                      <i class="el-icon-delete"></i>
                    </div>
                </div>
                <div v-if="$store.state.moveEnd.lingeringBtn[4].isinput9">
                  <el-input v-model="$store.state.moveEnd.lingeringBtn[4].input9" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                  <span>{{houseIsinput9}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(9)" >
                    <i class="el-icon-delete"></i>
                  </div>
                </div> -->
                  <!-- 添加 -->
                <div v-if="lingeringBtn[4].input.length  <= 8">
                  <el-input placeholder="请输入内容" size="small "></el-input>
                  <div class="deleteHouse" style="right:-12px;" @click="addHouse">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 手机输入框 -->
        <div class="formPhoneNumber" v-if="$store.state.moveEnd.html1.isLingering === 2 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div>
          <span>
            输入框文案
          </span>
            <el-input v-model="$store.state.moveEnd.lingeringBtn[0].value"
             placeholder="请输入内容" size="small "></el-input>
          </div>
        </div>


    <!-- 裁剪的模态框 -->
    <div  class="tailorBox">
      <el-dialog title="编辑图片" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="50%">
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
        <!-- 开发商信息的输入框 -->
        <div class="property" v-if="$store.state.moveEnd.html1.attribute === 3 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
            <div class="property_1">
              <el-input
                type="textarea"
                :rows="6"
                resize="none"
                placeholder="请输入内容"
                v-model="$store.state.moveEnd.exploitInput[0].value">
              </el-input>
            </div>
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
              <span style="font-size:12px">颜色</span>
              <div class="hueBox">
                <div class="hue-kuang">
                  <span>#</span>
                  <el-input v-model="$store.getters.txtColor"
                  size="mini " style="display: inline-block; width: 82px;">4564</el-input>
                </div>
                <div class="hue">
                  <el-color-picker v-model="$store.state.moveEnd.userDefinedForm.colourInput" size="mini" ></el-color-picker>
                </div>
                <div :style="color" class="colorbox">
                  <el-color-picker v-model="$store.state.moveEnd.userDefinedForm.colourInput" size="mini"
                  style="width:100%"></el-color-picker>
                </div>
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
              list-type="picture-card"
              :show-file-list="false"
              >
          <div class="imgShow" v-if="$store.state.moveEnd.uploadImg.length !== 0"  v-for="(item, index) in $store.state.moveEnd.uploadImg" :key="index" >
            <img :src="item.url" alt="" style="width:100%;height:100%;">
            <i  v-if="$store.state.moveEnd.uploadImg.length !== 0" class="el-icon-delete" style="
                font-size:20px;
                padding:10px 48%;
                z-index: 10;"
                @click="deleteImg(index,$event)">
              </i>
          </div>

            <i class="el-icon-plus" v-if="$store.state.moveEnd.uploadImg.length === 0"></i>
              <div class="el-upload__text" v-if="$store.state.moveEnd.uploadImg.length === 0">
                <em class="up">上传</em> 或
                <em class="pull">拖动</em> 添加图片
              </div>
              <div v-if="$store.state.moveEnd.uploadImg.length === 0"
              class="el-upload__tip"
                    slot="tip"
                    style="width: 256px;color: #9FA9BA;margin-top: 20px">
                支持JPG/PNG/JPEG;大小不超过600kb</div>



          </el-upload>

        </div>

        <!-- 轮播图 -->
        <div class="uploadingImg" v-if="$store.state.moveEnd.html1.attribute === 4 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="imgShow" v-if="$store.state.moveEnd.uploadImg.length !== 0"  v-for="(item, index) in $store.state.moveEnd.uploadImg" :key="index" >
            <img :src="item.url" alt="" style="width:100%;height:100%;">
            <i  v-if="$store.state.moveEnd.uploadImg.length !== 0" class="el-icon-delete" style="
                font-size:20px;
                padding:10px 48%;
                z-index: 10;"
                @click="deleteImg(index,$event)">
            </i>
          </div>
          <el-upload
            action=""
            style="position: relative; text-align: center; width: 90%; margin: 0 auto;"
            ref="upload"
            :before-remove="deleteImg"
            :auto-upload="false"
            :on-change="CropState"
            :file-list="activeFormList"
            list-type="picture-card"
            :show-file-list="false"
          >

            <i class="el-icon-plus"></i>
            <div class="el-upload__text" >
              <em class="up">上传</em> 或
              <em class="pull">拖动</em> 添加图片
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
              style="width: 256px;color: #9FA9BA;margin-top: 20px">
              支持JPG/PNG/JPEG;大小不超过600kb</div>
          </el-upload>
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
                :show-file-list="false"
                list-type="picture-card">
                <img :src="$store.state.moveEnd.backgroundimg" v-if="$store.state.moveEnd.backgroundimg !== ''" alt="" style="width:100%;height:100%;">
              <i class="el-icon-plus" v-if="$store.state.moveEnd.backgroundimg === ''"></i>
                <div class="el-upload__text" v-if="$store.state.moveEnd.backgroundimg === ''">
                  <em class="up">上传</em> 或
                  <em class="pull">拖动</em> 添加图片
                </div>
                <div class="el-upload__tip"
                      slot="tip"
                      style="
                width: 256px;color: #9FA9BA;margin-top: 20px" v-if="$store.state.moveEnd.backgroundimg === ''">支持JPG/PNG/JPEG;大小不超过600kb</div>
            </el-upload>
          <div class="imghue" style="margin-top: 20px;">
              <div class="colour">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span class="setcolor">设置背景颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="imgtColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="$store.state.moveEnd.backgroundUrl" size="mini" ></el-color-picker>
                  </div>
                  <div :style="imgbColor" class="colorbox">
                    <el-color-picker v-model="$store.state.moveEnd.backgroundUrl" size="mini"
                    style="width:100%"></el-color-picker>
                  </div>
                </div>
              </div>
          </div>
        </div>


        <!-- 以下是表单的内容 -->
        <div class="property" v-if="$store.state.moveEnd.isPitch === 0 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
            <div class="property_1">
              <el-input
                type="textarea"
                :rows="6"
                resize="none"
                placeholder="请输入内容"
                v-model="$store.state.moveEnd.fromMenuData[0].value">
              </el-input>
            </div>
            <div class="colour">
              <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
              <span style="font-size:12px">颜色</span>
              <div class="hueBox">
                <div class="hue-kuang">
                  <span>#</span>
                  <el-input v-model="userDefinedForm.colourInput"
                  size="mini " style="display: inline-block;  width: 82px;"></el-input>
                </div>
                <div class="hue">
                  <el-color-picker v-model="userDefinedForm.color4" size="mini" ></el-color-picker>
                </div>
                <div :style="color" class="colorbox">
                  <el-color-picker v-model="userDefinedForm.color4" size="mini"
                  style="width:100%"></el-color-picker>
                </div>
              </div>
            </div>
        </div>
        <!-- 手机输入框 -->
        <div class="formPhoneNumber" v-if="$store.state.moveEnd.isPitch === 1 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div>
          <span>
            输入框文案
          </span>
            <el-input v-model="$store.state.moveEnd.fromMenuData[1].value"
             placeholder="请输入内容" size="small "></el-input>
          </div>
        </div>
        <!-- 姓名输入框 -->
        <div class="formName" v-if="$store.state.moveEnd.isPitch === 2 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="choiceBtn">
            <div class="showChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[2].isVisual" label=0>显示</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[2].isVisual" label=1>隐藏</el-radio>
            </div>
            <div class="requiredChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[2].isMust" label=0>选填</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[2].isMust" label=1>必选</el-radio>
            </div>
          </div>
          <div class="inputBox">
            <span>
              输入框文案
            </span>
            <div>
              <el-input v-model="$store.state.moveEnd.fromMenuData[2].value" placeholder="请输入内容"  size="small "></el-input>
            </div>
          </div>
        </div>
        <!-- 预约时间 -->
        <div class="formAppointment" v-if="$store.state.moveEnd.isPitch === 3 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="choiceBtn">
            <div class="showChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].isVisual" label=0>显示</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].isVisual" label=1>隐藏</el-radio>
            </div>
            <div class="requiredChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].isMust" label=0>选填</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].isMust" label=1>必选</el-radio>
            </div>
            <div class="ismultipleChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].checkType" label=0>多选</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[3].checkType" label=1>单选</el-radio>
            </div>
          </div>
          <div class="weeks">
            <span>
              选择预约时间
            </span>
            <!-- 单选 和 多选 两个代码 -->
            <div class="single" v-if="$store.state.moveEnd.fromMenuData[3].checkType === '1' ">
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="1">周一</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="2">周二</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="3">周三</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="4">周四</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="5">周五</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="6">周六</el-radio>
                <el-radio v-model="$store.state.moveEnd.fromMenuData[3].value" label="7">周日</el-radio>
            </div>
            <div class="Multiple" v-if="$store.state.moveEnd.fromMenuData[3].checkType === 0">
              <el-checkbox-group
              v-model="$store.state.moveEnd.fromMenuData[3].checkList">
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
        <div class="formHouse" v-if="$store.state.moveEnd.isPitch === 4 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="houseBtn">
            <div class="houseChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].isVisual" label=0>显示</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].isVisual" label=1>隐藏</el-radio>
            </div>
            <div class="houseChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].isMust" label=0>选填</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].isMust" label=1>必选</el-radio>
            </div>
            <div class="houseChoice">
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].checkType" label=0>多选</el-radio>
              <el-radio v-model="$store.state.moveEnd.fromMenuData[4].checkType" label=1>单选</el-radio>
            </div>
          </div>
          <div class="definitionHouse">
            <div class="houseText" style="display: flex;justify-content: space-between;line-height: 28px;">
              <span>可选户型</span>
              <span style="margin-right: 66px">{{$store.state.moveEnd.fromMenuData[4].houseInput.length}}/9</span>
            </div>
            <div class="houseInput">
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput1">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input1" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput1}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(1)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput2">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input2" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput2}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(2)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput3">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input3" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput3}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(3)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput4">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input4" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput4}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(4)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput5">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input5" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput5}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(5)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput6">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input6" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput6}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(6)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput7">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input7" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput7}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(7)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput8">
                  <el-input v-model="$store.state.moveEnd.fromMenuData[4].input8" placeholder="请输入内容" size="small"  maxlength="8"></el-input>
                  <span>{{houseIsinput8}}/8</span>
                  <div class="deleteHouse" @click="deleteHouse(8)" >
                    <i class="el-icon-delete"></i>
                  </div>
              </div>
              <div v-if="$store.state.moveEnd.fromMenuData[4].isinput9">
                <el-input v-model="$store.state.moveEnd.fromMenuData[4].input9" placeholder="请输入内容" size="small" maxlength="8"></el-input>
                <span>{{houseIsinput9}}/8</span>
                <div class="deleteHouse" @click="deleteHouse(9)" >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
                <!-- 添加 -->
              <div v-if="$store.state.moveEnd.fromMenuData[4].houseInput.length  <= 8">
                <el-input placeholder="请输入内容" size="small "></el-input>
                <div class="deleteHouse" style="right:-12px;" @click="addHouse($store.state.moveEnd.fromMenuData[4].houseInput.length+1)" >
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 立即预约 -->
        <div class="formSubmitBtn" v-if="$store.state.moveEnd.isPitch === 5 &&  $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="inputBox">
            <span>
              输入框文案
            </span>
            <div>
              <el-input v-model="$store.state.moveEnd.fromMenuData[5].value" placeholder="请输入内容" size="small "></el-input>
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
                    <el-input v-model="$store.state.moveEnd.fromMenuData[5].bColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="$store.state.moveEnd.fromMenuData[5].btnColor" size="mini" @change="hue($store.state.moveEnd.fromMenuData[5],1)"></el-color-picker>
                  </div>
                  <div :style="btnColor" class="colorbox">
                    <el-color-picker v-model="userDefinedForm.color4" size="mini"
                    style="width:100%"></el-color-picker>
                  </div>
                </div>
              </div>
              <!-- 按钮字体的颜色 -->
              <div class="colour" style="border-bottom: none">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>字体颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="$store.state.moveEnd.fromMenuData[5].tColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="$store.state.moveEnd.fromMenuData[5].txtColor" size="mini" @change="hue($store.state.moveEnd.fromMenuData[5],2)"></el-color-picker>
                  </div>
                  <div :style="textColor" class="colorbox">
                    <el-color-picker v-model="userDefinedForm.color4" size="mini"
                    style="width:100%"></el-color-picker>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <!-- 拨打电话 -->
        <div class="formDial" v-if="$store.state.moveEnd.isPitch=== 6 && $store.state.moveEnd.html1.stylesActive === 3">
            <span>
              属性
            </span>
          <div class="dialInput">
            <span>
              按钮名称
            </span>
            <div>
              <el-input v-model="$store.state.moveEnd.fromMenuData[6].value" placeholder="请输入内容"  size="small "></el-input>
            </div>
            <span style="margin-top: 12px;">
              电话号码
            </span>
            <div style="padding-bottom: 14px;border-bottom: 1px solid #eee;">
              <el-input v-model="$store.state.moveEnd.fromMenuData[6].tel" placeholder="请输入内容"  size="small "></el-input>
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
                    <el-input v-model="$store.state.moveEnd.fromMenuData[6].bColourInput"
                    size="mini " style="display: inline-block; width: 82px;
                    "></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="$store.state.moveEnd.fromMenuData[6].btnColor" size="mini"  @change="hue($store.state.moveEnd.fromMenuData[6],1)"></el-color-picker>
                  </div>
                  <div :style="dialbColor" class="colorbox">
                    <el-color-picker v-model="userDefinedForm.color4" size="mini"
                    style="width:100%"></el-color-picker>
                  </div>
                </div>
              </div>
              <!-- 按钮字体的颜色 -->
              <div class="colour" style="border-bottom: none; margin-top:12px;">
                <!-- 颜色选择器的盒子, 为了放置一个吸取颜色笔的背景图 -->
                <span>字体颜色</span>
                <div class="hueBox">
                  <div class="hue-kuang">
                    <span>#</span>
                    <el-input v-model="$store.state.msoveEnd.fromMenuData[6].tColourInput"
                    size="mini " style="display: inline-block; width: 82px;"></el-input>
                  </div>
                  <div class="hue">
                    <el-color-picker v-model="$store.state.moveEnd.fromMenuData[6].txtColor" size="mini" @change="hue($store.state.moveEnd.fromMenuData[6],2)"></el-color-picker>
                  </div>
                  <div :style="dialtColor" class="colorbox">
                    <el-color-picker v-model="userDefinedForm.color4" size="mini"
                    style="width:100%"></el-color-picker>
                  </div>
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
            <template  v-if="$store.state.moveEnd.html1.stylesActive===1" >
              <img src="@/assets/imgs/ys1.fw.png" alt="">
            </template>
            <template  v-else>
              <img src="@/assets/imgs/ys.png" alt="">
            </template>
          </div>

          <span>
            样式
          </span>
        </div>
        <div
          class="yangshi" :class="$store.state.moveEnd.html1.stylesActive === 2? 'active':'' "  @click="actives(2)">
          <div>
            <template  v-if="$store.state.moveEnd.html1.stylesActive===2" >
              <img src="@/assets/imgs/cj1.png" alt="">
            </template>
            <template  v-else>
              <img src="@/assets/imgs/cj.png" alt="">
            </template>
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
            <template  v-if="$store.state.moveEnd.html1.stylesActive===3" >
              <img src="@/assets/imgs/sx1.fw.png" alt="">
            </template>
            <template  v-else>
              <img src="@/assets/imgs/sx.png" alt="">
            </template>
          </div>
          <span>
            属性
          </span>
        </div>
      </div>
    </div>

    <div class="buttons">
      <el-row>
        <el-button @click="cansel">取消</el-button>
        <el-button @click="previewLandingPage(GLOBAL.config.PreUrl)">预览</el-button>
        <!-- <el-button type="primary" style="background-color:#fff; color:#409eff;">保存</el-button> -->
         <el-button size="medium" @click="reset">重置</el-button>
        <el-button type="primary" @click="next">保存</el-button>
       </el-row>
    </div>
  </div>
</template>
<script src="./CoversStyle.js"></script>
<style lang="scss" scoped type="text/scss" src="./CoversStyle.scss">
</style>
