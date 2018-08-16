import {
  URL_ROOT,
  IMG_UPLOAD
} from '../../common/js/types';
import _ from 'lodash';

export function changeTemplate() {

  //this.$store.commit('Initsteps1', this.$data.steps1);
  this.$confirm(
    '确定使用新模板？ 使用新模板将造成原先的标签模块消失？',
    '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {


      let uuIds = '';
      if (this.uuid == '0' ||  this.uuid=='1') { //新增
        uuIds = this.addUuid;
      } else {
        uuIds = this.uuid;
      }
      if (this.uuid == '0' || this.uuid=='1') { //新增
        if (this.steps1.callTel1 && this.steps1.callTel2) {
          this.steps1.callTel = this.steps1.callTel1 + ',' + this.steps1.callTel2;
        }

        if (this.steps1.projectCode) {
          //            let selectArray = this.projectList.filter((item)=>{
          //              return item.projectName == this.steps1.projectName
          //            })
          //            this.steps1.projectCode = selectArray[0].id
          let projectName = this.projectList.find(
            item => item.id == this.steps1.projectCode
          ).projectName;
          this.steps1.projectName = projectName;
        }


        let deliveryManagements = [];
        if (this.steps1.deliveryManagements.length) {
          console.log(12222)


          if (this.uuid == '0' || this.uuid=='1') { //新增
            console.log('心中')
            deliveryManagements = this.steps1.deliveryManagements
              .filter(item => {
                const o = this.channelList.find(i => i.channelName === item);
                return !!o;
              })
              .map(item => {
                const o = this.channelList.find(i => i.channelName === item);
                return {
                  channelId: o.uuid,
                  channelName: o.channelName,
                  uuid: ''
                };
              });
          } else { //编辑
            this.editorDeliveryManagements.find(res => {
              deliveryManagements.push({
                channelId: res.channelId,
                channelName: res.channelName,
                uuid: res.uuid
              })
            });
            var array1 = this.steps1.deliveryManagements;
            var array2 = this.editorDeliveryManagements
            var result = []; // 获取编辑时的值
            for (var i = 0; i < array1.length; i++) {
              var obj = array1[i];
              var isExist = false;
              for (var j = 0; j < array2.length; j++) {
                var aj = array2[j].channelName;
                if (aj == obj) {
                  isExist = true;
                  break;
                }
              }
              if (!isExist) {
                result.push(obj);
              }
            }
            for (var i = 0; i < this.channelList.length; i++) {
              var obj = this.channelList[i];
              for (var j = 0; j < result.length; j++) {
                var aj = result[j];
                if (aj == obj.channelName) {
                  deliveryManagements.push({
                    channelId: obj.uuid,
                    channelName: obj.channelName,
                    uuid: ''
                  })
                }
              }
            }

          }
          console.log(deliveryManagements)
        }

        this.step1Warining = true;

        const v = _.cloneDeep(this.steps1);

        delete v.callTel1;
        delete v.callTel2;
        let valArray = Object.values(v).slice(0, 4);

        if (valArray.includes('')) {
          return;
        } else {
          if (JSON.stringify(this.step1SaveObject) == JSON.stringify(this.steps1)) {
            //表单无变化则直接跳到第二步
            if (!flag) {
              //按钮不是保存
              this.settingStepsActive = 1;
              this.saveStep2(1);
              this.step1Show = false;
              this.step2Show = true;
            }
            return;
          }
          console.log(90988);
          console.log(this.uuid)


          const p = _.cloneDeep(this.steps1);
          delete p.callTel1;
          delete p.callTel2;

          if (this.stepsSave) { //已经新增过
            this.step1Save = true;
            this.$store.getters.getLandingPageId = res.data.uuid;
          } else {
            this.$api.saveBaseSetting({
              ...p,
              deliveryManagements
            }).then(res => {
              //vuex中存入当前落地页pageId
              //this.steps1.uuid = this.$store.getters.getLandingPageId;
              console.log(res)
              this.addUuid = res.uuid;
              this.steps1.uuid =res.uuid;

              this.$router.push({
                path: '/SelectLandingPageTemplate/' + this.addUuid
              });

            })
              .catch(err => {
              });
          }

        }
      } else {
        console.log('opppp')
        this.$router.push({
          path: '/SelectLandingPageTemplate/' + uuIds
        });

      }


    })
    .catch(() => {
    });
}

