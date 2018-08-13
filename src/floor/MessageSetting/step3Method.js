import {URL_ROOT, IMG_UPLOAD} from '../../common/js/types';
import _ from 'lodash';
//第三步

//头图：上传图片


export function beforeRemove(file, fileList) {
  console.log(file)
  console.log(fileList)

  if (fileList.length <3) {
    this.$refs.upload.$children[1].$el.style.display = 'block';
  }else if(fileList.length==3) {
    this.$refs.upload.$children[1].$el.style.display = 'none';
  }

  if (file.status!='success') {
    console.log('noIMG')
    console.log(file)
    const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpeg';
    console.log(isJPG)
    if (!isJPG) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
      return  true
    }
    let numL=[];
    fileList.map((item,index)=>{
      console.log(item)
        if(item.status=='success'){
          numL.push(item)
        }
    });

    console.log(numL)

    if (numL.length <3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    }else if(numL.length==3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }
    return  true
  }

  this.$confirm('确定删除图片？', '提示信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('queding')
    console.log(fileList.length)


    fileList.map((obj, index) => {
      console.log(obj)
      if(file.uid==obj.uid){
        console.log('900000')
        fileList.splice(index,1);
      }
    });
    console.log(fileList)
    this.bannerFileList = fileList.map((obj, index) => {
      return {url: obj.url};
    });
    if (fileList.length < 3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    }else if(fileList.length==3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }

    return  true
   }).catch(() => {
     console.log('quxiao');
    if (fileList.length <3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    }else if(fileList.length==3){
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }
     return  false
  });
  return  false


}

export function handleRemove(file, fileList) {
  console.log('shanchu');
  console.log(file)
  console.log(this.bannerFileList)
  /* if (res.pics.length < 3) {
     this.$refs.upload.$children[1].$el.style.display = 'none';
   }*/
  if (fileList.length < 3) {
    this.$refs.upload.$children[1].$el.style.display = 'block';
  }
  this.bannerFileList = fileList.map((obj, index) => {
    return {url: obj.url};
  });
}

export function handleRemoveStyle(file, fileList) {
  this.activeFormList[0].value = fileList.map((obj, index) => {
    return {url: obj.url};
  });
}

export function handlePictureCardPreview(file) {
  this.dialogImageUrl = file.url;
  this.dialogVisible = true;
}

export function beforeUploadBanner(file) {
  console.log('tupianxianz');
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,JPEG,PNG 格式!');

    return  false
  }
  let isSize6 = file.size / 1024 / 1024 < 0.6;
  if (!isSize6) {
    this.$message({
      message: '上传文件大小不能超过 600kb!',
      type: 'warning'
    });
    return  false;
  }
  // this.uploadDisabled = true;

  return  true

}

export function uploadSuccess(response, file, fileList, res) {
  if (response.code === 1) {
    console.log(fileList.length);
    if (fileList.length == 3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
      this.uploadDisabled = true;
    }

    file.url = response.data.fileUrl;

    this.bannerFileList = fileList.map((obj, index) => {
      return {url: obj.url};
    });


  }
  this.uploadDisabled = false;
}

export function uploadSuccessStyle(response, file, fileList) {

  if (response.code === 1) {
    file.url = response.data.fileUrl;
    this.activeFormList[0].value = fileList.map(obj => {
      return {url: obj.url};
    });
  }
  this.uploadDisabled = false;
}

//第三步保存头图
export function saveStep3Banner(flag) {
  this.saveDisabled = true;
  let resultList = this.step2.basic[0].resultList;
  console.log(resultList);
  let fieldList = [];
  for (let i = 0; i < 3; i++) {
    fieldList.push({
      type: '0',
      value: this.bannerFileList[i] ? this.bannerFileList[i].url : '',
      id: resultList ? (resultList[i] ? resultList[i].id : '') : ''
    });
  }
  let uuIds = '';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  this.step2.basic.map((item,index)=>{
    item.active=1;
  });

  let params = {
    labelId: '',
    plannInfoId: uuIds,
    styleId: '',
    htmlId: '',
    fieldList
  };
  this.$api.saveSettingStep3(params).then(res => {
    this.saveDisabled = false;

    this.step2.basic[0].resultList = res.resultList;

    this.copyBannerFileList = Array.from(this.bannerFileList);
    if (!flag) {
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    }
    if (flag == 'preview') {
      this.saveStep2('preview');
    }
  });
}

