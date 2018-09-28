const state = {
  majorKeyId: {
    styleType: '',
    html: '',
    uuid:'a7d22e17-4aad-11e8-a730-00163e047911'
  },
  template: {
    templateId: '1', // 第二步的模板Id
    data: {
      label: []
    },
    num: 0,
    name: [],
  },

  // chktemplate: [],
  // edit:false,

  html: '',
  // 以下几个个变量是用来控制画布代码块 和 表单  按钮 开发商信息画布的显示和隐藏
  plugForm: false,
  isLingeringBtn: false,
  styleCode: true,
  exploitData: false,
  // 控制按钮
  isBtn: false,
  isPitch: '',
  // 表单数据
  fromMenuData: [
    { value: '这里可以填写优惠信息或者促销slogen' },
    { value: '输入手机号' },
    {
      value: '输入姓名',
      // 是否显示 和 是否必选
      isVisual: 1,
      isMust: 1,
    },
    {
      value: '选择时间',
      isVisual: 1, // 预约输入框里面的是否显示与隐藏 显示为1 隐藏为2
      isMust: 1, // 预约输入框里面的是否必填
      checkType: 1, // 预约输入框里面的是否多选
      checkList: [], // 预约时间了吗的存储复选框 数据 数组
    },
    {
      value: '选择户型',
      isVisual: 1, // 户型是否显示
      isMust: 1, // 户型的是否必填
      checkType: 1, // 户型的是否多选
      // 下面是户型的input 框
      houseInput: [1,2,3,4,5,6,7,8,9],
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      // 下面是户型的input 框 是否显示
      isinput1: true,
      isinput2: true,
      isinput3: true,
      isinput4: true,
      isinput5: true,
      isinput6: true,
      isinput7: true,
      isinput8: true,
      isinput9: true,
    },
    {
      value: '提交',
      bColourInput: '8ec870', // 立即预约按钮的颜色 输入框的字体
      btnColor: '#8ec870', // 立即预约按钮的颜色 吸取笔
      // 别搞混乱, 一个是背景颜色  一个是字体颜色
      tColourInput: 'fff',
      txtColor: '#fff',
    },
    {
      value: '拨打电话',
      tel: '', // 拨打电话的电话号码
      bColourInput: 'f08522', // 拨打电话按钮的颜色 输入框的字体
      btnColor: '#f08522', // 拨打电话按钮的颜色 吸取笔
      tColourInput: 'fff', // 拨打电话字体的颜色 输入框的字体
      txtColor: '#fff', // 拨打电话字体的颜色 吸取笔
    },
  ],
  lingeringBtn: [],
  isLingering: false,
  // 开发商信息的输入框数据
  exploitInput: [
    {
      value: '地址:广州市天河区林和西路161号中泰国际广场B座28楼\n广州聚房宝网络科技股份有限公司所有\n粤ICP备13083997号-2',
      order: 1,
      type: 2,
    }
  ],
    
  // 中间画布清除, 以便第二步的保存
  canvasNum: 0,
  // 模板边框颜色的控制变量, 也是可以在保存的时候需要
  presentIndex: 0,

  // 样式代码块，在模板回选择的时候需要用到
  stylesCode: [],

  // 新增的时候拿到模板列表返回的数据
  templateId: '',  // 模板id
  moveuuid: '', // 第一步上传成功之后 返回的一个ID
  html1: {
    stylesActive: 1, // 这是控制 样式 插件 和 属性的tab数据,
    property: 1, // 这是控制 属性的设置模板 显示与隐藏
    primary: 1, // 这是控制样式 和 插件里面的按钮tab 数据
    attribute: 1, // 这是控制属性 里面的哪些表单显示 的数据
    isLingering: 3, // 这是控制插件的驻留按钮合并 的 显示与隐藏
  },

  isData: 0, // 添加一个变量, 用来判断是否添加成功 以便不跳转页面用户再次更改
  // 第二步保存的时候需要的参数
  moduleList: [],
  // 画布的数据
  canvasData: [], // 也是保存需要的参数
  hint: false,
  // 第二步保存的时候需要的一个参数
  fieldsData: [],
  userDefinedForm: {
    colourInput: '', // 输入框的字体颜色
    textarea: '这是输入框', // 属性里面的文本框数据
    imgUrl: 'http://182.61.33.241:8086/template/images/style/21.png', // 属性里面的上传图片
    imgnum: '', // 用来图片的删除联动
  },

  // 图片的数据存储
  uploadImg: [],
  // 画布的数据存储
  elmentFormOne: [],
  // 添加模板按钮的数组
  typeSelect: [],
  // 背景图片的存储
  backgroundUrl: '',
  // 这是 存储上传背景图片的的存储
  backgroundimg: '',
  // 轮播图的判断, 是否选中了轮播图
  isImgs: false,
}
const mutations = {

}
const actions = {

}
const getters = {
  background() {
    if (state.backgroundUrl) {
      if (state.backgroundUrl.charAt(0) === '#') {
        return `background: ${state.backgroundUrl}`
      } else {
        return `background-image: url(${state.backgroundUrl})`
      }
    } else {
      return `background: ${state.backgroundUrl}`
    }
  },
  txtColor() {
    return state.userDefinedForm.colourInput.replace('#', '')
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
