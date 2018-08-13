<template>
  <main class="deploy">
    <section class="title">项目配置
      <div class="rightB">
        <el-button plain
          size="medium"
          @click="$router.go(-1)">返 回</el-button>
        <el-button type="primary"
          size="medium"
          @click="submitDeploy">保 存</el-button>
      </div>
    </section>

    <section class="deployMain">
      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="75px"
        class="demo-ruleForm">

        <el-form-item label="项目名称"
          prop="project_name">
          <el-input v-model="ruleForm.project_name"
            size="small"
            :disabled="true"></el-input>
          <i class="asterisk"></i>

        </el-form-item>

        <el-form-item label="外显号码"
          prop="project_id"
          class="subsidiary">
          <el-select v-model="ruleForm.show_number"
            placeholder="请选择外显号码"
            size="small">
            <el-option v-for="(item,i) in showNumber"
              :key="i"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <i class="asterisk"></i>
          <!-- <div class="el-form-item__error" >
             请选择外显号码
           </div>-->
        </el-form-item>

        <el-form-item label="坐席资源"
          prop="seat_resource">
          <div class="el-input el-input--small">
            <input type="text"
              autocomplete="off"
              v-model="seat_resource"
              class="el-input__inner">
          </div>

          <i class="asterisk"></i>
        </el-form-item>

        <el-form-item label="移动终端"
          prop="title">
          <div class="change"
            style="font-size: 12px">
            <div class="conter">
              <template>
                <el-checkbox :indeterminate="isIndeterminate"
                  @change="mobileTerminal"
                  v-model="mobile_terminal">话机
                </el-checkbox>
                <el-form-item label="被叫号码"
                  prop="title">
                  <el-input v-model="ruleForm.tel_called_number"
                    size="small"></el-input>
                  <i class="asterisk"></i>
                  <el-button type="text"
                    size="small"
                    @click="deleteMobile">删除</el-button>
                  <el-button type="text"
                    size="small"
                    @click="addMobile">添加</el-button>
                </el-form-item>
                <el-checkbox :indeterminate="isIndeterminate"
                  :disabled="true">app</el-checkbox>
                <el-form-item label="被叫号码"
                  prop="title"
                  class="called">
                  <el-input v-model="ruleForm.title"
                    size="small"
                    :disabled="true"></el-input>
                  <i class="asterisk"></i>
                  <el-button type="text"
                    size="small">删除</el-button>
                  <el-button type="text"
                    size="small">添加</el-button>
                </el-form-item>
              </template>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </section>

    <el-dialog title="被叫号码获取"
      :visible.sync="dialogVisible"
      width="33%"
      class="dialogMessage">
      <main class="MessageBox">
        <div class="conten">
          <el-input placeholder="请搜索号码"
            size="small"
            v-model="serachT"
            @change="querySearchAsync"
            class="input-with-select"></el-input>
          <el-button size="small"
            class="serachButton">查询</el-button>
          <div class="change">

            <el-checkbox :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedCities"
              @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in ListTelNumber"
                :label="city"
                :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

      </main>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false"
          size="small">返 回</el-button>
        <el-button type="primary"
          @click="dialogVisible = false"
          size="small">确 定</el-button>
      </span>
    </el-dialog>
  </main>
</template>

<script>
export default {
  data() {
    return {
      project_id: this.$route.params.id,
      projectDetail: [], //详情
      showNumber: [], //外显号码
      ListTelNumber: [],
      dialogVisible: false,
      serachT: '', //搜索

      cities: ['上海', '北京', '广州', '深圳'],
      checkedCities: [],
      mobile_terminal: false,
      ruleForm: {
        project_id: this.$route.params.id,
        project_name: '',
        show_number: '',
        seat_resource: '',
        mobile_terminal: '',
        tel_called_number: ''
      },
      seat_resource: '',
      rules: {},
      checkAll: false,
      isIndeterminate: false
    };
  },
  created() {
    this.getProjectDetail();
    this.getShowNumberList();
  },
  methods: {
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      /*var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());*/
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? this.ListTelNumber : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.ListTelNumber.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ListTelNumber.length;
    },
    mobileTerminal() {
      //是否选择话机
      console.log(this.mobile_terminal);
      if (this.mobile_terminal) {
        this.ruleForm.mobile_terminal = '话机';
      } else {
        this.ruleForm.mobile_terminal = '';
      }
    },
    submitDeploy() {
      //保存
      let _this = this;
      this.$request
        .post('api/private/project/config/save', this.ruleeForm)
        .then(res => {
          this.$message({
            message: '操作成功！',
            type: 'success',
            onClose: function() {
              _this.$router.push('/Project');
            }
          });
        });
    },
    handleClose(done) {
      //  done();
    },
    deleteMobile() {
      //删除话机
    },
    addMobile() {
      //添加话机
      this.dialogVisible = true;
      this.getListTelNumber();
    },
    getListTelNumber() {
      //被叫号码
      this.$request
        .get('api/private/project/listTelNumber', {
          project_id: this.project_id
        })
        .then(res => {
          this.ListTelNumber = res;
        });
    },
    getShowNumberList() {
      this.$request
        .get('api/private/showNumber/list', {
          //获取区域
        })
        .then(res => {
          this.showNumber = res;
        });
    },
    getProjectDetail() {
      //项目配置-编辑
      this.$request
        .get('api/private/project/config/detail', {
          project_id: this.project_id
        })
        .then(res => {
          this.projectDetail = res;
          this.ruleForm.project_name = res.project_name;
          this.ruleForm.mobile_terminal = res.mobile_terminal;
          this.ruleForm.show_number = res.show_number;
          this.ruleForm.seat_resource = res.seat_resource;
          this.seat_resource = res.seat_resource.toString();

          if (res.mobile_terminal == '话机') {
            this.mobile_terminal = true;
          } else {
            this.mobile_terminal = false;
          }
        });
    }
  },
  watch: {
    seat_resource(val) {
      this.seat_resource = val.replace(/[^0-9]/g, '');
      this.ruleForm.seat_resource = this.seat_resource;
    }
  }
};
</script>

