import Vue from 'vue';
import Router from 'vue-router';

const index = resolve => require(['../home/index.vue'], resolve);

const LandingPageSetting = resolve =>
  require(['../floor/LandingPageSetting/index.vue'], resolve);
const SelectLandingPageTemplate = resolve =>
  require(['../floor/SelectLandingPageTemplate/index.vue'], resolve);

const MessageSetting = resolve =>
  require(['../floor/MessageSetting/index.vue'], resolve);

const CustomerList = resolve => require(['../customer/CustomerList/index.vue'],resolve) // 用户列表
const CallerRecord = resolve => require(['../customer/CallerRecord/index.vue'],resolve) // 来电记录
const ReservationRecord = resolve => require(['../customer/ReservationRecord/index.vue'],resolve) // 预约记录
const CustomerDetails = resolve => require(['../customer/CustomerDetails/index.vue'],resolve) // 客户详情
const EditCustomer = resolve => require(['../customer/EditCustomer/index.vue'],resolve) // 客户详情
const Details = resolve => require(['../customer/Details/index .vue'],resolve) // 预约详情
const CallDetails = resolve => require(['../customer/CallDetails/index.vue'],resolve) // 来电详情


const Management = resolve => require(['../Management/index.vue'],resolve)//投放管理
const newDetails = resolve => require(['../Management/newDetails.vue'],resolve)//投放渠道详情
const Monitoring = resolve => require(['../Monitoring/index.vue'],resolve)//监控看板

const uploadChannelData = resolve => require(['../Assistant/uploadChannelData/uploadChannelData.vue'],resolve)//上传渠道数据
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      //首页
      path: '/index',
      component: index,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      //落地页设置
      path: '/LandingPageSetting',
      name: '落地页设置',
      component: LandingPageSetting,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/SelectLandingPageTemplate/:id',
      name: '从模板中创建',
      component: SelectLandingPageTemplate,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/MessageSetting/:uuid/:templateId', //isNew是否新增
      name: '落地页基本信息',
      component: MessageSetting,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/CustomerList',
      name: '客户列表',
      component: CustomerList,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/CallerRecord/:callType',
      name: '来电记录',
      component: CallerRecord,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/ReservationRecord',
      name: '预约记录',
      component: ReservationRecord,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/CustomerDetails/:bespeakId/:clientId/:projectId',
      name: '客户详情',
      component: CustomerDetails,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/EditCustomer/:bespeakId/:clientId/:projectId',
      name: '客户详情',
      component: EditCustomer,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/Details',
      name: '预约详情',
      component: Details,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/CallDetails/:uuid',
      name: '来电详情',
      component: CallDetails,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },


    { //投放管理
      path: '/Management',
      component: Management,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    { //投放渠道详情
      path: '/Management/newDetails/:id',
      component: newDetails,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    { //监控看板
      path: '/Monitoring',
      component: Monitoring,
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    { //上传渠道数据
      path: '/Assistant/uploadChannelData',
      component:uploadChannelData
    }
  ]
});
