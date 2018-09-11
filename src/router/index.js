import Vue from 'vue';
import Router from 'vue-router';

// 移动端落地页
// import MoveEnd from '@/moveEnd/index'
// import Essential from '@/moveEnd/essential/Essential.vue' // 这是基本信息
// import CompileTemplate from '@/moveEnd/compileTemplate/CompileTemplate.vue' // 这是编辑模板
// import Template from '@/moveEnd/compileTemplate/template/Template.vue'
// import CoversStyle from '@/moveEnd/compileTemplate/template/coversStyle/CoversStyle.vue'
// import CentreCanvas from '@/moveEnd/compileTemplate/template/coversStyle/centreCanvas/CentreCanvas.vue'
// import Yang from '@/moveEnd/compileTemplate/template/coversStyle/centreCanvas/yang.vue'


// 我-移动端落地页
const MoveEnd = resolve => require(['../moveEnd/index'], resolve)
const Essential = resolve => require(['../moveEnd/essential/Essential.vue'],resolve)
const CompileTemplate = resolve => require(['../moveEnd/compileTemplate/CompileTemplate.vue'], resolve)
const Template = resolve => require(['../moveEnd/compileTemplate/template/Template.vue'], resolve)
const CoversStyle = resolve => require(['../moveEnd/compileTemplate/template/coversStyle/CoversStyle.vue'], resolve)
const CentreCanvas = resolve => require(['../moveEnd/compileTemplate/template/coversStyle/centreCanvas/CentreCanvas.vue'], resolve)
const Yang = resolve => require(['../moveEnd/compileTemplate/template/coversStyle/centreCanvas/yang.vue'], resolve)



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

const ReleaseManagement = resolve => require(['../ReleaseAnalysis/ReleaseManagement/index.vue'],resolve)//投放管理
const ByActivity = resolve => require(['../ReleaseAnalysis/ReleaseManagement/ByActivity.vue'],resolve)//投放管理-
const ByItem = resolve => require(['../ReleaseAnalysis/ReleaseManagement/ByItem.vue'],resolve)//投放管理
const ByCity = resolve => require(['../ReleaseAnalysis/ReleaseManagement/ByCity.vue'],resolve)//投放管理
const ByOrganization = resolve => require(['../ReleaseAnalysis/ReleaseManagement/ByOrganization.vue'],resolve)//投放管理
const ByChannel = resolve => require(['../ReleaseAnalysis/ReleaseManagement/ByChannel.vue'],resolve)//投放管理

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
      },
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
      //落地页设置
      path: '/eoveEnd',
      name: 'eoveEnd',
      component: MoveEnd,
      children: [
        {
          path: 'essential/:id',
          name: 'essential',
          component: Essential,
        },
        {
          path: 'compileTemplate',
          name: 'compileTemplate',
          component: CompileTemplate,
          children: [
            {
              path: 'template',
              name: 'template',
              component: Template,
              children: [
                {
                  path: 'coversStyle',
                  name: 'coversStyle',
                  component: CoversStyle,
                  children: [
                    {
                      path: 'centreCanvas',
                      name: 'centreCanvas',
                      component: CentreCanvas,
                      // beforeEnter: (to, from, next) => {
                      //   if (to.params.id === from.params.id) {
                      //     // next()
                      //   } else {
                      //     next()
                      //   }
                      //   console.log(to)
                      //   console.log(from)
                      //   console.log(next)
                      // }
                    },
                    {
                      path: 'yang',
                      name: 'yang',
                      component: Yang
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
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
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/CallerRecord/connected',
      name: '来电记录',
      component: CallerRecord,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/CallerRecord/unConnected',
      name: '来电记录',
      component: CallerRecord,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/CallerRecord/notDialing',
      name: '来电记录',
      component: CallerRecord,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/CallerRecord/all',
      name: '来电记录',
      component: CallerRecord,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/ReservationRecord',
      name: '预约记录',
      component: ReservationRecord,
      meta: {
        keepAlive: true // 需要被缓存
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
      path: '/Details/:uuid',
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
    },
    { //投放管理
      path: '/ReleaseManagement',
      component:ReleaseManagement,
      redirect:'/ReleaseManagement/ByActivity',
      meta: {
        keepAlive: false // 不需要被缓存
      },
      children:[
        {
          path: 'ByActivity',
          component: ByActivity,
          meta: {
            keepAlive: false // 不需要被缓存
          },
        },
        {
          path: 'ByItem',
          component: ByItem,
          meta: {
            keepAlive: false // 不需要被缓存
          },
        },
        {
          path: 'ByCity',
          component: ByCity,
          meta: {
            keepAlive: false // 不需要被缓存
          },
        },
        {
          path: 'ByChannel',
          component: ByChannel,
          meta: {
            keepAlive: false // 不需要被缓存
          },
        },
        {
          path: 'ByOrganization',
          component: ByOrganization,
          meta: {
            keepAlive: false // 不需要被缓存
          },
        },
      ]
    }
  ]
});
