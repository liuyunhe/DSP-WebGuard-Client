import {URL_ROOT, IMG_UPLOAD} from '../../common/js/types';
import _ from 'lodash';
// 引入上传图片的axios
import {tailor} from "@/apis/index.js";
import {setTimeout} from 'timers';
//第三步

//头图：上传图片


export function beforeRemove(file, fileList) {
  console.log(file)
  console.log(fileList)

  if (fileList.length < 3) {
    this.$refs.upload.$children[1].$el.style.display = 'block';
  } else if (fileList.length == 3) {
    this.$refs.upload.$children[1].$el.style.display = 'none';
  }

  if (file.status != 'success') {
    console.log('noIMG')
    console.log(file)
    const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/jpeg';
    console.log(isJPG)
    if (!isJPG) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
      return true
    }
    let numL = [];
    fileList.map((item, index) => {
      console.log(item)
      if (item.status == 'success') {
        numL.push(item)
      }
    });

    console.log(numL)

    if (numL.length < 3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    } else if (numL.length == 3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }
    return true
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
      if (file.uid == obj.uid) {
        console.log('900000')
        fileList.splice(index, 1);
      }
    });
    console.log(fileList)
    this.bannerFileList = fileList.map((obj, index) => {
      return {url: obj.url};
    });
    if (fileList.length < 3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    } else if (fileList.length == 3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }

    return true
  }).catch(() => {
    console.log('quxiao');
    if (fileList.length < 3) {
      this.$refs.upload.$children[1].$el.style.display = 'block';
    } else if (fileList.length == 3) {
      this.$refs.upload.$children[1].$el.style.display = 'none';
    }
    return false

  });
  return false


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

  this.fileList55 = fileList.map((obj, index) => {
    return {url: obj.url};
  });
}

export function handlePictureCardPreview(file) {
  this.dialogImageUrl = file.url;
  this.dialogVisible = true;
}

