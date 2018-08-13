<template>
  <main class="editor">
    <section class="title">编辑
      <div class="rightB">
        <el-button plain
          size="medium"
          @click="$router.go(-1)">返 回</el-button>
        <el-button type="primary"
          size="medium"
          @click="submit">保存</el-button>
      </div>
    </section>

    <section class="editorMain">
      <h2>基本信息</h2>
      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">

        <el-form-item label="项目名称"
          prop="project_name">
          <el-input v-model="ruleForm.project_name"
            size="small"
            :disabled="true"></el-input>
          <i class="asterisk"></i>
        </el-form-item>

        <el-form-item label="所属机构"
          prop="title">
          <el-input v-model="ruleForm.org_name"
            size="small"
            :disabled="true"></el-input>
          <i class="asterisk"></i>
        </el-form-item>

        <el-form-item label="项目类型"
          prop="project_id"
          class="subsidiary">
          <el-select v-model="ruleForm.project_type"
            placeholder="请选择"
            size="small">
            <el-option v-for="item in project_type"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目区域"
          class="area">
          <el-select v-model="ruleForm.province_code"
            @change="changeProvince"
            placeholder="请选择"
            size="small">
            <el-option v-for="(item,i) in provinceList"
              :key="i"
              :label="item.province_name"
              :value="item.province_code">
            </el-option>
          </el-select>

          <el-select v-model="ruleForm.city_code"
            @change="changeCity"
            placeholder="请选择"
            size="small">
            <el-option v-for="(item,i) in cityList"
              :key="i"
              :label="item.city_name"
              :value="item.city_code">
            </el-option>
          </el-select>

          <el-select v-model="ruleForm.area_code"
            placeholder="请选择"
            size="small">

            <el-option v-for="(item,i) in areaList"
              :key="i"
              :label="item.area_name"
              :value="item.area_code">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="项目平均单价"
          prop="title">
          <div class="el-input el-input--small">
            <input type="text"
              autocomplete="off"
              placeholder=""
              v-model="avg_unit_price"
              class="el-input__inner">
          </div>

          <span>元/每平方</span>
        </el-form-item>

        <h2>需求信息</h2>

        <el-form-item label="期望获客范围"
          prop="title">
          <el-input v-model="ruleForm.expect_region"
            size="small"
            placeholder="期望获客位置范围，例如广东省"></el-input>
        </el-form-item>

        <el-form-item label="期望获客数量"
          prop="title">
          <div class="el-input el-input--small">
            <input type="text"
              autocomplete="off"
              placeholder=""
              v-model="expect_quantity"
              class="el-input__inner">
          </div>
          <span>个</span>
        </el-form-item>

        <el-form-item label="所需坐席个数"
          prop="title">
          <div class="el-input el-input--small">
            <input type="text"
              autocomplete="off"
              placeholder=""
              v-model="seat_quantity"
              class="el-input__inner">
          </div>
        </el-form-item>

        <el-form-item label="提数周期"
          prop="title">
          <el-input v-model="ruleForm.cycle_time"
            size="small"
            placeholder="提数频率，例如每周一次"></el-input>
        </el-form-item>

        <el-form-item label="备注"
          prop="desctription">
          <el-input type="textarea"
            :rows="6"
            v-model="ruleForm.remark"
            size="small"
            maxlength="500"
            onchange="this.value=this.value.substring(0, 500)"
            onkeydown="this.value=this.value.substring(0, 500)"
            onkeyup="this.value=this.value.substring(0, 500)"></el-input>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      project_id: this.$route.params.id, //项目id
      ProjectDetail: [], //项目详情
      provinceList: [], //省
      cityList: [], //城市
      areaList: [], //区域
      avg_unit_price: '',
      expect_quantity: '',
      seat_quantity: '',
      project_type: [
        {
          label: '住宅'
        },
        {
          label: '公寓'
        },
        {
          label: '商铺'
        },
        {
          label: '写字楼'
        },
        {
          label: '车位'
        },
        {
          label: '其他'
        }
      ],
      ruleForm: {
        project_id: this.$route.params.id,
        org_name: '',
        project_type: '',
        province_code: '',
        city_code: '',
        area_code: '',
        avg_unit_price: '',
        expect_region: '',
        expect_quantity: '',
        seat_quantity: '',
        cycle_time: '',
        remark: ''
      },
      rules: {
        project_name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.getProjectDetail();
    this.getProvinceList();

    /* this.$message({
        message: '操作成功！',
        type: 'success',
        duration:0
      });*/
  },
  methods: {
    submit() {
      let _this = this;
      this.$request
        .post('api/private/project/save', this.ruleForm)
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
    getProjectDetail() {
      //获取编辑项目信息
      this.$request
        .post('api/private/project/detail', {
          //项目详情
          project_id: this.$route.params.id
        })
        .then(res => {
          this.getCityList(res.province_code);
          this.getAreaList(res.city_code);

          this.ruleForm.project_name = res.project_name;
          this.ruleForm.org_name = res.org_name;
          this.ruleForm.project_type = res.project_type;
          this.ruleForm.province_code = res.province_code;
          this.ruleForm.city_code = res.city_code;
          this.ruleForm.area_code = res.area_code;
          this.ruleForm.avg_unit_price = res.avg_unit_price;
          this.ruleForm.expect_region = res.expect_region;
          this.ruleForm.expect_quantity = res.expect_quantity;
          this.ruleForm.seat_quantity = res.seat_quantity;
          this.ruleForm.remark = res.remark;
          this.ruleForm.cycle_time = res.cycle_time;

          this.seat_quantity = res.seat_quantity.toString();
          this.expect_quantity = res.expect_quantity.toString();
          this.avg_unit_price = res.avg_unit_price;
        });
    },
    getProvinceList() {
      this.$request
        .get('api/public/province/list', {
          //获取省
        })
        .then(res => {
          this.provinceList = res;
        });
    },
    changeProvince() {
      //选择省
      console.log(this.ruleForm.province_code);
      this.getCityList(this.ruleForm.province_code);
    },
    getCityList(code) {
      console.log(code);
      this.$request
        .get('api/public/city/list', {
          //获取城市
          province_code: code
        })
        .then(res => {
          this.cityList = res;
        });
    },
    changeCity() {
      //选择城市
      this.getAreaList(this.ruleForm.city_code);
    },
    getAreaList(code) {
      //获取区域
      this.$request
        .get('api/public/area/list', {
          //获取区域
          city_code: code
        })
        .then(res => {
          this.areaList = res;
        });
    }
  },
  watch: {
    avg_unit_price(val) {
      console.log(val);
      this.avg_unit_price = val.replace(/[^0-9]/g, '');
      this.ruleForm.avg_unit_price = this.avg_unit_price;
    },
    expect_quantity(val) {
      console.log(val);
      this.expect_quantity = val.replace(/[^0-9]/g, '');
      this.ruleForm.expect_quantity = this.expect_quantity;
    },
    seat_quantity(val) {
      console.log(val);
      this.seat_quantity = val.replace(/[^0-9]/g, '');
      this.ruleForm.seat_quantity = this.seat_quantity;
    }
  }
};
</script>

