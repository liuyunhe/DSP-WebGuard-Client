import { URL_ROOT } from '../../common/js/types';
import footerA from '../../components/common/footer.vue'; //底部
import { newly } from '@/apis/index.js'
export default {
  name: '',
  components: {
    footerA
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false; // 让 A 不缓存，即刷新
    next();
  },
  data() {
    return {
      addLandingPage:false,
      landingPage: false,
      projectId: this.$route.params.projectId,
      //载入动画显示
      listLoading: false,
      //表单
      filters: {
        status: '0',
        type: 'name',
        search: '',
        time: []
      },
      projectId: '',
      // cityList: [],
      dataList: [],
      cityName: '',
      showTime: false,
      showLabel: false,
      //table内容
      pageList: [],
      //数据总条数
      total: 0,
      //分页器当前选中页码
      currentPage: 1,
      //每页显示条数
      pageSize: 0,
      //查询页码
      page: 1,
      sels: [], //列表选中列
      pageType: '',
      showCityName:false,
    };
  },
  methods: {
    handleClose() {
      this.landingPage = false
      this.addLandingPage = false
    },
    saveUpdateInfo() {
      // 落地页设置步骤一保存/更新
      this.$request
        .get('api/private/1.0/page/save-update-info', {})
        .then(res => {
          // if (res.code == 1) {
          //   this.navMenu = res.data.menu_list;
          // }
        });
    },
    //筛选城市
    cityList() {
      console.log('1');
      this.$requestHttp.put("/api/private/1.0/page/city/list", {
        projectId: this.projectId
      }, '', res => {
        console.log(res);
        if (res.data.code == 1) {
         this.dataList = res.data.data
        }
      })
    },
    templateLink(){
        this.landingPage =false;
        this.$router.push('/SelectLandingPageTemplate/1')
    },
    // 跳转至移动端的新增
    moveEnd(num) {
      newly()
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            this.landingPage = false;
            if (num === 1) {
              this.$store.state.moveEnd.majorKeyId.uuid = res.data.list[0].uuid
              // this.$store.state.moveEnd.majorKeyId = res.data.list[0]
              // console.log(this.$store.state.moveEnd.majorKeyId)
              this.$router.push('/eoveEnd/essential/1')
            } else {
              this.$store.state.moveEnd.majorKeyId.uuid = res.data.list[1].uuid
              // this.$store.state.moveEnd.majorKeyId = res.data.list[1]
              // console.log(this.$store.state.moveEnd.majorKeyId)
              this.$router.push('/eoveEnd/essential/2')
            }
          }
        })
    },
    //删除标签
    deleteTag() {
      this.pageType = '';
      this.search.pageType = this.pageType;
      this.postSearch();
    },
    //模糊搜索
    querySearch(queryString, callback) {
      if (queryString) {
        let para;
        if (this.filters.type == 'name') {
          para = {
            orgName: this.filters.search,
            cityName: this.filters.search,
            projectName: this.filters.search,
            gid: this.filters.search,
            pageName: this.filters.search,
            status: this.filters.status
          };
        } else {
          para = {
            [this.filters.type]: this.filters.search,
            status: this.filters.status
          };
        }
        this.$request.put('api/private/1.0/page/search', para).then(res => {
          if (res == undefined) {
            callback([]);
          } else {
            let results = res.map(item => {
              return { value: item.split(',')[0], tag: item.split(',')[1] };
            });
            callback(results);
          }
        });
      } else {
        callback([]);
      }
    },
    deleteCityName() {
      this.showCityName =false;
      this.filters.cityName = '';

      this.cityName ='';
      this.page = 1;
      this.currentPage = 1;
      this.getUsers();
    },
    deleteFilterTime() {
      this.filters.time = [];
      this.page = 1;
      this.currentPage = 1;
      this.getUsers();
    },
    deleteFilterLabel() {
      this.filters.type = 'name';
      this.filters.search = '';
      this.page = 1;
      this.currentPage = 1;
      this.getUsers();
    },
    //规范事件格式
    configTime() {
      if (this.filters.time === null) {
        this.filters.time = [];
      }

    },
    handleSelect(item) {
      console.log(item);
      this.showLabel=true
      //do something
    },
      //获取用户列表
    getUsers() {
      this.configTime();
      let para = {
        pageSize: 10,
        pageNo: this.page,
        status: this.filters.status,
        name: this.filters.name,
        beginDate: this.filters.time[0],
        endDate: this.filters.time[1],
        pageType: this.pageType,
        cityName:this.cityName,
        [this.filters.type]: this.filters.search
      };

      this.showTime = !!this.filters.time.length;
      this.showLabel = this.filters.search !== '';
      this.search = para;
      this.postSearch();
      console.log('1234566')
    },
    //传送查询条件
    postSearch() {
      this.listLoading = true;
      this.$api.getLandingPageList(this.search).then(res => {
        this.pageList = res.list;
        this.total = res.count;
        this.pageSize = res.pageSize;
        this.listLoading = false;
      });
    },
    //查询按钮
    commitForm() {
      this.page = 1;
      this.currentPage = 1;
      this.getUsers();
    },
    //radio按钮,重置
    getStatus() {
      this.showCityName=false;
      this.filters.cityName='';


      this.cityName ='';
      this.filters.type = 'name';
      this.filters.search = '';
      this.filters.time = [];
      this.showTime =false;


      this.page = 1;
      this.currentPage = 1;
      this.pageType = '';
      this.getUsers();
    },
    //分页器功能
    handleCurrentChange(val) {
      this.page = val;
      this.search['pageNo'] = val;
      this.postSearch();
      this.currentPage = val;
    },
    //跳转按钮功能
    jumpTo() {
      this.$emit('current-change');
    },
    //超过十个字添加title属性
    istitle(value) {
      if (value) {
        if (value.length > 5) {
          return value;
        } else {
          return '';
        }
      }
    },
    //pageType选择
    pageTypeHandle(command) {
      this.pageType = command;
      this.getUsers();
    },
    cityNameHandle(command) {
      this.filters.cityName = command;
      console.log(command);
      this.cityName =command;
     this.showCityName=true;
      this.getUsers();
      // this.data;
    },
    //发布状态筛选:上架、下架
    handleUpdateStatus(value) {
      let status = this.filters.status;
      this.$confirm(
        `确定${status == '1' ? '上' : '下'}架该落地页?`,
        '提示信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
          //                let _this = this
          this.$api.pagelistUpdateStatus(value.uuid).then(res => {
            this.$message({
              type: 'success',
              message: `已${status == '1' ? '上' : '下'}架!`
            });

            if( this.filters.status=='1'){
              this.filters.status ='0';
              this.getStatus();
            }else{
              this.filters.status ='1'
              this.getUsers()
            }
            console.log(this.filters.status)
            this.postSearch();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    //预览按钮
    previewLandingPage(item,link) {
      window.open(link+`/api/private/1.0/page/preview/${item.uuid}`);
    },
    //编辑功能
    editLandingpage(item) {
      console.log(item)
      if (item.pageType === '1' || item.pageType === '2') {
        this.$router.push('/eoveEnd/essential/1')
        this.$store.state.moveEnd.moveuuid = item.uuid
        console.log(this.$store.state.moveEnd.moveuuid)
      } else if (item.pageType === '0') {
        //列表无返回模板id,默认写死
        this.$router.push({
          path: '/MessageSetting/'+item.uuid+'/'+'a7d22e47-4aad-11e8-a730-00163e04791f'});
      }
      // this.$store.commit('setLandingPageId', item.uuid);
    },
    // copy
    handleCopyUrl(item,link) {


      const url = link+`/api/private/1.0/page/preview/${item.uuid}`;
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', url);
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 9999);
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        this.$message({
          customClass: 'global-message',
          type: 'info',
          message: '链接已复制'
        });
      }
      document.body.removeChild(input);
    }
  },
  mounted() {
    this.getUsers();
    this.cityList();
    // 落地页设置步骤一保存/更新
    // this.saveUpdateInfo();
  }
};
