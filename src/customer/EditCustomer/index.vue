<template>
    <section class="view-container clearfix">
      <!--面包屑-->
      <el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
         <el-button size="small fr" type="primary"   style="margin-left:12px;" @click="customerUpdate()">保存</el-button>
        <el-button size="small fr" class="important" @click="$router.go(-1)">返回</el-button>
      </el-col>

     <!--基本资料-->
      <div class="biaoti">
        <span>基本资料</span>
      </div>
     <div class="ziliao clearfix">
       <ul>
         <li>客户姓名</li>
         <li>客户性别</li>
         <li>工作区域</li>
         <li>客户类型</li>
       </ul>
       <ul class="khxx" >
         <li><el-input class="shuru" v-model="form.cstName" maxlength="10"></el-input></li>
         <li>
            <el-select v-model="form.cstSex" class="xiala">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
         <li><el-input class="shuru" v-model="form.cstWorkArea" maxlength="10"></el-input></li>
         <li>{{form.collectionMethod}}</li>
       </ul>
       <ul>
         <li>手机号码</li>
         <li>客户职业</li>
         <li>交通方式</li>
         <li>认知途径</li>
       </ul>
       <ul class="khxx">
         <li>{{form.mobilePhone}}</li>
         <li>
           <el-select v-model="form.cstOccupaTion" class="xiala">
              <el-option
                v-for="item in occupaTionList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
         </li>
         <li><el-input class="shuru" v-model="form.cstTraffic" maxlength="10"></el-input></li>
         <li>
           <el-select v-model="form.cognitiveApproach" class="xiala">
              <el-option
                v-for="item in rztjList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select></li>
       </ul>
       <ul>
         <li>所属项目</li>
         <li>客户年龄</li>
         <li>归属置业顾问</li>
         <li></li>
       </ul>
       <ul class="khxx" >
         <li class="xm" style="line-height: 37px;">{{form.projectName}}</li>
         <li>
           <el-select v-model="form.cstAge" class="xiala">
              <el-option
                v-for="item in ageList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select></li>
         <li>{{form.consultantName}}</li>
         <li></li>
       </ul>
        <ul>
         <li>客户状态</li>
         <li>居住区域</li>
         <li>号码归属地</li>
         <li></li>
       </ul>
        <ul class="khxx">
         <li>{{form.cstStatus}}</li>
         <li><el-input class="shuru" v-model="form.cstHomeArea"></el-input></li>
         <li>{{form.mobileCity}}</li>
         <li></li>
       </ul>
     </div>

      <!--需求信息-->
      <div class="bt">
        <span>需求信息</span>
      </div>


     <div class="xuqiu clearfix">
       <ul>
         <li>需求类型</li>
         <li>需求户型</li>
       </ul>
       <ul class="khxx">
         <li>
           <el-select v-model="form.needType" class="xiala">
              <el-option
                v-for="item in needTypeList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
         <li>
           <el-select v-model="form.needHuixing" class="xiala">
              <el-option
                v-for="item in needHuixingList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
       </ul>
       <ul>
         <li>付款方式</li>
         <li>置业目的</li>
       </ul>
       <ul class="khxx">
         <li><el-select v-model="form.needPay" class="xiala">
              <el-option
                v-for="item in payList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
         <li><el-select v-model="form.needPurchase" class="xiala">
              <el-option
                v-for="item in homePurposeList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
       </ul>
       <ul>
         <li>预算单价</li>
         <li>意向程度</li>
       </ul>
       <ul class="khxx">
         <li><el-input class="shuru" v-model="form.needUnitPrice" maxlength="10"></el-input></li>
         <li>
           <el-select v-model="form.intentionalDegree" class="xiala">
              <el-option
                v-for="item in intentionalDegreeList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select></li>
       </ul>
        <ul>
         <li>需求面积</li>
         <li>备注</li>
       </ul>
        <ul class="khxx">
         <li><el-input class="shuru" v-model="form.needArea" maxlength="10"></el-input></li>
         <li><el-input class="shuru" v-model="form.remark" maxlength="10"></el-input></li>
       </ul>
       <!-- -------------------- -->
        <ul>
         <li>是否有销售关系</li>
       </ul>
       <ul class="khxx">
         <li>
           <el-select v-model="form.isSalesContact" class="xiala">
              <el-option
                v-for="item in isSalesContactList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
       </ul>
       <!-- ----------------------- -->
         <ul>
         <li>跟进程度</li>
       </ul>
       <ul class="khxx">
         <li>
           <el-select v-model="form.followUpDegree" class="xiala">
              <el-option
                v-for="item in followUpDegreeList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
       </ul>
       <!-- ----------------------- -->
        <ul>
         <li>回访情况</li>
       </ul>
        <ul class="khxx">
         <li><el-input style=";" class="shuru" v-model="form.returnVisitSituation" maxlength="10"></el-input></li>
       </ul>
        <ul>
         <li class="back"></li>
       </ul>
        <ul class="khxx" style="border-right: 1px solid #dce0e6" :v-model="needInfo">
         <li></li>
       </ul>
     </div>


      <footerA style="position: fixed;bottom:0px"></footerA>
    </section>
</template>

<script src="./script.js"></script>
<style lang="scss" type="text/scss" src="./style.scss">
</style>