//点击选择样式库
export function selectStyle(item, index, isOne) {
  console.log(isOne)
  if (isOne == '1') {
    this.isOneImg = true;
  }else {
    this.isOneImg = false;
  }

  console.log(this.isOneImg)
  this.isEditorTextShow = false;
  if (this.step3ActiveStyleId) {
    this.$confirm('确定放弃当前编辑内容并覆盖样式?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {

        this.ClickSelectImg = item.url;
        let flag = this.step2.label[this.step2Right.idx].htmlId;
        console.log(flag)
        if (flag) {

          let uuIds = '';
          if (this.uuid == '0' || this.uuid=='1') { //新增
            uuIds = this.addUuid;
          } else {
            uuIds = this.uuid;
          }


          let parmas = {
            plannInfoId: uuIds,
            labelId: this.step2.label[this.step2Right.idx].id,
            styleId: this.step2.label[this.step2Right.idx].styleId
              ? this.step2.label[this.step2Right.idx].styleId
              : ''
          };

          this.activeFormList = [];
          this.step3ActiveStyleId = item.id;
          this.initialImg();
          this.getStyleId(item.id);

          /*
                    this.$api.requestClearStyle(parmas).then(res => {
                      delete this.step2.label[this.step2Right.idx].resultList;
                      delete this.step2.label[this.step2Right.idx].html;
                      delete this.step2.label[this.step2Right.idx].htmlId;
                      delete this.step2.label[this.step2Right.idx].styleId;
                      this.activeFormList = [];
                      this.step3ActiveStyleId = item.id;
                      this.initialImg();
                      this.getStyleId(item.id);
                    });*/
        } else {
          this.step3ActiveStyleId = item.id;
          this.initialImg();
          this.getStyleId(item.id);
        }
      })
      .catch(() => {
      });
  } else {
    this.ClickSelectImg = item.url;
    this.step3ActiveStyleId = item.id;
    this.initialImg();
    this.getStyleId(item.id);
  }
}

//获取样式表单字段
export function getStyleId(id) {
  this.$api.requestStyleId(id).then(res => {
    console.log('style');
    console.log(res)
    this.activeFormList = res;
  });
}

//label编辑切换模式
export function step3GetStatus(value) {
  if (value == 0) {
    this.step3.status = 1;
  } else {
    this.step3.status = 0;
  }
  this.$confirm('确定放弃当前编辑内容并覆盖样式？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //清空数据
      let flag = this.step2.label[this.step2Right.idx].htmlId;
      if (flag) {
        let uuIds = '';
        if (this.uuid == '0' && this.uuid=='1') { //新增
          uuIds = this.addUuid;
        } else {
          uuIds = this.uuid;
        }

        let parmas = {
          plannInfoId: uuIds,
          labelId: this.step2.label[this.step2Right.idx].id,
          styleId: this.step2.label[this.step2Right.idx].styleId
            ? this.step2.label[this.step2Right.idx].styleId
            : ''
        };
        this.$api.requestClearStyle(parmas).then(res => {
        });
      }
      delete this.step2.label[this.step2Right.idx].resultList;
      delete this.step2.label[this.step2Right.idx].html;
      delete this.step2.label[this.step2Right.idx].htmlId;
      delete this.step2.label[this.step2Right.idx].styleId;

      this.editorContent = '';
      this.step3ActiveStyleId = '';
      this.activeFormList = [];
      this.step3.status = value;
    })
    .catch(() => {
    });
}

//样式库图片上传
//on-success
export function handleAvatarSuccess0(res, file, fileList) {
  this.imageUrl0 = res.data.fileUrl;
  this.activeFormList[0].value = this.imageUrl0;
  this.imgLoading0 = false;
}

//before-upload
export function beforeAvatarUpload0(file) {
  this.imgLoading0 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  //const isLt2M = file.size / 1024 / 1024 < 2;
  const isLt2M = file.size / 1024 < 600;
  //console.log(file.size);
  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading0 = false;
  }

  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading0 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess1(res, file, fileList) {
  this.imageUrl1 = res.data.fileUrl;
  this.activeFormList[1].value = this.imageUrl1;
  this.imgLoading1 = false;
}

