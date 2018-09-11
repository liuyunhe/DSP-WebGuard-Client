
export default {
  isSaveStyle:false,//判断样式库是否编辑保存过
  fileName:'',
  // 裁剪
  CropId:0,//选择上传组件标识
  fullscreenLoading:false,
  dialogFormVisible: false,

  example2: {
   // img:'',
    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1036344994,1496927715&fm=11&gp=0.jpg', // 图片的地址
    info: true,
    size: 1,
    outputType: 'jpeg',
    canScale: true,
    autoCrop: true,
    centerBox:true,
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 100,
    autoCropHeight: 150,
    // 开启宽度和高度比例
    fixed: true,
    fixedNumber: [4, 3],
    high: false,
    original:true,
    infoTrue:true,
    maxImgSize:0
  },
  imgHeight:'',
// -------------

  uuid:0,//0新增   其他为修改   uuidx
  addUuid:'',//新增时的uuid
  editable: true,
  //步骤条传参
  settingSteps: ['基本信息', '编辑模块', '编辑内容'],
  settingStepsActive: 0,
  //样式库列表
  styleList: [],
  //步骤先是标识
  step1Show: true,
  step2Show: false,
  step3Show: false,
  //按钮禁用
  saveDisabled: false,

  //步骤1
  steps1: {
    pageName: '',
    orgName: '',
    projectCode: '',
    projectName: '',
    callTel: '',
    label: '',
    //400电话
    callTel1: '',
    callTel2: '',
    uuid: '',
    template: '',
    archiveId: '',
    deliveryManagements: [],
    orgId:'',//所属机构id
  },
  callTelDisabled:false,//是否禁止编辑
  stepsSave:false,//新增时是否已经保存数据

  minImageNUM:'',//保存是传送图片数量
  isEditorTextShow:true,//编辑内容问题切换选择

  copyDeliveryManagements: [],
  editorDeliveryManagements:[],//编辑返回已有渠道
  copyArchiveId: '',

  //多选数组
  orgNameList: [],
  projectList: [],
  archiveList: [],
  channelList: [],
  //step1保存标识
  step1Warining: false,
  step1SaveObject: {},
  isTopPlups:false,//top 图和插件是否在导航显示
  //步骤二
  step2: {
    basic: [
      {
        name: '头图',
        url: require('../../assets/landingpage/settings/setting_banner_icon@3x.png'),
        type: 0,
        order: 0,
        active:0,
      }
    ],
    label: [],//编辑模板数据
    plugins: []
  },
  picsLenght:[],
  step1Plugins:[],
  copystep2: '',
  //功能
  //添加label弹窗
  step2DialogLabel: [],//默认模板标签数据
  checkedLabels: [],
  dialogTableVisible: false,
  //当前选中标签名称
  step2Active: '',
  //当前选中标签ID
  step2ActiveId: '',
  step2Right: {},
  //          step2params:[],
  //按钮
  step2BtnActive: '',
  navVisibility: 1,
  step2SaveObject: {},
  //当前编辑功能
  step2ActiveTpye: '',

  //步骤3
  step3: {
    labelId: '',
    status: 0,
    //html块id,新增后返回
    htmlId: '',
    pageName: '',
    label: '',
    desc: ''
  },
  ClickSelectImg:'',//选择时的样式


  //弹窗图片
  dialogImageUrl: '',
  dialogVisible: false,
  //头图img列表
  uploadDisabled: false,
  bannerFileList: [],
  copyBannerFileList: [],
  //上传结果ID
  uploadresultList: [],
  //样式库上传图片
  imgLoading0: false,
  imageUrl0: '',
  imgLoading1: false,
  imageUrl1: '',
  imgLoading2: false,
  imageUrl2: '',
  imgLoading3: false,
  imageUrl3: '',
  imgLoading4: false,
  imageUrl4: '',
  imgLoading5: false,
  imageUrl5: '',
  imgLoading6: false,
  imageUrl6: '',
  imgLoading9: false,
  imageUrl9: '',
  imgLoading12: false,
  imageUrl12: '',
  imgLoading15: false,
  imageUrl15: '',
  fileList55:[],
  //当前选中样式库
  step3ActiveStyleId: '',
  activeFormList: [],
  copyActiveFormList: '',
  cacheActiveFormList:[], //缓存上一次编辑的保存的样式库
  AddSaveEdit:false,//新增保存后保存
  //编辑器内容
  editorContent: '',
  copyEditorContent: '',
  //插件表单
  pluginForm: [
    { value: '0' },
    { value: '0' },
    { value: '', value1: '0', value2: '0' },
    { value: '提交' },
    { value: '#1897DE' },
    { value: '0' },
    { value: '0' },
    { value: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    { value: '0' },
    { value: '0' },
    [{ value: '两房一厅一卫' }, { value: '' }]
  ],
  resetPluginForm: JSON.stringify([
    { value: '0' },
    { value: '0' },
    { value: '', value1: '0', value2: '0' },
    { value: '提交' },
    { value: '#1897DE' },
    { value: '0' },
    { value: '0' },
    { value: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    { value: '0' },
    { value: '0' },
    [{ value: '两房一厅一卫' }, { value: '两房一厅一卫' }]
  ]),
  copyPluginForm: JSON.stringify([
    { value: '0' },
    { value: '0' },
    { value: '', value1: '0', value2: '0' },
    { value: '提交' },
    { value: '#1897DE' },
    { value: '0' },
    { value: '0' },
    { value: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
    { value: '0' },
    { value: '0' },
    [{ value: '两房一厅一卫' }, { value: '两房一厅一卫' }]
  ]),

  isOneImg:false,//单图模式
  step2LabelList:[],
  step2LabelListCur:[],


  multipleId:'',//多图模式id
  multipleBannerId:'', //banner id
  labelIdSave:[],//保存记录模板id
};
