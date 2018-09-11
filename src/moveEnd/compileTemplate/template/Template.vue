<template>
  <div class="templateSon">
    <div class="templateList">
      <span >
        页面
      </span>
      <ul class="pages ">
      <draggable v-model="$store.state.moveEnd.template.data.label" :move="getdata" @update="datadragEnd" >
            <transition-group name="list-complete"  tag="div" >
              <li v-for="(item, index) in $store.state.moveEnd.template.data.label" :key="index" @click="present(index, item)">
                <span>{{item.name}}</span>
                <div class="page" :class="$store.state.moveEnd.presentIndex === index? 'active': ''">
                  <!-- :src="`${GLOBAL.config.imgH}${item.url}`" -->
                  <img alt="">
                </div>
                <div class="addPage">
                  <i class="el-icon-circle-plus"></i>
                </div>
              </li>
          </transition-group>
      </draggable>
      </ul>
    </div>
    <div class="covers">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped type="text/scss" src="./Template.scss">
</style>
<script src="./Template.js"></script>
