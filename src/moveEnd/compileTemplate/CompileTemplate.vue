<style lang="scss" scoped>
.compiletemplate{
  width: 100%;
  .el-dialog{
    .typeFrame{
      width: 96%;
      margin: 0 auto;
      // background-color: palevioletred;
      border: 1px solid #666;
      border-radius: 6px;
      .moduleName{
        padding-left: 40px;
        font-weight: 600;
        height: 30px;
        line-height: 30px;
        background-color: #f8f9fe;
        border-radius:6px 6px 0 0 ;
        border-bottom: 1px solid #999;
      }
      .typeBtn{
        .el-checkbox{
          padding-left: 20px;
          margin: 0;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #999;
        }
      }
    }
  }
  *{
    padding: 0;
    margin: 0;
  }
  .template{
    width: 100%;
    height: 1324px;
    display: inline-block;
  }
 .buttons{
    height: 92px;
    padding: 30px 0px;
    border-top: 1px solid rgb(242, 244, 248);
    border-bottom: 1px solid rgb(242, 244, 248);
    margin-bottom: 10px;
    >.el-row{
      float:right;
      .el-button{
        padding:6px 32px;
      }
    }
  }
}
</style>

<template>
  <div class="compiletemplate">
    <div class="template">
      <router-view></router-view>
    </div>
    <!-- <div class="covers">
      <router-view></router-view>
    </div>
    <div class="styleLibrary">
      <router-view></router-view>
    </div> -->
    
    <!-- <div class="buttons">
      <el-row>
        <el-button>取消</el-button>
        <el-button>预览</el-button>
        <el-button type="primary" style="background-color:#fff; color:#409eff;">保存</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
       </el-row>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted() {
    // console.log(this.$store.state.moveEnd.moveuuid)
  },
  methods: {
    next() {
      console.log('保存')
      console.log(this.$store.state.moveEnd.userDefinedForm)
    }
  }
}
</script>
