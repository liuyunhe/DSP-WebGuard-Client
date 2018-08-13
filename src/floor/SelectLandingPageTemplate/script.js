import multiplyChooser from '../../components/base/multiplyChooser.vue';
import {URL_ROOT} from '../../common/js/types';
import footerA from '../../components/common/footer.vue'; //底部
export default {
  components: {
    multiplyChooser,
    footerA
  },
  created() {
    this.getTemplateList();
    console.log(this.id)
  },
  data() {
    return {
      tagsProNum: [
        {
          label: '单个项目',
          value: 0
        },
        {
          label: '多个项目',
          value: 1
        }
      ],
      tagsProNumModel: '',
      browsing: [
        {
          label: '长图型',
          value: 1
        },
        {
          label: '翻页型',
          value: 2
        }
      ],
      browsingModel: '',
      emphasis: [
        {
          label: '通 用',
          value: '通用'
        },
        {
          label: '优 惠',
          value: '优惠'
        },
        {
          label: '户 型',
          value: '户型'
        },
        {
          label: '区 位',
          value: '区位'
        },
        {
          label: '配 套',
          value: '配套'
        },
        {
          label: '教 育',
          value: '教育'
        },
        {
          label: '交 通',
          value: '交通'
        },
        {
          label: '园 林',
          value: '园林'
        },
        {
          label: '品 牌',
          value: '品牌'
        }
      ],
      emphasisModel: '',
      templateList: [],
      picList: {
        image: require('../../assets/example.png')
      },
      id: this.$route.params.id,//0 导航进入   1 弹窗进入
    };
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
  methods: {
    cancelSelect() {
      let router = this.$router;
      router.push({path: '/LandingPageSetting'});
    },
    getTemplateList() {
      console.log(this.tagsProNumModel)
      let showProjects = [];
      if(this.tagsProNumModel!=''){
        showProjects.push(this.tagsProNumModel);
      }

      let viewWays=[]
      if(this.browsingModel!=''){
        viewWays.push(this.browsingModel);
      }

      let importants=[];
      if(this.emphasisModel!=''){
        importants.push(this.emphasisModel);
      }

      let params = {
        pageSize: 10,
        pageNo: 1,
        showProjects: showProjects,
        viewWays: viewWays,
        importants:importants
      }
      this.$api.getTemplateList(params).then(res => {
        this.templateList = res.list;
      });
    },
    previewTemplate(item) {
      window.open(`${URL_ROOT + item.tmpPage}`);
    },
    useTemplate(item) {

      console.log(item.uuid)
      this.$store.commit('setLandingPageType', item.uuid);
      if (this.$route.params.id == '0') {
        this.$router.push({path: '/MessageSetting/0/' + item.uuid});
      } else {
        this.$router.push({path: '/MessageSetting/' + this.$route.params.id + '/' + item.uuid});
      }

    }
  },
  mounted() {
  }
};
