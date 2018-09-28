<template>
  <div class="templateSon">
    <div class="templateList">
      <span >
        模块
      </span>
      <ul class="pages ">
      <draggable v-model="$store.state.moveEnd.template.data.label"  :options="{
        scroll: true,
        animation: 150,
    }"  @start ="startDraggable" :move="getdata" @update="datadragEnd" >
            <transition-group name="list-complete"  tag="div"  class="draggableClass" >
              <li v-for="(item, index) in $store.state.moveEnd.template.data.label" :key="index"  >
                <span>{{item.name}}</span>
                <div class="page" :class="$store.state.moveEnd.presentIndex === index? 'active': ''" @click="present(index, item)">
                  <!-- :src="`${GLOBAL.config.imgH}${item.url}`" -->
                  <img alt="" :src="`${GLOBAL.config.imgH}${item.img}`">
                </div>

                <div class="addPage"  v-if="$store.state.moveEnd.template.data.label.length!=index+1">
                  <i class="el-icon-circle-plus" @click="dialogFormVisible = true"></i>
                </div>
              </li>
              <!-- <li v-for="(item, index) in $store.state.moveEnd.template.data.plugins" :key="index" >
                <span>{{item.name}}</span>
                <div class="page" :class="$store.state.moveEnd.presentIndex === index ? 'active': ''" @click="present(index, item)">
                  <img alt="" :src="`${GLOBAL.config.imgH}${item.img}`">
                </div>
                <div class="addPage">
                  <i class="el-icon-circle-plus"></i>
                </div>
              </li> -->
          </transition-group>
      </draggable>


      </ul>
    </div>
    <div class="covers">
      <router-view></router-view>
    </div>

    <!-- 选择插入类型模态框 -->
    <el-dialog title="选择添加的插入页标签模块" :visible.sync="dialogFormVisible" width="30%">
      <div class="typeFrame">
         <div class="typeBtn">
           <h2>模块名称</h2>
          <el-checkbox-group v-model="template">
            <div  class="list"  v-for="(item, index) in $store.state.moveEnd.typeSelect"
                  :key="index">
            <el-checkbox  :label="item" :disabled="item.active==1?true:false" ><div @click="clickLabile(item)">{{item.name}}</div></el-checkbox>
            </div>
          </el-checkbox-group>
         </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="templateConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped type="text/scss" src="./Template.scss">
</style>
<script src="./Template.js"></script>