<style type="text/scss" lang="scss">
.deploy {
  width: 1380px;
  margin: 0px auto;
  .dialogMessage {
    .el-dialog__header {
      border-bottom: 1px solid #f2f4f8;
      .el-dialog__header {
        color: rgba(0, 0, 1, 1);
        line-height: 36px;
        font-size: 14px;
      }
    }
    .el-input {
      width: 324px;
    }
    .serachButton {
      width: 90px;
      float: right;
      color: #1a173b;
    }
    .change {
      height: 194px;
      border: 1px solid #dce0e6;
      border-radius: 3px;
      overflow: auto;
      margin-top: 12px;
      padding-top: 12px;
      .el-checkbox {
        display: block;
        padding-left: 10px;
        line-height: 35px;
        .el-checkbox__label {
          font-size: 12px;
        }
      }
      .el-checkbox + .el-checkbox {
        margin-left: 0px;
      }
    }
    .dialog-footer {
      .el-button {
        width: 90px;
      }
      .el-button--primary {
        background: rgba(0, 119, 255, 1);
      }
    }
  }
  .MessageBox {
    margin: 0 auto;
    .conten {
      background: rgba(255, 255, 255, 1);
      .el-form {
        margin-top: 18px;
        margin-left: 26px;
        input::-webkit-input-placeholder {
          /*WebKit browsers*/
          color: #dce0e6;
          font-size: 12px;
        }
      }
    }
  }

  .title {
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid #f2f4f8;
    .rightB {
      float: right;
      margin-right: 32px;

      .el-button--default {
        color: rgba(0, 119, 255, 1);
        border-color: rgba(0, 119, 255, 1);
      }
      .el-button--primary {
        background: rgba(0, 119, 255, 1);
      }
      button {
        width: 100px;
        font-size: 12px;
      }
    }
  }

  .deployMain {
    margin-top: 20px;
    font-size: 12px;
    .el-form-item__error {
      margin-top: 5px;
      position: relative;
      line-height: 32px;
      background: #ff3366 url('../assets/images/icon1.png') no-repeat 12px
        center;
      float: left;
      color: #fff;
      padding: 0 16px 0 34px;
      border-radius: 3px;
    }
    .el-form-item__error:before {
      content: '';
      position: absolute;
      left: -7px;
      top: 13px;
      border-right: 7px solid #ff3366;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }

    .demo-ruleForm {
      input::-webkit-input-placeholder {
        /*WebKit browsers*/
        font-size: 12px;
        color: #dce0e6;
      }
    }
    .asterisk {
      float: left;
      padding-left: 10px;
      padding-top: 3px;
    }
    .asterisk:before {
      content: '*';
      color: #f56c6c;
      margin-right: 10px;
    }
    .el-form-item__label {
      text-align: left;
      line-height: 32px;
      padding-top: 4px;
      font-size: 12px;
      color: #8a96a0;
      text-align: right;
    }
    .el-form-item__label:before {
      display: none;
    }
    .el-form-item {
      margin-bottom: 12px;

      .el-icon-arrow-up:before {
        display: none;
      }
      .el-icon-arrow-up {
        background: url('../assets/images/dropDown2.png') center center
          no-repeat;
        transform: rotateZ(0deg);
      }
      .is-reverse {
        transform: rotateZ(180deg);
      }
    }
    .change {
      width: 500px;
      height: 319px;
      border: 1px solid #dce0e6;
      border-radius: 3px;
      .conter {
        width: 88%;
        margin: 0 auto;
        padding-top: 30px;
        .called {
          span,
          label {
            color: #c0c4cc;
          }
        }
      }
      .el-form-item__label {
        margin-left: 40px;
      }
      .el-button {
        padding: 0 10px;
      }
      .el-input--small {
        width: 180px;
      }
    }

    //改寫ui
    .el-form-item__content pxel-date-editor input {
      width: 120px;
    }
    .el-textarea {
      width: 380px;
    }
    .el-range-separator {
      width: 10%;
    }
    .el-date-editor {
      float: left;
      width: 320px;
    }
    .el-select {
      float: left;
      width: 320px;
    }
    .el-input {
      width: 320px;
      float: left;
    }
  }
}
</style>
