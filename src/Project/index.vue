<template>
  <main class="project">
    <section class="title">
      项目列表
    </section>

    <section class="projectS">
      <div class="left">

        <template v-if="type==1">
          <div class="type1">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="search_text"
              filterable
              remote
              reserve-keyword
              placeholder="查询项目名称、所属机构、外显号码、被叫号码"
              :remote-method="remoteMethod"
              :loading="loading"
              size="mini"
              class="serachS">
              <el-option v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
        <template v-else-if="type==2">
          <div class="type2">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="project_name"
              :loading="loading"
              size="mini"
              class="serachS">
              <el-option v-for="item in PlistAll"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </template>

        <template v-else-if="type==3">
          <div class="type3">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="org_name"
              :loading="loading"
              size="mini"
              class="serachS">
              <el-option v-for="item in PListOrg"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </template>

        <template v-else-if="type==4">
          <div class="type4">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="show_number"
              placeholder="请输入外显号码"
              class="serachS"></el-input>
          </div>
        </template>

        <template v-else-if="type==5">
          <div class="type5">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="seat_resource"
              placeholder="请输入坐席资源"
              class="serachS"></el-input>
          </div>
        </template>

        <template v-else-if="type==6">
          <div class="type6">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="mobile_terminal"
              :loading="loading"
              size="mini"
              class="serachS">
              <el-option label="全部"
                value=""></el-option>
              <el-option label="话机"
                value="话机"></el-option>
              <el-option label="app"
                value="app"></el-option>
            </el-select>
          </div>
        </template>

        <template v-else-if="type==7">
          <div class="type7">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-model="called_number"
              placeholder="请输入被叫号码"
              class="serachS"></el-input>
          </div>
        </template>

        <template v-else-if="type==8">
          <div class="type8">
            <el-select v-model="type"
              slot="prepend"
              placeholder="请选择"
              @change="selectType"
              class="typeClass"
              size="small">
              <el-option v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="status"
              :loading="loading"
              size="mini"
              class="serachS">
              <el-option label="全部"
                value=""></el-option>
              <el-option label="有效"
                value="有效"></el-option>
              <el-option label="无效"
                value="无效"></el-option>
            </el-select>
          </div>
        </template>

      </div>

      <div class="right"
        style="text-align: right">
        <el-button plain
          size="medium"
          @click="restList">重 置</el-button>
        <el-button type="primary"
          size="medium"
          @click="searchList">查 询</el-button>
      </div>
    </section>

    <section class="adServingTable">
      <el-table :data="listData">
        <el-table-column width="50">
        </el-table-column>

        <el-table-column prop="project_name"
          label="项目名称"
          width="180">
        </el-table-column>

        <el-table-column prop="org_name"
          label="所属机构"
          width="180">
        </el-table-column>

        <el-table-column prop="show_number"
          label="外显号码">
        </el-table-column>

        <el-table-column prop="seat_resource"
          label="坐席资源">
        </el-table-column>

        <el-table-column prop="mobile_terminal"
          :filter-multiple="false"
          label="移动终端"
          :filters="[
          {text: '话机', value: '话机'},
           {text: 'app', value: 'app'}]"
          :filter-method="filterHandler">
        </el-table-column>

        <el-table-column prop="mobile_terminal"
          label="被叫号码">
        </el-table-column>
        <el-table-column prop="status"
          :filter-multiple="false"
          label="项目状态"
          :filters="[
          {text: '有效', value: '有效'},
           {text: '无效', value: '无效'}]"
          :filter-method="filterHandler">
        </el-table-column>

        <el-table-column prop="begin_date"
          sortable
          label="创建时间">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              size="small"
              @click="modification(scope)">编辑</el-button>
            <el-button type="text"
              size="small"
              @click="configuration(scope)">配置</el-button>
            <template v-if="scope.row.status=='有效'">
              <el-button type="text"
                size="small"
                @click="changeState(scope)">禁用</el-button>
            </template>
            <template v-else>
              <el-button type="text"
                size="small"
                @click="changeState(scope)">启用</el-button>
            </template>

          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="adPage"
      v-if="listData.length>0">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total_records">
      </el-pagination>
    </section>

  </main>
