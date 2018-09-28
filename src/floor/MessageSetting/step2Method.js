import { URL_ROOT, IMG_UPLOAD } from '../../common/js/types';

//第二步选择编辑模块
export function editItem(item, index,isTopPlup) {
  console.log('第二步选择编辑模块');
  this.isEditorTextShow =true;
  this.ClickSelectImg=''

  this.step2BtnActive = '';
  console.log(this.steps1)
  this.pluginForm[2].value1 = this.steps1.callTel1;
  this.pluginForm[2].value2 = this.steps1.callTel2;
  console.log(item)
  if('navVisibility'  in item){
    this.navVisibility =item.navVisibility;
  }

  if(isTopPlup==1){
    //this.navVisibility=1;
    this.isTopPlups =true;
  }else {
    this.isTopPlups =false;
  }
  console.log(this.step2DialogLabel)
  console.log(this.step2.label)
  console.log(this.step2Active);
  console.log( item.name)
  console.log(item.id)
  if (this.step2Active == item.name) {
    this.step2Active = '';
  } else {
    this.step2Active = item.name;
    this.step2Right = Object.assign({}, item);
    this.step2Right.idx = index;
  }



}
//第二步编辑菜单按钮
export function editNav(name) {
  this.step2Active = '';
  if (this.step2BtnActive == name) {
    this.step2BtnActive = '';
  } else {
    this.step2BtnActive = name;
  }
}
//第二步添加label
export function addLabel() {
  if(this.step2.label.length==10){
    return
  }

  this.step2Active = '';
  this.dialogTableVisible = true;
  for(var i =0;this.step2.label.length>i;i++){
      console.log(this.step2.label[i])
  }

  this.step2LabelListCur =this.step2.label;
  this.step2LabelList =this.step2.label;//绑定已添加的数据
}
//选择标签
export function changeLable(is) {
  console.log(this.step2.label)
  if(is){
    console.log(this.step2LabelList[this.step2LabelList.length-1])
    this.step2LabelList[this.step2LabelList.length-1].saveId='';
    this.step2LabelList[this.step2LabelList.length-1].active='';
    this.step2LabelList[this.step2LabelList.length-1].resultList.map((item)=>{
        item.value=''
    })
  }
}


export  function step2LabelSubmit() {//保存标签
  let attr =[];

  this.step2LabelList.map((item,index)=>{
    console.log(item.id)

 /*   for(var i=0;this.changeLableList.length>i;i++){
        console.log(this.changeLableList[i].)
    }*/

      attr.push(item)
  });
  this.step2LabelListCur =attr;
  this.step2.label=attr;
  console.log(this.step2.label);
  this.saveStep2();
}

export  function handleCloseTableBox() {//取消保存
  this.dialogTableVisible = false;
 //console.log(this.step2LabelListCur);
  console.log(this.step2LabelList)
  let attr =[];
  this.step2LabelListCur.map((item,index)=>{
       attr.push(item);
  });
  this.step2LabelList=attr;
}

