<template>
  <div class="crm-step-wrap clearfix"
    :class="stepsClass">
    <div class="crm-step"
      :class="{active:index <= active}"
      v-for="(item,index) in steps"
      :key="index">
      <i class="crm-step-line"
        v-if="index !== 0"></i>
      <div class="crm-step-number">{{ index + 1 }}</div>
      <div class="crm-step-name">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: ['steps1', 'steps2', 'steps3']
    },
    active: {
      type: Number,
      default: 0
    },
    stepsClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.crm-step-wrap {
  width: 1380px;
  height: 64px;
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #f2f4f8;
  .crm-step {
    float: left;
    height: 20px;
    line-height: 20px;
    color: #c0ccda;
    margin-right: 1px;
    font-size: 12px;
    .crm-step-line {
      float: left;
      width: 60px;
      height: 2px;
      background-color: #c0ccda;
      margin-top: 9px;
    }
    .crm-step-number {
      float: left;
      width: 18px;
      height: 18px;
      margin: 1px 5px;
      background-color: #c0ccda;
      border-radius: 10px;
      line-height: 18px;
      text-align: center;
      color: #fff;
    }
    .crm-step-name {
      float: left;
    }
    &.active {
      color: #0077ff;
      .crm-step-line {
        background-color: #0077ff;
      }
      .crm-step-number {
        background-color: #0077ff;
      }
      .crm-step-name {
        color: #0077ff;
      }
    }
  }
}
</style>
