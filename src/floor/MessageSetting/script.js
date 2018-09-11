
//  import _ from 'lodash'
import draggable from 'vuedraggable';
import crmSteps from '../../components/base/crmSteps.vue';
import crmEditor from '../../components/base/crmEditor.vue';
import ElFormItem from 'element-ui/packages/form/src/form-item.vue';
import state from './state';
import * as step1Method from './step1Method';
import * as step2Method from './step2Method';
import * as step3Method from './step3Method';
import footerA from '../../components/common/footer.vue'; //底部
// 引入vue-croppa 裁剪样式
import VueCropper from '../../components/common/cropper'

export default {
  components: {
    ElFormItem,
    crmSteps,
    crmEditor,
    draggable,
    footerA,
    VueCropper
  },
  /*beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    if(to.matched[0].path=='/EditCustomer/:bespeakId/:clientId/:projectId'){
      to.meta.keepAlive = false;
    }else{
      to.meta.keepAlive = true; // 让 A 缓存，即不刷新
    }
    next();
  },*/
  created() {


    this.steps1 = Object.assign(this.steps1, this.$store.state.LandingPage.steps1);

    //落地页id
    this.uuid = this.$route.params.uuid;//  为0 和1 新增
    //store获取模板id
    let templateId = {
      templateId: this.$route.params.templateId
    };
    console.log(this.uuid)
    if (this.uuid == '0' || this.uuid=='1') { //新增

      //获取落地页模板标签/插件列表
      this.getLabel(templateId);
      //请求落地页机构下拉菜单
      this.getOrgList();

    } else {
      this.steps1.uuid = this.uuid;
      this.getLabel(templateId);
      //const landingPageId = this.uuid;
      /* if (landingPageId) {
         this.$store.commit('setLandingPageId', landingPageId);
       }*/

      //请求落地页机构下拉菜单
      this.getOrgList();
      /*      //请求落地页项目下拉菜单
            this.getProjectList();*/


    }
    this.steps1.template = templateId['templateId'];
    //请求落地页样式库列表
    this.getStyleList();

    // 请求投放渠道
    this.getChannelList().then(() => {
      console.log(this.steps1.uuid)
      if (this.uuid == '0' || this.uuid=='1') {
        this.steps1.deliveryManagements = this.channelList.map(item => item.channelName).slice(0, 5);
        console.log(this.steps1.deliveryManagements)
      }
    });

  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    },
    currentActiveType() {
      const hasCover = this.activeFormList.find(item => item.type === 1);
      const nolyCover = this.activeFormList.find(item => item.type === 4);
      const hasTitle = this.activeFormList.find(item => item.type === 2);
      if (hasCover && hasTitle) {
        return 1;
      } else if (nolyCover) {
        return 2;
      } else if (hasCover && !hasTitle) {
        return 4;
      } else {
        return 3;
      }
    },
    currentActiveFormList() {
      const list = [];
      if (this.currentActiveType === 1) {
        for (let i = 0; i < this.activeFormList.length / 3; i++) {
          const o = {
            cover: this.activeFormList[i * 3],
            title: this.activeFormList[i * 3 + 1],
            desc: this.activeFormList[i * 3 + 2]
          };
          list.push(o);
        }
      }
      if (this.currentActiveType === 2 || this.currentActiveType === 4) {
        for (let i = 0; i < this.activeFormList.length; i++) {
          const o = {
            cover: this.activeFormList[i]
          };
          list.push(o);
        }
      }
      if (this.currentActiveType === 3) {
        for (let i = 0; i < this.activeFormList.length / 2; i++) {
          const o = {
            title: this.activeFormList[i * 2],
            desc: this.activeFormList[i * 2 + 1]
          };
          list.push(o);
        }
      }
      return list;
    },
    callTel1() {
      return this.steps1.callTel1
    },
    callTel2() {
      return this.steps1.callTel2;
    }
  },
  data() {
    return _.cloneDeep(state);
  },
  watch: {
    callTel2(val) {
      this.steps1.callTel2 = val.replace(/[^0-9]/g, '');
    },
    callTel1(val) {
      this.steps1.callTel1 = val.replace(/[^0-9]/g, '');
    },
    pluginForm(val) {
      this.pluginForm = val;
    },
    'steps1.projectCode'(val, oldVal) {
      if (val !== oldVal) {
        if (!this.steps1.uuid) {
          this.steps1.archiveId = '';
        }

        this.getArchiveList(val);
      }
    }
  },
  methods: {
    ...step1Method,
    ...step2Method,
    ...step3Method
  },
  updated () {
    // console.log(123)

    // console.log(cropper_size)
  },
  mounted() {
  },
  beforeDestroy() {
    this.$store.commit('InitialLandingPageType');
    this.$store.commit('InitialLandingPageId');

    // 重置状态
    Object.assign(this.$data, _.cloneDeep(state));
  }
};