//预览
export function previewLandingPage(link) {
  console.log(this.steps1.uuid)


  if (this.uuid == '0' ||  this.uuid=='1') { //新增
    //uuIds=this.addUuid;
    this.$message.error('未编辑落地页内容，进入下一步编辑保存后预览!');
    return
  }

  if (this.steps1.uuid) {
    window.open(link+`/api/private/1.0/page/preview/${this.steps1.uuid}`);
  }
}

export function cancelEdit() {
  this.$confirm('确定放弃当前落地页的编辑？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      this.$router.push({
        path: '/LandingPageSetting'
      });
    })
    .catch(() => {
    });
}

export function headIng() {
  this.bannerFileList = [];
  this.$refs.upload.$children[1].$el.style.display = 'block';
}

export function ccc() {
  this.pluginForm = JSON.parse(this.resetPluginForm);
}

export function b() {
}

export function unique(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) == -1) {
      result.push(arr[i])
    }
  }
  console.log(result);
  return result;
}

//获取模板标签/插件
export function getLabel(templateId) {
  this.uuid = this.$route.params.uuid;
  // this.steps1.uuid =this.uuid;
  console.log(this.uuid)
  if (this.uuid != '0' && this.uuid != '1') {
    console.log(122)
    const landingPageId = this.uuid;
    this.$api.requestEditorMessage(landingPageId).then(res => {
      //step1
      console.log('66666666666666');
      console.log(res.deliveryManagements)
      this.steps1.pageName = res.pageName;
      this.steps1.orgName = res.orgName;

      this.steps1.projectName = res.projectName;
      this.steps1.projectCode = res.projectCode;
      this.steps1.archiveId = res.archiveId;
      this.steps1.label = res.label;
      this.copyDeliveryManagements = [];
      this.steps1.deliveryManagements = res.deliveryManagements.map(
        item =>
          item.channelName
      );
      this.editorDeliveryManagements = res.deliveryManagements;


      this.steps1.deliveryManagements = this.unique(this.steps1.deliveryManagements);
      console.log(this.steps1.deliveryManagements);

      //请求落地页项目下拉菜单
      this.getProjectList();

      this.copyDeliveryManagements = this.steps1.deliveryManagements;
      this.steps1.template = res.template;
      this.steps1.callTel1 = res.callTel.split(',')[0];
      this.steps1.callTel2 = res.callTel.split(',')[1];
      //step2banner
      this.step2.basic[0].resultList = res.pics;

      this.picsLenght=res.pics

      console.log('step2banner');
      console.log(this.step2.basic[0].resultList);



      console.log(res.label)

      let arr = _.map(this.step2.basic[0].resultList, obj => {
        if (obj.value) {
          return {
            url: obj.value
          };
        } else {
          return {
            url: ''
          };
        }
      });
      this.bannerFileList = arr.filter((obj, idx) => {
        return obj.url !== '';
      });
      this.copyBannerFileList = Array.from(this.bannerFileList);


      //step2label
      this.step2.label = _.map(res.labels, (obj, index) => {
        console.log(obj)
        if( obj.navVisibility!=''){
          this.navVisibility= obj.navVisibility;
        }else{
          this.navVisibility =1
        }

        if (obj.fields) {
          delete obj.html;
          obj.resultList = obj.fields;
          obj.saveId = obj.id;
          obj.id = obj.labelId;
        } else {
          obj.saveId = obj.id;
          obj.id = obj.labelId;
        }
        return obj;
      });

      let plugin = res.plugins[0];
      this.step1Plugins =res.plugins[0]

      this.$api
        .requestLabelList(templateId)
        .then(res => {
          this.step2DialogLabel = Object.assign({}, res.label);
          for (let [key, value] of Object.entries(this.step2DialogLabel)) {
            for (let i = 0; i < this.step2.label.length; i++) {
              if (value.url == this.step2.label[i].url) {
                this.step2DialogLabel[key] = this.step2.label[i];
              }
            }
          }
          this.step2.plugins = res.plugins;
          this.step2.plugins[0].resultList = plugin.fields || [];
          this.step2.plugins[0].id = plugin.labelId;
          this.step2.plugins[0].saveId = plugin.id;
          this.step2.plugins[0].htmlId = plugin.htmlId;

          this.copystep2 = JSON.stringify(this.saveStep2);
        })
        .catch(err => {
        })
        .then(() => {
          if (!this.step2.plugins[0].resultList) {
            return;
          }
          if (!this.step2.plugins[0].resultList.length) {
            return;
          }
          let list = _.map(
            this.step2.plugins[0].resultList[10].value.split(','),
            item => {
              return {
                value: item
              };
            }
          );
          let str = this.step2.plugins[0].resultList[2].value;
          let value = str.includes('转') ? '' : str;
          let value1 = str.includes('转') ? str.split('转')[0] : '';
          let value2 = str.includes('转') ? str.split('转')[1] : '';
          this.pluginForm[0].value = this.step2.plugins[0].resultList[0].value;
          this.pluginForm[1].value = this.step2.plugins[0].resultList[1].value;
          this.pluginForm[2].value = value;
          this.pluginForm[2].value1 = value1;
          this.pluginForm[2].value2 = value2;
          this.pluginForm[3].value = this.step2.plugins[0].resultList[3].value;
          this.pluginForm[4].value = this.step2.plugins[0].resultList[4].value;
          this.pluginForm[5].value = this.step2.plugins[0].resultList[5].value;
          this.pluginForm[6].value = this.step2.plugins[0].resultList[6].value;
          this.pluginForm[7].value = this.step2.plugins[0].resultList[7].value.split(
            ','
          );
          this.pluginForm[8].value = this.step2.plugins[0].resultList[8].value;
          this.pluginForm[9].value = this.step2.plugins[0].resultList[9].value;
          this.pluginForm[10] = list;
          this.copyPluginForm = JSON.stringify(this.pluginForm);
        });
    });
  } else {
    this.$api
      .requestLabelList(templateId)
      .then(res => {
        this.step2.label = res.label;
        this.step2DialogLabel = Object.assign({}, res.label);
        this.step2.plugins = res.plugins;
      })
      .catch(err => {
      });
  }
}