export function datadragEnd(evt) {
  this.step2Right.idx = evt.newIndex;
  //          console.log('拖动前的索引 :' + evt.oldIndex)
  //          console.log('拖动后的索引 :' + evt.newIndex)
}
//第二步删除标签
export function deleteItem(item, index) {
  let name = item.name;
  this.$confirm(
    `确定删除落地页中的 <span style="color: #0077FF;">${
      item.name
    }</span> 标签模块？</br>删除后落地页中将没有${item.name}模块的内容`,
    '提示',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      console.log(1111)
      this.step2.label.splice(index, 1);
    /*  this.step2LabelListCur =this.step2.label;
      this.step2LabelList =this.step2.label;*/
      console.log(this.step2.label)
      console.log(index)
      this.step2Active = '';
    })
    .catch(() => {});
}
//第二步编辑头图
export function editBanner() {
  this.step2ActiveTpye = 'banner';
  this.settingStepsActive = 2;
  this.step2Show = false;
  this.step3Show = true;
  /*let  _this=this;
   if (this.bannerFileList.length == 3) {
     //this.uploadDisabled = true;
    /!* setTimeout(function () {
       _this.$refs.upload.$children[1].$el.style.display = 'none';
     },100)*!/

   }*/
}
//第二步编辑label
export function editStyle() {
  this.saveStep2('next');
  console.log(this.step2Right)
  this.step2ActiveId = this.step2Right.id;
  let resultList = this.step2.label[this.step2Right.idx].resultList;
  let html = this.step2.label[this.step2Right.idx].html;
  let type = resultList ? resultList[0].type : '';
  console.log('resultList');
  console.log(resultList)
  console.log(type)

  if (resultList) {
    this.step3.status = 0;
    this.step3ActiveStyleId = resultList[0].styleId;
    console.log('yuuuuu');
    this.isSaveStyle =true;

    for(let i =0;this.styleList.length>i;i++){
      if(this.styleList[i].id == this.step3ActiveStyleId){
        console.log(this.styleList[i])
        this.ClickSelectImg = this.styleList[i].url;
      }
    }
    this.$api.requestStyleId(this.step3ActiveStyleId).then(res => {

      console.log(res)
      this.isEditorTextShow =false;
      this.AddSaveEdit =true
      this.cacheActiveFormList = res;//缓存
      if (type == 4) {
        this.activeFormList = res;

        let _this = this;
        this.fileList55 = resultList.map((obj, index) => {
          obj.url = obj.value;
          obj.formId = obj.id;
          return obj;
        });

        this.activeFormList[0].value = resultList.map((obj, index) => {
          obj.url = obj.value;
          obj.formId = obj.id;
          return obj;
        });


        this.activeFormList[0].value = this.activeFormList[0].value.filter(
          item => {
            return item.url !== undefined;
          }
        );

        this.copyActiveFormList = JSON.stringify(this.activeFormList);
      } else {
        const arr = res.map((item, index) => {
          if (item.type === 1) {
            this['imageUrl' + index] = resultList[index].value;
          }

          return {
            ...item,
            value: resultList[index].value || '',
            formId: resultList[index].id
          };
        });
        this.activeFormList = arr;
        // setTimeout(() => {
        //   this.activeFormList[0].value = resultList[0].value;
        // }, 500);
        this.copyActiveFormList = JSON.stringify(arr);
      }
    });
  }
  if (html) {
    this.step3.status = 1;
    this.editorContent = html;
    this.copyEditorContent = JSON.stringify(this.editorContent);
  } else {
    this.editorContent = '';
  }
  if (!html && !resultList) {
    this.step3.status = 0;
  }
  this.step2ActiveTpye = 'label';
  this.settingStepsActive = 2;
  this.step2Show = false;
  this.step3Show = true;
}
//第二步编辑插件
export function editPlugin() {
  this.step2ActiveId = this.step2Right.id;

  this.step2ActiveTpye = 'plugin';
  this.settingStepsActive = 2;
  this.step2Show = false;
  this.step3Show = true;


  this.saveStep2('next');

}
//第二步取消
export function cancelStep2() {
  if (this.copystep2 !== JSON.stringify(this.step2)) {
    this.$confirm('确定放弃当前的编辑？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        //this.saveStep2();
        this.$router.push({ path: '/LandingPageSetting' });
      })
      .catch(() => {
        //this.saveStep2 = JSON.parse(this.copystep2);
        // this.$router.push({ path: '/LandingPageSetting' });
      });
  } else {
    this.$router.push({ path: '/LandingPageSetting' });
  }
}
//第二步发布
export function publishstep2() {
  this.$api.pagelistUpdateStatus(this.steps1.uuid).then(res => {
    this.$message({
      type: 'success',
      message: '已上架!'
    });
  });
}
//第二步预览
export function previewStep2() {
  window.open(`${URL_ROOT}/api/private/1.0/page/preview/${this.steps1.uuid}`);
}
//第二步保存按钮
export function saveStep2(flag,link) {
  console.log(this.step2.label);


  let uuIds ='';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds=this.addUuid;
  }else{
    uuIds =this.uuid;
  }

  this.saveStep2Disabled = true;
  this.saveDisabled =true;
  //label
  let labelParams = this.step2.label.map((obj, index) => {
    console.log(obj)
    if(!("labelId" in obj)){ //不存在
      console.log('labelId')
      return {
        id: obj.saveId ? obj.saveId : '',
        marketInfoId: uuIds,
        labelId: obj.id,
        name: obj.rename ? obj.rename : obj.name,
        order: index + 1, //order从1开始
        styleId: obj.styleId ? obj.styleId : '',
        type: 1,
        navVisibility: this.navVisibility
      };

    }else{
      return {
        id: obj.saveId ? obj.saveId : '',
        marketInfoId: uuIds,
        labelId: obj.labelId,
        name: obj.rename ? obj.rename : obj.name,
        order: index + 1, //order从1开始
        styleId: obj.styleId ? obj.styleId : '',
        type: 1,
        navVisibility: this.navVisibility
      };
    }

  /*  return {
      id: obj.saveId ? obj.saveId : '',
      marketInfoId: uuIds,
      labelId: obj.labelId,
      name: obj.rename ? obj.rename : obj.name,
      order: index + 1, //order从1开始
      styleId: obj.styleId ? obj.styleId : '',
      type: 1,
      navVisibility: this.navVisibility
    };*/
  });


  console.log(labelParams);

  let pluginParams = this.step2.plugins.map((obj, index) => {
   return {
      id: obj.saveId ? obj.saveId : '',
      marketInfoId: uuIds,
      labelId: obj.id,
      name: '',
      order: index + 1, //order从1开始
      styleId: '',
      type: 2
      //              "navVisibility":1
    };
  });
  let params = [...labelParams, ...pluginParams];

  this.$api.saveSettingStep2(params).then(res => {
    console.log('res11111')
    console.log(res.labels)
   // console.log(this.step2.label)
    this.step2LabelList =res.labels
    //this.step2.label =[];
    //this.step2.label =res.labels

    this.saveStep2Disabled = false;
    this.saveDisabled =false;
   /* res.labels.map((obj, index) => {
      this.step2.label[index].saveId = obj.id;
      this.step2.label[index].id = obj.id;
      this.step2.label[index].labelId = obj.labelId;
    });
*/
    var lable=[];
    console.log(this.step2Right);
    for(var i=0;res.labels.length>i;i++){
    //  console.log(res.labels[i].labelId);
      if(res.labels[i].labelId==this.step2Right.id){
        this.step2ActiveId = res.labels[i].id;
      }
      for(var d=0;this.step2.label.length>d;d++){

          if(res.labels[i].labelId==this.step2.label[d].id){

            if(this.step2.label[d].saveId!=''){
              this.step2.label[d].saveId = res.labels[i].id;
            }else{
              this.step2.label[d].saveId = '';
            }
            this.step2.label[d].saveId = res.labels[i].id;
            this.step2.label[d]["labelId"]=res.labels[i].labelId;
            this.step2.label[d].id=res.labels[i].id;
          }
      }
    }
    console.log(this.step2ActiveId);
   // this.step2ActiveId = this.step2Right.id;


    console.log(this.step2.label)

    res.plugins.map((obj, index) => {
      this.step2.plugins[index].saveId = obj.id;
    });
    this.copystep2 = JSON.stringify(this.step2);

    if (flag == 'preview') {
      window.open(
        link+`/api/private/1.0/page/preview/`+uuIds
      );
      return
    }

    if (!flag) {
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    }

    if (flag == 'publish') {
      this.$api.pagelistUpdateStatus(uuIds).then(res => {
        this.$message({
          type: 'success',
          message: '已上架!'
        });
      });
      let _this =this;
      setTimeout(function () {
        _this.$router.push('/LandingPageSetting');
      },2000);
    }
  });
}