</template>
<script>
export default {
  data() {
    return {
      type: '1', //查询类型  1全部 2项目名称  3 所属机构  4外显号码  5坐席资源 6移动终端  7被叫号码 8项目状态
      options4: [],
      search_text: '',
      project_name: '',
      show_number: '',
      org_name: '',
      seat_resource: '',
      mobile_terminal: '',
      called_number: '',
      status: '',

      list: [],
      loading: false,
      typeOptions: [
        {
          value: '1',
          label: '全部'
        },
        {
          value: '2',
          label: '项目名称'
        },
        {
          value: '3',
          label: '所属机构'
        },
        {
          value: '4',
          label: '外显号码'
        },
        {
          value: '5',
          label: '坐席资源'
        },
        {
          value: '6',
          label: '移动终端'
        },
        {
          value: '7',
          label: '被叫号码'
        },
        {
          value: '8',
          label: '项目状态'
        }
      ],
      PlistAll: [], //项目列表
      PListOrg: [], //机构
      states: [], //模糊查询数据

      currentPage: 1,
      listData: [], //项目管理列表
      total_records: '' //总数据
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  created() {
    this.getProjectList();
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    listByLike(text) {
      //模糊查询
      this.$request
        .post('/api/private/project/listByLike', {
          search_text: text
        })
        .then(res => {
          this.states = res;
          this.list = this.states.map(item => {
            return { value: item, label: item };
          });
          console.log(this.list);
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list;
          }, 200);
        });
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== '') {
        this.loading = true;
        this.listByLike(query);
      } else {
        this.options4 = [];
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getProjectList();
    },
    changeState(index) {
      // 禁用、启用
      let stateIndex = 0; //0禁用，1启用
      console.log(index.row.status);
      if (index.row.status == '无效') {
        stateIndex = 1;
      }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      this.$request
        .post('/api/private/project/changeState', {
          project_id: index.row.project_id,
          state: stateIndex
        })
        .then(res => {
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.getProjectList();
          setTimeout(() => {
            loading.close();
          }, 1000);
        });
    },
    configuration(index) {
      //配置
      this.$router.push('/Project/deploy/' + index.row.project_id);
    },
    modification(index) {
      //编辑
      console.log(index.row.id);
      this.$router.push('/Project/editor/' + index.row.project_id);
    },
    selectType() {
      //选择类型
      console.log(this.type);
      if (this.type == '2') {
        this.getProjectListAll();
      } else if (this.type == '3') {
        this.getProjectListOrg();
      } else if (this.type == '1') {
        this.search_text = '';
      }
    },
    restList() {
      this.type = '1';
      this.search_text = '';
      this.project_name = '';
      this.show_number = '';
      this.org_name = '';
      this.seat_resource = '';
      this.mobile_terminal = '';
      this.called_number = '';
      this.status = '';
      this.getProjectList();
    },
    searchList() {
      //搜索

      if (this.type == '1') {
        //this.search_text = ''
        this.project_name = '';
        this.show_number = '';
        this.org_name = '';
        this.seat_resource = '';
        this.mobile_terminal = '';
        this.called_number = '';
        this.status = '';
      } else if (this.type == '2') {
        this.search_text = '';
        //this.project_name = ''
        this.show_number = '';
        this.org_name = '';
        this.seat_resource = '';
        this.mobile_terminal = '';
        this.called_number = '';
        this.status = '';
      } else if (this.type == '3') {
        this.search_text = '';
        this.project_name = '';
        this.show_number = '';
        // this.org_name = ''
        this.seat_resource = '';
        this.mobile_terminal = '';
        this.called_number = '';
        this.status = '';
      } else if (this.type == '4') {
        this.search_text = '';
        this.project_name = '';
        //this.show_number = ''
        this.org_name = '';
        this.seat_resource = '';
        this.mobile_terminal = '';
        this.called_number = '';
        this.status = '';
      } else if (this.type == '5') {
        this.search_text = '';
        this.project_name = '';
        this.show_number = '';
        this.org_name = '';
        //this.seat_resource = ''
        this.mobile_terminal = '';
        this.called_number = '';
        this.status = '';
      } else if (this.type == '6') {
        this.search_text = '';
        this.project_name = '';
        this.show_number = '';
        this.org_name = '';
        this.seat_resource = '';
        //this.mobile_terminal = ''
        this.called_number = '';
        this.status = '';
      } else if (this.type == '7') {
        this.search_text = '';
        this.project_name = '';
        this.show_number = '';
        this.org_name = '';
        this.seat_resource = '';
        this.mobile_terminal = '';
        //this.called_number = ''
        this.status = '';
      } else if (this.type == '8') {
        this.search_text = '';
        this.project_name = '';
        this.show_number = '';
        this.org_name = '';
        this.seat_resource = '';
        this.mobile_terminal = '';
        this.called_number = '';
        // this.status = ''
      }
      this.getProjectList();
    },
    getProjectListOrg() {
      //获取所属机构
      this.$request.get('/api/private/project/listOrg', {}).then(res => {
        this.PListOrg = res;
        this.PListOrg.unshift('全部');
      });
    },
    getProjectListAll() {
      //获取项目列表
      this.$request.get('/api/private/project/listAll', {}).then(res => {
        this.PlistAll = res;
        this.PlistAll.unshift('全部');
      });
    },
    getProjectList() {
      this.$request
        .post('/api/private/project/list', {
          //列表
          page: this.currentPage,
          search_text: this.search_text,
          project_name: this.project_name,
          show_number: this.show_number,
          org_name: this.org_name,
          seat_resource: this.seat_resource,
          mobile_terminal: this.mobile_terminal,
          called_number: this.called_number,
          status: this.status
        })
        .then(res => {
          this.listData = res.list;
          this.total_records = res.total_records;
          console.log(this.total_records);
        });
    }
  },
  watch: {
    search_text(val, oldval) {
      console.log(val);
      this.listByLike(val);
    }
  }
};
</script>
<style type="text/scss" lang="scss">
.project {
  width: 1380px;
  margin: 0 auto;
  .title {
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    color: rgba(26, 23, 59, 1);
    border-bottom: 1px solid #f2f4f8;
  }
  .projectS {
    margin-top: 23px;
    padding-bottom: 32px;
    height: auto;
    overflow: hidden;
    .left {
      float: left;
      width: 400px;
      height: 32px;
      .type1 {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 400px;
        height: 34px;
        .el-select .el-input__inner {
          border: none;
          height: 32px;
          line-height: 32px;
        }
        .typeClass {
          .el-input__suffix {
            border-right: 1px solid #dcdfe6;
          }
        }
        .serachS {
          .el-input {
            width: 280px;
          }
          .el-input__suffix {
            display: none;
          }
          .el-input--suffix .el-input__inner {
            padding-right: 0px;
          }
        }
      }
      .type2,
      .type3,
      .type6,
      .type8 {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 400px;
        height: 34px;
        .el-select .el-input__inner {
          border: none;
          height: 32px;
          line-height: 32px;
        }
        .typeClass {
          .el-input__suffix {
            border-right: 1px solid #dcdfe6;
          }
        }
        .serachS {
          .el-input {
            width: 280px;
          }
        }
      }
      .type4,
      .type5,
      .type7 {
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        width: 400px;
        // height: 34px;
        .el-select .el-input__inner {
          border: none;
          height: 32px;
          line-height: 32px;
        }
        .typeClass {
          .el-input__suffix {
            border-right: 1px solid #dcdfe6;
          }
        }
        .serachS {
          width: 280px;
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            border: 0px;
          }
        }
      }

      .input-with-select {
        input::-webkit-input-placeholder {
          /*WebKit browsers*/
          font-size: 12px;
          color: rgba(204, 209, 214, 1);
        }
      }
      .el-select .el-input {
        font-size: 12px;
        width: 106px;
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
        .el-select__caret {
          line-height: 32px;
        }
      }
      .input-with-select .el-input-group__prepend {
        background-color: #fff;
      }
    }
    .right {
      float: right;
      .el-button {
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
  .adServingTable {
    /*width: 1376px;*/
    /*margin: 0 auto;*/

    .el-table {
      /*width: 1376px;*/
      /*margin: 0 auto;*/

      font-size: 12px;
      color: rgba(26, 23, 59, 1);
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .el-table__body-wrapper {
        border: 1px solid #efefef;
        border-bottom: 0;
        border-top: 0;
      }
    }
    .el-table th {
      background: #f4f4f4 !important;
      text-align: center;
    }
  }
  .adPage {
    padding-top: 32px;
    text-align: right;
  }
}
</style>