//请求落地页机构下拉菜单
export function getOrgList() {
  this.$api
    .requestOrgList('')
    .then(res => {
      console.log('机构')
      console.log(res)
      this.orgNameList = res;
    })
    .catch(err => {
    });
}


//请求落地页项目下拉菜单
export function getProjectList(res) {
  let orgId = '';
  for (var i = 0; this.orgNameList.length > i; i++) {
    if (this.orgNameList[i].orgName == this.steps1.orgName) {
      orgId += this.orgNameList[i].orgId;
    }
  }
  this.$api
    .requestProjectList({
      orgId: orgId
    })
    .then(res => {
      console.log(res);

      if (this.uuid == '0' || this.uuid=='1') { //新增
        this.steps1.projectCode = ''
      }

      this.projectList = res;
    })
    .catch(err => {
    });
}

//默认填写400电话
export function projectPhone(value) {
  console.log(400)
  console.log(value)
  let phoneData = []
  for (let i = 0; this.projectList.length > i; i++) {
    if (this.projectList[i].id == value) {
      phoneData = this.projectList[i];
    }
  }
  console.log(phoneData)
  if(typeof phoneData.projectPagePhone=='undefined'){
    this.steps1.callTel1 = ''
    this.steps1.callTel2 = ''
  }else{
    var result = phoneData.projectPagePhone.split(",");
    for (var i = 0; i < result.length; i++) {
      this.steps1.callTel1 = result[0].slice(3);
      this.steps1.callTel2 = result[1];
    }
  }

  //this.callTelDisabled =true;


}

//请求落地页项目下拉菜单
export function getChannelList() {
  return this.$api
    .requestChannelList('')
    .then(res => {
      this.channelList = res;
    })
    .catch(err => {
    });
}

//请求落地页项目下拉菜单
export function getArchiveList(projectId) {
  return this.$api
    .requestArchiveList(projectId)
    .then(res => {
      this.archiveList = res;
    })
    .catch(err => {
    });
}

//请求样式库列表
export function getStyleList() {
  this.$api
    .requestStyleList('')
    .then(res => {
      this.styleList = res;
    })
    .catch(err => {
    });
}

//按钮功能
export function nextStep() {
  console.log('909090909')
  console.log(this.step1Save);

  if(this.steps1.callTel1=='' || this.steps1.callTel2==''){
      this.step1Warining =true;
      return
  }


  if (this.step1Save) {
    this.settingStepsActive = 1;
    this.saveStep2(1);
    this.step1Show = false;
    this.step2Show = true;
  } else {
    let isNext = 1;

    if (this.uuid == '0' || this.uuid=='1') { //新增
      isNext = 1;
    } else {
      isNext = 0;
    }


    this.saveStep1('确定保存当前修改内容并进入下一步？', false, isNext); //1为下一步
  }
  this.step1Save = false;
}

export function lastStep() {
  this.settingStepsActive = 0;
  this.step1Show = true;
  this.step2Show = false;
  this.$router.push('/MessageSetting/' + this.addUuid + '/' + this.steps1.template);
}