//before-upload
export function beforeAvatarUpload1(file) {
  this.imgLoading1 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading1 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading1 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess2(res, file, fileList) {
  this.imageUrl2 = res.data.fileUrl;
  this.activeFormList[2].value = this.imageUrl2;
  this.imgLoading2 = false;
}

//before-upload
export function beforeAvatarUpload2(file) {
  this.imgLoading2 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading2 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading2 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess3(res, file, fileList) {
  this.imageUrl3 = res.data.fileUrl;
  this.activeFormList[3].value = this.imageUrl3;
  this.imgLoading3 = false;
}

//before-upload
export function beforeAvatarUpload3(file) {
  this.imgLoading3 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,JPEG,PNG 格式!');
    this.imgLoading3 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading3 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess4(res, file, fileList) {
  this.imageUrl4 = res.data.fileUrl;
  this.activeFormList[4].value = this.imageUrl4;
  this.imgLoading4 = false;
}

//before-upload
export function beforeAvatarUpload4(file) {
  this.imgLoading4 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading4 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading4 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess5(res, file, fileList) {
  this.imageUrl5 = res.data.fileUrl;
  this.activeFormList[5].value = this.imageUrl5;
  this.imgLoading5 = false;
}

//before-upload
export function beforeAvatarUpload5(file) {
  this.imgLoading5 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading5 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading5 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess6(res, file, fileList) {
  this.imageUrl6 = res.data.fileUrl;
  this.activeFormList[6].value = this.imageUrl6;
  this.imgLoading6 = false;
}

//before-upload
export function beforeAvatarUpload6(file) {
  this.imgLoading6 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading6 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading6 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess9(res, file, fileList) {
  this.imageUrl9 = res.data.fileUrl;
  this.activeFormList[9].value = this.imageUrl9;
  this.imgLoading9 = false;
}

//before-upload
export function beforeAvatarUpload9(file) {
  this.imgLoading9 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading9 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading9 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess12(res, file, fileList) {
  this.imageUrl12 = res.data.fileUrl;
  this.activeFormList[12].value = this.imageUrl12;
  this.imgLoading12 = false;
}

//before-upload
export function beforeAvatarUpload12(file) {
  this.imgLoading12 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading12 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading12 = false;
  }
  return isJPG && isLt2M;
}

//on-success
export function handleAvatarSuccess15(res, file, fileList) {
  this.imageUrl15 = res.data.fileUrl;
  this.activeFormList[15].value = this.imageUrl15;
  this.imgLoading15 = false;
}

//before-upload
export function beforeAvatarUpload15(file) {
  this.imgLoading15 = true;
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 < 600;

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,PNG 格式!');
    this.imgLoading15 = false;
  }
  if (!isLt2M) {
    this.$message.error('上传图片大小不能超过 600k!');
    this.imgLoading15 = false;
  }
  return isJPG && isLt2M;
}

//初始化图片
export function initialImg() {
  this.imgLoading0 = false;
  this.imageUrl0 = '';
  this.imgLoading1 = false;
  this.imageUrl1 = '';
  this.imgLoading2 = false;
  this.imageUrl2 = '';
  this.imgLoading3 = false;
  this.imageUrl3 = '';
  this.imgLoading4 = false;
  this.imageUrl4 = '';
  this.imgLoading5 = false;
  this.imageUrl5 = '';
  this.imgLoading6 = false;
  this.imageUrl6 = '';
  this.imgLoading9 = false;
  this.imageUrl9 = '';
  this.imgLoading12 = false;
  this.imageUrl12 = '';
  this.imgLoading15 = false;
  this.imageUrl15 = '';
}

//第三步保存Label
export function saveStep3Label(flag) {


  //this.saveDisabled = true;

  console.log(this.activeFormList)

  let fieldList;
  if (this.activeFormList[0].type == 4) {
    fieldList = [];
    let resultList = this.step2.label[this.step2Right.idx].resultList;
    for (let i = 0; this.activeFormList[0].value.length>i; i++) {
      fieldList.push({
        minImage: this.activeFormList[0].minImage,
        styleFieldId: this.activeFormList[0].id,
        type: 4,
        value: this.activeFormList[0].value[i]
          ? this.activeFormList[0].value[i].url
          : '',
        id: resultList ? (resultList[i] ? resultList[i].id : '') : ''
      });
    }
  } else {
    fieldList = this.activeFormList.map((item, idx) => {
      return {
        minImage: this.activeFormList[idx].minImage,
        styleFieldId: this.activeFormList[idx].id,
        type: this.activeFormList[idx].type,
        value: this.activeFormList[idx].value,
        id: this.activeFormList[idx].formId
          ? this.activeFormList[idx].formId
          : ''
      };
    });
  }


  let uuIds = '';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }
   console.log('step2ActiveId:'+this.step2ActiveId);

  this.labelIdSave.push(this.step2ActiveId)

  this.step2.label.map((item,index)=>{
    console.log(item);
    if(item.id==this.step2ActiveId){
       item['active'] =1;
    }
  });
  console.log('8879797987987');
  console.log(this.step2.label)




  let params = {
    labelId: this.step2ActiveId,
    plannInfoId: uuIds,
    styleId: this.step3ActiveStyleId,
    htmlId: this.step2.label[this.step2Right.idx].htmlId
      ? this.step2.label[this.step2Right.idx].htmlId
      : '',
    fieldList
  };

  let that = this;
  let hasError = false;

  params.fieldList.forEach(function (item, idx) {

    console.log(item);
    if (item.type === 4) {
      if (idx === 0) {
        if (!item.value) {

          that.$message({
            message: '请填写完整信息',
            type: 'error'
          });
          hasError = true;
          return false;
        }
      }
    } else {
      if (!item.value) {
        that.$message({
          message: '请填写完整信息',
          type: 'error'
        });
        hasError = true;
        return false;
      }
    }
  });
  if (hasError) {
    return false
  }
  this.saveDisabled = true;
  this.$api.saveSettingStep3(params).then(res => {
    this.saveDisabled = false;
    let index = this.step2Right.idx;
    this.step2.label[index].htmlId = res.htmlId;
    this.step2.label[index].resultList = res.resultList;
    this.step2.label[index].styleId = this.step3ActiveStyleId;
    this.copyActiveFormList = JSON.stringify(this.activeFormList);
    if (!flag) {
      that.$message({
        message: '保存成功',
        type: 'success'
      });
    }
    if (flag == 'preview') {
      that.saveStep2('preview');
    }
  });
}

//重置样式
export function resetStyle() {
  this.imageUrl0='';
  this.imageUrl1='';
  this.imageUrl2='';
  this.imageUrl3='';
  this.imageUrl4='';
  this.imageUrl5='';
  this.imageUrl6='';
  this.imageUrl9='';
  this.imageUrl12='';
  this.imageUrl15='';
  for(var i=0; this.activeFormList.length>i;i++){
    console.log(this.activeFormList[i])
    this.activeFormList[i].value ='';
  }
  //this.activeFormList =[];
}

//第三步保存editor
export function saveStep3Editor(flag) {
  let uuIds = '';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  this.saveDisabled = true;
  let index = this.step2Right.idx;
  let params = {
    plannInfoId: uuIds,
    labelId: this.step2ActiveId,
    htmlId: this.step2.label[this.step2Right.idx].htmlId
      ? this.step2.label[this.step2Right.idx].htmlId
      : '',
    html: this.editorContent
  };
  console.log(json)
  this.$api.saveEditorStep3(params).then(res => {
    this.saveDisabled = false;
    let index = this.step2Right.idx;
    this.step2.label[index].htmlId = res.id;
    this.step2.label[index].html = this.editorContent;

    this.copyEditorContent = JSON.stringify(this.editorContent);
    if (!flag) {
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    }
    if (flag == 'preview') {
      this.saveStep2('preview');
    }
  });
}

export function changeContent(content) {
  this.editorContent = content;
}

//重置编辑器
export function resetEditor() {
  this.editorContent = '';
}

//头图取消
export function step3BnnerCancel() {
  console.log(this.copyBannerFileList);
  console.log(this.bannerFileList)
  if (
    JSON.stringify(this.copyBannerFileList) !==
    JSON.stringify(this.bannerFileList)
  ) {
    this.$confirm('确定放弃当前编辑内容？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let attr =[];
        this.copyBannerFileList.map((item,index)=>{
          attr.push(item);
        })
        console.log(attr);
        this.bannerFileList =attr;
       // this.saveStep3Banner();
        this.step3Cancel();
      })
      .catch(() => {

        //this.bannerFileList = Array.from(this.copyBannerFileList);
        //this.step3Cancel();
      });
  } else {
    this.step3Cancel();
  }
}

export function step3LabelCancel() {
  if (this.copyActiveFormList !== JSON.stringify(this.activeFormList)) {
    this.$confirm('确定放弃当前的编辑？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.ClickSelectImg = '';
        this.isEditorTextShow =true;
      //  this.saveStep3Label();
        this.step3Cancel();
      })
      .catch(() => {
        //this.step3Cancel();
      });
  } else {
    this.step3Cancel();
  }
}

//编辑器取消
export function step3EditorCancel() {
  if (this.copyEditorContent !== JSON.stringify(this.editorContent)) {
    this.$confirm('确定放弃当前的编辑？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.saveStep3Editor();
        this.step3Cancel();
      })
      .catch(() => {
        this.editorContent = JSON.parse(this.copyEditorContent);
        //this.step3Cancel();
      });
  } else {
    this.step3Cancel();
  }
}

//插件取消
export function step3PluginCancel() {
  if (this.copyPluginForm !== JSON.stringify(this.pluginForm)) {
    this.$confirm('确定放弃当前的编辑？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
       // this.saveStep3Plugin();
        this.step3Cancel();
        this.pluginForm = JSON.parse(this.copyPluginForm);
      })
      .catch(() => {
        //this.pluginForm = JSON.parse(this.copyPluginForm);
        //this.step3Cancel();
      });
  } else {
    this.step3Cancel();
  }
}

