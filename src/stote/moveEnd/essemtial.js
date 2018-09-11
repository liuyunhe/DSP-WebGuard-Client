const state = {
  majorKeyId: {
    html: '',
    uuid:'a7d22e17-4aad-11e8-a730-00163e047911'
  },
  template: {
    templateId: '1', // 第二步的模板Id
    data: {},
    num: 0,
  },

  // 中间画布清除, 以便第二步的保存
  canvasNum: 0,
  // 模板边框颜色的控制变量, 也是可以在保存的时候需要
  presentIndex: 0,

  // 新增的时候拿到模板列表返回的数据
  templateId: '',  // 模板id
  moveuuid: '', // 第一步上传成功之后 返回的一个ID
  html1: {
    stylesActive: 1, // 这是控制 样式 插件 和 属性的tab数据,
    property: 1, // 这是控制 属性的设置模板 显示与隐藏
    primary: 1, // 这是控制样式 和 插件里面的按钮tab 数据
    attribute: 1, // 这是控制属性 里面的哪些表单显示 的数据
    isLingering: 2, // 这是控制插件的驻留按钮合并 的 显示与隐藏
  },

  isData: 0, // 添加一个变量, 用来判断是否添加成功 以便不跳转页面用户再次更改
  moduleListNum: [], // 为了下面moduleList 数组的保存而定义的
  // 第二步保存的时候需要的参数
  moduleList: [],
  // 画布的数据
  canvasData: [], // 也是保存需要的参数

  // 第二步保存的时候需要的一个参数
  fieldsData: [],
  userDefinedForm: {
    colourInput: '', // 输入框的字体颜色
    textarea: '这是输入框', // 属性里面的文本框数据
    imgUrl1: 'http://182.61.33.241:8086/template/images/style/21.png', // 属性里面的上传图片
    imgUrl2: 'http://182.61.33.241:8086/template/images/style/21.png',
    imgUrl3: 'http://182.61.33.241:8086/template/images/style/21.png',imgUrl4: 'http://182.61.33.241:8086/template/images/style/21.png',imgUrl5: 'http://182.61.33.241:8086/template/images/style/21.png',imgUrl6: 'http://182.61.33.241:8086/template/images/style/21.png',imgUrl7: 'http://182.61.33.241:8086/template/images/style/21.png',
    imgnum: '', // 用来图片的删除联动
  },
  // 用来再次存储数据, 为了防止数据的冲突
  dataStorage:{
    imgs7:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs6:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs5:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs4:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs3:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs2:'http://182.61.33.241:8086/template/images/style/21.png',
    imgs1:'http://182.61.33.241:8086/template/images/style/21.png',
    text2H1:'加油! 不要为五斗米折腰',
    text2H3: '希望! 你永远有一颗年轻的心, 永远热泪眶溢',
    textSpan1: '鸿鹄! 千万里',
    textSpan2: '中国! 它禁枪, 那么你就爱我吧',
    textSpan3: '为你! 我愿意热爱整个世界',
  }
}
const mutations = {
  
}
const actions = {
  
}
const getters = {
  // moduleList(state) {
  //   return state.moduleList
  // }
}
export default {
  state,
  mutations,
  actions,
  getters
}