export function saveStep1(message, flag, next) {
  this.uuid = this.$route.params.uuid;//  为0 新增

  let uuIds = '';
  if (this.uuid == '0' || this.uuid=='1') { //新增
    uuIds = this.addUuid;
  } else {
    uuIds = this.uuid;
  }

  if (this.steps1.callTel1 && this.steps1.callTel2) {
    this.steps1.callTel = this.steps1.callTel1 + ',' + this.steps1.callTel2;
  }

  if (this.steps1.projectCode) {
    //            let selectArray = this.projectList.filter((item)=>{
    //              return item.projectName == this.steps1.projectName
    //            })
    //            this.steps1.projectCode = selectArray[0].id
    let projectName = this.projectList.find(
      item => item.id == this.steps1.projectCode
    ).projectName;
    this.steps1.projectName = projectName;
  }


  let deliveryManagements = [];
  if (this.steps1.deliveryManagements.length) {
    console.log(12222)

    console.log(this.uuid)

    if (this.uuid == '0' || this.uuid=='1') { //新增
      deliveryManagements = this.steps1.deliveryManagements
        .filter(item => {
          const o = this.channelList.find(i => i.channelName === item);
          return !!o;
        }).map(item => {
          const o = this.channelList.find(i => i.channelName === item);
          return {
            channelId: o.uuid,
            channelName: o.channelName,
            uuid: ''
          };
        });
    } else { //编辑
      console.log(this.uuid)
      this.editorDeliveryManagements.find(res => {
        deliveryManagements.push({
          channelId: res.channelId,
          channelName: res.channelName,
          uuid:  res.uuid
        })
      });
      var array1 = this.steps1.deliveryManagements;
      var array2 = this.editorDeliveryManagements
      var result = []; // 获取编辑时的值
      for (var i = 0; i < array1.length; i++) {
        var obj = array1[i];
        var isExist = false;
        for (var j = 0; j < array2.length; j++) {
          var aj = array2[j].channelName;
          if (aj == obj) {
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          result.push(obj);
        }
      }
      for (var i = 0; i < this.channelList.length; i++) {
        var obj = this.channelList[i];
        for (var j = 0; j < result.length; j++) {
          var aj = result[j];
          if (aj == obj.channelName) {
            console.log('obj9999999999999999999999999');
            console.log(obj)

            deliveryManagements.push({
              channelId: obj.uuid,
              channelName: obj.channelName,
              uuid: ''
            })
          }
        }
      }

    }
    console.log(deliveryManagements)
  }

  // return;

  console.log(this.steps1)
  this.step1Warining = true;

  const v = _.cloneDeep(this.steps1);

  delete v.callTel1;
  delete v.callTel2;
  let valArray = Object.values(v).slice(0, 4);

  if (valArray.includes('')) {
    return;
  } else {
    if (JSON.stringify(this.step1SaveObject) == JSON.stringify(this.steps1)) {
      //表单无变化则直接跳到第二步
      if (!flag) {
        //按钮不是保存
        this.settingStepsActive = 1;
        this.saveStep2(1);
        this.step1Show = false;
        this.step2Show = true;
      }
      return;
    }
    console.log(90988);

    console.log(this.uuid)
    if (this.uuid == '0' || this.uuid=='1') { //新增
      if (next == 1) { //下一步
        const p = _.cloneDeep(this.steps1);
        delete p.callTel1;
        delete p.callTel2;

        if (this.stepsSave) { //已经新增过
          this.step1Save = true;
          this.$store.getters.getLandingPageId = res.data.uuid;
        } else {
          this.$api.saveBaseSetting({
            ...p,
            deliveryManagements
          }).then(res => {
            //vuex中存入当前落地页pageId
            //this.steps1.uuid = this.$store.getters.getLandingPageId;
            console.log(res)
            this.addUuid = res.uuid;
            this.steps1.uuid =res.uuid;
            if (flag == true) {
              //按钮是保存
              this.$message({
                message: '保存成功，请在列表中查看',
                type: 'success'
              });
              this.stepsSave = true;

              this.step1Save = true;


              this.$store.getters.getLandingPageId = res.data.uuid;
              console.log(this.$store.getters.getLandingPageId)
            } else {
              this.settingStepsActive = 1;
              this.saveStep2(1);
              this.step1Show = false;
              this.step2Show = true;
            }
            this.step1SaveObject = Object.assign({}, this.steps1);
          })
            .catch(err => {
            });
        }

        return
      }

      this.$alert(message, '提示信息', {
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          console.log('this.add');
          console.log(this.steps1)
          if (action == 'confirm') {
            const p = _.cloneDeep(this.steps1);

            delete p.callTel1;
            delete p.callTel2;
            console.log(p)

            console.log(deliveryManagements);
            console.log(this.stepsSave);
            if (this.stepsSave) { //已经新增过
              p.uuid=this.addUuid;
              this.step1Save = true;
             // this.$store.getters.getLandingPageId = this.addUuid;
            } else {
              console.log(p)
              this.$api.saveBaseSetting({
                ...p,
                deliveryManagements
              }).then(res => {
                //vuex中存入当前落地页pageId
                //this.steps1.uuid = this.$store.getters.getLandingPageId;
                console.log(res)
                this.addUuid = res.uuid;
                this.steps1.uuid =res.uuid;

                console.log(res.deliveryManagements)
                for(let  i=0; res.deliveryManagements.length>i;i++){
                  console.log(res.deliveryManagements[i].channelName)
                  this.copyDeliveryManagements.push(res.deliveryManagements[i].channelName);
                }
                console.log(  this.copyDeliveryManagements);
                this.editorDeliveryManagements = res.deliveryManagements;


                if (flag == true) {
                  //按钮是保存
                  this.$message({
                    message: '保存成功，请在列表中查看',
                    type: 'success'
                  });
                  this.stepsSave = true;

                  this.step1Save = true;

                  this.$router.push('/MessageSetting/'+ res.uuid+'/'+this.$route.params.templateId)
                  this.$store.getters.getLandingPageId = res.data.uuid;
                  console.log(this.$store.getters.getLandingPageId)
                } else {
                  this.settingStepsActive = 1;
                  this.saveStep2(1);
                  this.step1Show = false;
                  this.step2Show = true;
                }
                this.step1SaveObject = Object.assign({}, this.steps1);

              })
                .catch(err => {
                });
            }


          }
        }
      });
    } else {
      this.steps1.uuid =this.uuid
      if (next == 0) { //编辑下一步
        this.$alert(message, '提示信息', {
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            console.log('this.add')
            if (action == 'confirm') {
              const p = _.cloneDeep(this.steps1);
              delete p.callTel1;
              delete p.callTel2;
              console.log(p)


              console.log(deliveryManagements);
              if (this.stepsSave) { //已经新增过
                this.step1Save = true;
                this.$store.getters.getLandingPageId = res.data.uuid;
              } else {
                this.$api.saveBaseSetting({
                  ...p,
                  deliveryManagements
                }).then(res => {
                  //vuex中存入当前落地页pageId
                  //this.steps1.uuid = this.$store.getters.getLandingPageId;
                  console.log(res)
                  this.addUuid = res.uuid;
                  if (flag == true) {
                    //按钮是保存
                    this.$message({
                      message: '保存成功，请在列表中查看',
                      type: 'success'
                    });
                    this.stepsSave = true;

                    this.step1Save = true;


                    this.$store.getters.getLandingPageId = res.data.uuid;
                    console.log(this.$store.getters.getLandingPageId)
                  } else {
                    this.settingStepsActive = 1;

                    this.saveStep2(1);
                    this.step1Show = false;
                    this.step2Show = true;
                  }
                  this.step1SaveObject = Object.assign({}, this.steps1);
                })
                  .catch(err => {
                  });
              }


            }
          }
        });
        return
      }


      const p = _.cloneDeep(this.steps1);
      delete p.callTel1;
      delete p.callTel2;

      console.log(deliveryManagements);

      this.$api.saveBaseSetting({
        ...p,
        deliveryManagements
      }).then(res => {
        //vuex中存入当前落地页pageId
        //this.steps1.uuid = this.$store.getters.getLandingPageId;
        this.addUuid = res.uuid;
        this.steps1.uuid ==res.uuid;
        console.log(res.deliveryManagements)
        for(let  i=0; res.deliveryManagements.length>i;i++){
            console.log(res.deliveryManagements[i].channelName)
          this.copyDeliveryManagements.push(res.deliveryManagements[i].channelName);
        }
        console.log(  this.copyDeliveryManagements);
        this.editorDeliveryManagements = res.deliveryManagements;

        // this.copyDeliveryManagements =res.deliveryManagements;
        if (flag == true) {
          //按钮是保存
          this.$message({
            message: '保存成功，请在列表中查看',
            type: 'success'
          });

          this.$store.getters.getLandingPageId = res.data.uuid;
          console.log(this.$store.getters.getLandingPageId)
        } else {
          this.settingStepsActive = 1;
          this.saveStep2(1);
          this.step1Show = false;
          this.step2Show = true;
        }
        this.step1SaveObject = Object.assign({}, this.steps1);
      })
        .catch(err => {
        });

    }


  }
}