export function beforeUploadBanner(file) {
  console.log('图片上传之前');
  console.log(file)
  console.log(12315648)
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';

  if (!isJPG) {
    this.$message.error('上传图片只能是 JPG,JPEG,PNG 格式!');

    return false
  }
  let isSize6 = file.size / 1024 / 1024 < 0.6;
  if (!isSize6) {
    this.$message({
      message: '上传文件大小不能超过 600kb!',
      type: 'warning'
    });
    return false;
  }
  // this.uploadDisabled = true;

  return true

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


export function uploading() {
  // 当点击确定的时候, 就进行请求, 让上传图片自定义实现
  this.fullscreenLoading = true;
  this.$refs.cropper.getCropData((data) => {

    //console.log(data)
    // console.log(file)
    // let img = window.URL.createObjectURL(data)
    // let jsons = JSON.stringify()
    tailor({'imgStr': data, 'fileName': this.fileName})
      .then(res => {
        console.log(res);
        this.example2.fixed=true;
        if (this.CropId == 1000) {
          if(this.multipleBannerId>='0'){
            this.bannerFileList[this.multipleBannerId] ={url: res.data.data.fileUrl}
            this.copyBannerFileList.push({url: res.data.data.fileUrl});
          }else {
            this.bannerFileList.push({url: res.data.data.fileUrl});
            this.copyBannerFileList.push({url: res.data.data.fileUrl});
          }

          this.$refs.cropper.refresh();
          console.log(this.bannerFileList.length)
          /*if (this.bannerFileList.length >= 3) {
            this.$refs.upload.$children[1].$el.style.display = 'none';
          }*/
          this.fullscreenLoading = false;
          return
        }


        console.log(this.activeFormList)
        for (var index = 0; this.activeFormList.length > index; index++) {

          let item = this.activeFormList[index];
          console.log('type' + this.activeFormList[index].type);
          console.log(this.CropId);
          this.$refs.cropper.refresh();
          this.fullscreenLoading = false;


          if (this.activeFormList[index].type == 4) {
            if(this.multipleId>='0'){//修改多图
              this.fileList55[this.multipleId] ={url: res.data.data.fileUrl}
             // this.fileList55.push({url: res.data.data.fileUrl});
              this.activeFormList[0].value = this.fileList55;

              this.multipleId ='';

            }else{//添加
              this.fileList55.push({url: res.data.data.fileUrl});
              this.activeFormList[0].value = this.fileList55;
            }

            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 0) {
            this.imageUrl0 = res.data.data.fileUrl;
            this.activeFormList[0].value = this.imageUrl0;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 1) {
            this.imageUrl1 = res.data.data.fileUrl;
            this.activeFormList[1].value = this.imageUrl1;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 2) {
            this.imageUrl2 = res.data.data.fileUrl;
            this.activeFormList[2].value = this.imageUrl2;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 3) {
            this.imageUrl3 = res.data.data.fileUrl;
            this.activeFormList[3].value = this.imageUrl3;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 4) {
            this.imageUrl4 = res.data.data.fileUrl;
            this.activeFormList[4].value = this.imageUrl4;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 5) {
            this.imageUrl5 = res.data.data.fileUrl;
            this.activeFormList[5].value = this.imageUrl5;
            return
          } else if (this.activeFormList[index].type === 1 && this.CropId === 6) {
            this.imageUrl6 = res.data.data.fileUrl;
            this.activeFormList[6].value = this.imageUrl6;
            console.log(this.imageUrl6)
          } else if (this.activeFormList[index].type === 1 && this.CropId === 9) {
            this.imageUrl9 = res.data.data.fileUrl;
            this.activeFormList[9].value = this.imageUrl9;
          } else if (this.activeFormList[index].type === 1 && this.CropId === 12) {
            this.imageUrl12 = res.data.data.fileUrl;
            this.activeFormList[12].value = this.imageUrl12;
          } else if (this.activeFormList[index].type === 1 && this.CropId === 15) {
            this.imageUrl15 = res.data.data.fileUrl;
            this.activeFormList[15].value = this.imageUrl15;
          }
        };


      })
  })
  this.dialogFormVisible = false
}

export function bannerState(file, fileList) {
  this.CropId = 1000;
  this.bannerCropState(file, fileList);
}


export function state(file, fileList) {
  this.CropId = 0;
  this.CropState(file, fileList);
}

export function state1(file, fileList) {
  this.CropId = 1;
  this.CropState(file, fileList);
}

export function state2(file, fileList) {
  this.CropId = 2;
  this.CropState(file, fileList);
}

export function state3(file, fileList) {
  this.CropId = 3;
  this.CropState(file, fileList);
}

export function state4(file, fileList) {
  this.CropId = 4;
  this.CropState(file, fileList);
}

export function state5(file, fileList) {
  this.CropId = 5;
  this.CropState(file, fileList);
}

export function state6(file, fileList) {
  this.CropId = 6;
  this.CropState(file, fileList);
}

export function state9(file, fileList) {
  this.CropId = 9;
  this.CropState(file, fileList);
}

export function state12(file, fileList) {
  this.CropId = 12;
  this.CropState(file, fileList);
}

export function state15(file, fileList) {
  this.CropId = 15;
  this.CropState(file, fileList);
}

//多图修改
export function stateImg(file,fileList) {
  this.CropState(file, fileList,this.multipleId);
}
//多图点击
export   function multipleClick(index) {
    console.log(index);
    this.multipleId =index;
}

//多图模式删除图片
export  function   deleteImgFileList(index) {
  console.log(index);
  this.fileList55.splice(index,1);
}



// bannner 修改
export   function stateImgBanner(file,fileList) {
  this.CropId = 1000;
  this.bannerCropState(file, fileList,this.multipleBannerId);
}
//bannenr多图点击
export   function multipleClickBanner(index) {
  console.log(index);
  this.multipleBannerId =index;
}
//banner 多图模式删除图片
export  function   deleteImgFileListBanenr(index) {
  console.log(index);
  this.bannerFileList.splice(index,1);
}




// 将图片转化成base64
export function CropState(file, fileList) {
  console.log(file)

  var img = new Image();
  let _this =this;
  img.src = file.url;
  img.onload = function(){
    _this.imgHeight =img.height+'px';
    _this.example2.maxImgSize =parseInt(img.height) ;
    console.log(_this.example2.maxImgSize)
  };

  if(this.activeFormList[this.CropId].pixel=='0'){
    let isSize6 = file.size / 1024 / 1024 < 0.6;
    if (!isSize6) {
      this.$message({
        message: '上传文件大小不能超过 600kb!',
        type: 'warning'
      });
      return false;
    }
    this.example2.fixed=false;
    this.example2.fixedNumber=[0,0];

  }else {
    this.activeFormList[this.CropId].pixel.split('*', 2)
    this.example2.fixedNumber = [parseInt(this.activeFormList[this.CropId].pixel.split('*', 2)[0]) / 100, parseInt(this.activeFormList[this.CropId].pixel.split('*', 2)[1]) / 100]

  }
  console.log('状态更改时')
  this.example2.img = file.url
  console.log(file)
  this.fileName = file.name;

  this.dialogFormVisible = true;
  setTimeout(() => {

    this.$refs.cropper.refresh();
  }, 110)
}

// 将图片转化成base64
export function bannerCropState(file, fileList) {
  this.example2.fixedNumber = [19.2, 5]
  console.log(this.example2.fixedNumber)
  // 拿到图片本地地址, 进行渲染裁剪, 把上传功能截掉, 然后重新定义一个axios 请求, 发送请求
  console.log('状态更改时')
  this.example2.img = file.url
  console.log(file)
  this.fileName = file.name;

  this.dialogFormVisible = true;
  setTimeout(() => {
    this.$refs.cropper.refresh();
  }, 110)
}


export function uploadSuccessStyle(response, file, fileList) {
  console.log('on-success, 成功触发的')
  console.log(this.GLOBAL)
  console.log(response)
  console.log(file)
  console.log(fileList)
  if (response.code === 1) {
    file.url = response.data.fileUrl;
    this.activeFormList[0].value = fileList.map(obj => {
      return {url: obj.url};
    });
  }
  this.uploadDisabled = false;
  console.log(response)
  // console.log(this.dialogTableVisible, this.visible)
}

//第三步保存头图
export function saveStep3Banner(flag, link) {
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
  if (this.uuid == '0' || this.uuid == '1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  this.step2.basic.map((item, index) => {
    item.active = 1;
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
      this.saveStep2('preview', link);
    }
  });
}