<style type="text/scss" lang="scss">
.editor {
  width: 1380px;
  margin: 0px auto;
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    color: rgba(26, 23, 59, 1);
    border-bottom: 1px solid #f2f4f8;
    .rightB {
      float: right;
      button {
        width: 100px;
        height: 32px;
        font-size: 12px;
      }
      .el-button--default {
        color: rgba(0, 119, 255, 1);
        border-color: rgba(0, 119, 255, 1);
      }
      .el-button--primary {
        background: rgba(0, 119, 255, 1);
      }
    }
  }
  .editorMain {
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
    .demo-ruleForm {
      input::-webkit-input-placeholder {
        /*WebKit browsers*/
        color: rgba(138, 150, 160, 1);
        font-size: 12px;
      }
    }
    h2 {
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #1a173b;
      font-weight: bold;
    }
    .area {
      .el-select {
        width: 90px;
        margin-right: 22px;
      }
    }
    .subsidiary {
      .el-select {
        float: left;
        width: 320px;
      }
    }

    .el-form-item__label {
      font-size: 12px;
      color: #8a96a0;
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
    //改寫ui
    .el-form-item__content span {
      font-size: 12px;
      color: rgba(26, 23, 59, 1);
      margin-left: 15px;
    }
    .el-form-item__content {
      .el-date-editor input {
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
      .el-form-item__error {
        margin-top: 4px;
        position: relative;
        line-height: 32px;
        background: #f56c6c;
        float: left;
        color: #fff;
        padding: 0px 15px;
        border-radius: 3px;
      }
      .el-input {
        width: 320px;
        float: left;
      }
      .el-textarea {
        width: 395px;
      }
    }
    .area {
      .el-input--suffix {
        width: 90px;
      }
    }
  }
}
</style>