export function step3Cancel() {
  this.settingStepsActive = 1;
  this.step2Show = true;
  this.step3Show = false;
  this.initialImg();
  this.step3ActiveStyleId = '';
  this.activeFormList = [];
}

//plugin删除户型
export function removeRoom(obj, idx) {
  this.pluginForm[10].splice(idx, 1);
  if (this.pluginForm[10].length == 0) {
    this.addRoomType();
  }
}

//电话格式变化
export function telTypeChange(val) {
  this.pluginForm[2].value = '';
  this.pluginForm[2].value1 = '';
  this.pluginForm[2].value2 = '';
}

//plugin增加户型
export function addRoomType() {
  const room = {value: ''};
  this.pluginForm[10].push(room);
}

//第三步保存plugin
export function saveStep3Plugin(flag) {
  this.saveDisabled = true;
  //验证是否为空
  console.log('验证')
  console.log(this.pluginForm);
  console.log(this.pluginForm[4].value)
  if (this.pluginForm[4].value == 'null' || this.pluginForm[4].value == null) {
    this.$message.error('按钮颜色不能为空!');
    this.saveDisabled = false;
    return
  }

  if (this.pluginForm[5].value == '0') {
    if (this.pluginForm[7].value.length == 0) {
      this.$message.error('预约时间不能为空!');
      this.saveDisabled = false;
      return
    }
  }

  if (this.pluginForm[8].value == '0') {//户型显示验证
    if (this.pluginForm[10][0].value == '') {
      console.log('huxing');
      this.$message.error('户型不能为空!');
      this.saveDisabled = false;
      return
    }
  }


  let fieldList = Object.assign({}, this.pluginForm);
  if (fieldList[2].value1 || fieldList[2].value2) {
    fieldList[2] = {
      value: `${this.pluginForm[2].value1}转${this.pluginForm[2].value2}`
    };
  } else {
    fieldList[2] = {value: this.pluginForm[2].value};
  }

  let arr7 = fieldList[7].value;
  if (arr7.length > 0) {
    fieldList[7] = {value: arr7.join(',')};
  } else {
    fieldList[7] = {value: ''};
  }

  let arr10 = fieldList[10].map(item => {
    return item.value;
  });
  if (arr10.length > 0) {
    fieldList[10] = {value: arr10.join(',')};
  } else {
    fieldList[10] = {value: ''};
  }

  let resultList = this.step2.plugins[this.step2Right.idx].resultList;
  fieldList = _.map(fieldList, (obj, idx) => {
    return {
      id: resultList ? (resultList[idx] ? resultList[idx].id : '') : '',
      value: obj.value
    };
  });
  let uuIds = '';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  console.log(this.step2.plugins)
  this.step2.plugins.map((item,index)=>{
    console.log(item)
    item['active']=1;
  })

  let params = {
    labelId: this.step2ActiveId,
    plannInfoId: uuIds,
    htmlId: this.step2.plugins[0].htmlId ? this.step2.plugins[0].htmlId : '',
    fieldList
  };
  console.log(JSON.stringify(params));
  this.$api.saveSettingStep3(params).then(res => {
    this.saveDisabled = false;
    let index = this.step2Right.idx;
    this.step2.plugins[index].htmlId = res.htmlId;
    this.step2.plugins[index].resultList = res.resultList;
    this.copyPluginForm = JSON.stringify(this.pluginForm);
    if (!flag) {
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    }
    if (flag == 'preview') {
      this.saveStep2('preview');
    }
  });
}