//点击选择样式库
export function selectStyle(item, index, isOne) {
  console.log('点击选择样式库');
  if (isOne == '1') {
    this.isOneImg = true;
  } else {
    this.isOneImg = false;
  }
  // console.log(this.isOneImg)
  this.isEditorTextShow = false;
  // 不需要提示是否覆盖单前的 样式, 所以下面 // 的注释即是提示代码

  console.log(this.isSaveStyle)
  if (this.isSaveStyle) {
    this.$confirm('确定放弃当前编辑内容并覆盖样式?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
        this.isSaveStyle =false;
        this.ClickSelectImg = item.url;
       /* let flag = this.step2.label[this.step2Right.idx].htmlId;
        console.log(this.step2.label[this.step2Right.idx])
         console.log(flag)
        if (flag) {*/

          let uuIds = '';
          if (this.uuid == '0' || this.uuid == '1') { //新增
            uuIds = this.addUuid;
          } else {
            uuIds = this.uuid;
          }
          this.AddSaveEdit =false;
          console.log(this.step2.label[this.step2Right.idx])
          let styleId ='';
          if(("styleId" in this.step2.label[this.step2Right.idx])){
            styleId =this.step2.label[this.step2Right.idx].styleId;
          }else{
            styleId =this.step2.label[this.step2Right.idx].fields[0].styleId;
          }
          let parmas = {
            plannInfoId: uuIds,
            labelId: this.step2.label[this.step2Right.idx].id,
            styleId: styleId
          };
          console.log(parmas)

          this.activeFormList = [];
          this.step3ActiveStyleId = item.id;
          this.initialImg();
          this.getStyleId(item.id);

          this.$api.requestClearStyle(parmas).then(res => {
            delete this.step2.label[this.step2Right.idx].resultList;
            delete this.step2.label[this.step2Right.idx].html;
            delete this.step2.label[this.step2Right.idx].htmlId;
            delete this.step2.label[this.step2Right.idx].styleId;
            this.activeFormList = [];
            this.step3ActiveStyleId = item.id;
            this.initialImg();
            this.getStyleId(item.id);
          });

          // } else {
          this.step3ActiveStyleId = item.id;
          this.initialImg();
          this.getStyleId(item.id);

        /*}*/
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
    //this.step3.status = 1;
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
        if (this.uuid == '0' && this.uuid == '1') { //新增
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
  console.log(res)
  console.log(file)
  console.log(fileList)
}

//before-upload
export function beforeAvatarUpload0(file) {
  console.log(file)
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
  this.fileList55 =[];
}

//第三步保存Label
export function saveStep3Label(flag, link) {


  //this.saveDisabled = true;

  console.log(this.activeFormList);
  console.log(this.cacheActiveFormList)
  console.log(this.AddSaveEdit)
  let fieldList;
  if (this.activeFormList[0].type == 4) {
    fieldList = [];
    let resultList = this.step2.label[this.step2Right.idx].resultList;
    for (let i = 0; this.activeFormList[0].value.length > i; i++) {

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

    if(this.AddSaveEdit){ //新增保存后编辑

      fieldList = this.activeFormList.map((item, idx) => {
        console.log('activeFormList');
        console.log(item)
        return {
          minImage: this.activeFormList[idx].minImage,
          styleFieldId: this.activeFormList[idx].id,
          type: this.activeFormList[idx].type,
          value: this.activeFormList[idx].value,
          id: this.cacheActiveFormList[idx].id
        };
      });
    }else {//新增

      fieldList = this.activeFormList.map((item, idx) => {
        console.log('activeFormList');
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

  }


  let uuIds = '';
  if (this.uuid == '0' || this.uuid == '1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }
  console.log('step2ActiveId:' + this.step2ActiveId);

  this.labelIdSave.push(this.step2ActiveId)

  this.step2.label.map((item, index) => {
    if (item.id == this.step2ActiveId) {
      item['active'] = 1;
    }
  });
  console.log('step2ActiveId')
  console.log(this.step2)
  console.log(this.step2Right)
  let params = {
    labelId: this.step2ActiveId,
    plannInfoId: uuIds,
    styleId: this.step3ActiveStyleId,
    htmlId: this.step2.label[this.step2Right.idx].htmlId
      ? this.step2.label[this.step2Right.idx].htmlId
      : '',
    fieldList
  };

  console.log(params);

  let that = this;
  let hasError = false;

  params.fieldList.forEach(function (item, idx) {
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
      console.log(item.value)
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
    this.cacheActiveFormList = res.resultList;//缓存
    console.log(this.cacheActiveFormList)
    this.AddSaveEdit =true;

    this.isSaveStyle = true;

    if (!flag) {
      that.$message({
        message: '保存成功',
        type: 'success'
      });
    }
    if (flag == 'preview') {
      window.open(
        link+`/api/private/1.0/page/preview/`+uuIds
      );
      return
      //that.saveStep2('preview', link);
    }
  });
}

//取消裁剪
export function handleCloseCropper(){
  console.log('handleCloseCropper');
  console.log(this.bannerFileList);
  console.log(this.copyBannerFileList)
  var  copyBannerFileList =this.bannerFileList;

 // this.bannerFileList  =[];
  this.multipleId ='';
  /*this.bannerFileList =this.copyBannerFileList.map((item,index)=>{
     return {
       url:item.url
     }
  })*/

    this.dialogFormVisible =false;
   // this.bannerFileList  =[];

    console.log(this.CropId)
    if(this.CropId==1){
        this.imageUrl1=='';
    }else if(this.CropId==2){
      this.imageUrl2=='';
    }else if(this.CropId==3){
      this.imageUrl3=='';
    }else if(this.CropId==4){
      this.imageUrl4=='';
    }else if(this.CropId==5){
      this.imageUrl5=='';
    }else if(this.CropId==6){
      this.imageUrl6=='';
    }else if(this.CropId==9){
      this.imageUrl9=='';
    }else if(this.CropId==12){
      this.imageUrl12=='';
    }else if(this.CropId==15){
      this.imageUrl15=='';
    }
  this.example2.fixed=true;
    //this.resetStyle();

}



//单图删除
export  function deleteImg(index) {
  if(index==0){
    this.imageUrl0 = '';
  }else if(index==1){
    this.imageUrl1 = '';
  }else if(index==2){
    this.imageUrl2 = '';
  }else if(index==3){
    this.imageUrl3 = '';
  }else if(index==4){
    this.imageUrl4 = '';
  }else if(index==5){
    this.imageUrl5 = '';
  }else if(index==6){
    this.imageUrl6 = '';
  }else if(index==9){
    this.imageUrl9 = '';
  }else if(index==12){
    this.imageUrl12 = '';
  }else if(index==15){
    this.imageUrl15 = '';
  }
}



//重置样式
export function resetStyle() {
  console.log(this.activeFormList)
  this.imageUrl0 = '';
  this.imageUrl1 = '';
  this.imageUrl2 = '';
  this.imageUrl3 = '';
  this.imageUrl4 = '';
  this.imageUrl5 = '';
  this.imageUrl6 = '';
  this.imageUrl9 = '';
  this.imageUrl12 = '';
  this.imageUrl15 = '';
  for (var i = 0; this.activeFormList.length > i; i++) {
    console.log(this.activeFormList[i])
    this.activeFormList[i].value = '';
  }

  this.$refs.oneImg[0].uploadFiles = []

  // this.activeFormList = []
}

//第三步保存editor
export function saveStep3Editor(flag, link) {
  let uuIds = '';
  if (this.uuid == '0' || this.uuid == '1') { //新增
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
      this.saveStep2('preview', link);
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
        let attr = [];
        this.copyBannerFileList.map((item, index) => {
          attr.push(item);
        })
        console.log(attr);
        this.bannerFileList = attr;
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
  console.log('233232');
  this.isSaveStyle =false;
  this.AddSaveEdit =false;
  if (this.copyActiveFormList !== JSON.stringify(this.activeFormList)) {
    this.$confirm('确定放弃当前的编辑？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {


        this.ClickSelectImg = '';
        this.isEditorTextShow = true;
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
export function saveStep3Plugin(flag, link) {
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
  if (this.uuid == '0' || this.uuid == '1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  console.log(this.step2.plugins)
  this.step2.plugins.map((item, index) => {
    console.log(item)
    item['active'] = 1;
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
      this.saveStep2('preview', link);
    }
  });
}

// 裁剪
export function screenshot(data) {
  this.$refs.cropper.getCropData((data) => {
    // do something
    console.log(data)
    this.dialogFormVisible = false
  })
}
