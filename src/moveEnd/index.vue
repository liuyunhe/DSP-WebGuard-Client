<style lang="scss" scoped>
.moveEnd{
  width: 100%;
  margin: 0 auto;

  // 这是下面动态渲染的位置
  .formMenu{
    width: 100%;
    height: 100%;
  }
  .copyright{
    margin-top: 102px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: right;
    background: #fff;
    padding-right: 30px;
    // position: fixed;
    // buttom:0;
    z-index: 9;
    >p{
      color: gray;
      font-size: 12px;
      // position: relative
    }
  }
}
</style>
<template>
  <div class="moveEnd">
    <!-- 这里是一个坑,  是下面编辑的动态渲染 -->
    <div class="formMenu">
      <router-view></router-view>
    </div>
    <div class="copyright" style="position: fixed; bottom: 0px; border-top:1px solid #F0F3F5;padding:0 30px">
      <p>
        Copyright ⓒ 2016JUFUNS group.All right Reserved. 聚房宝 版权所有
      </p>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
