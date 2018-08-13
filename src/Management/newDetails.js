import footerA from "../components/common/footer.vue"; //底部
export default {
  components: {
    footerA
  },
  data() {
    return {

      // ChannelLoading:false,
      launchSet: false,
      currentPage: 1,
      total_records: 0,//总数据
      archiveId: this.$route.params.id,
      NewList: [],
      pageUrl: '',
      pageType: '',//落地页类型

      // channelIds: '',
      // pageTypes: '',
      uuid: '',
      baiDuPageId: '',
      msg: '',
      loading: true,
      dialogVisible: false,
      command: '',


      brListCondtionData: [],//初始化


      pageTypeBox: false,

      isPageTypeAll: true,
      pageTypeAll: false,
      pageTypeChecked: [],
      brListCondtionDataPageType: [],


      channelNameBox: false,
      isChannelNameAll: false,
      channelNameAll: false,
      channelNameChecked: [],

      uuid:'',
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.DeliveryInit();
    this.getList();

  },
  methods: {

    //落地页类型
    CheckedPageTypeAll(val) {
      console.log(this.brListCondtionDataPageType);
      this.isPageTypeAll = true;
      this.pageTypeChecked = val ? this.brListCondtionDataPageType : [];
      console.log(this.pageTypeChecked)
      this.isPageTypeAll = true;
    },
    CheckedPageType(value) {
      let checkedCount = value.length;
      this.pageTypeAll = checkedCount === this.brListCondtionDataPageType.length;
      this.isPageTypeAll = checkedCount > 0 && checkedCount < this.brListCondtionDataPageType.length;
    },
    pageTypeSaveCheckeds() {
      this.pageTypeBox = false;
      this.getList();
    },

    //渠道
    CheckedChannelNameAll(val) {
      this.channelNameChecked = val ? this.brListCondtionData.channel : [];
      this.isChannelNameAll = true;
    },
    CheckedChannelName(value) {
      let checkedCount = value.length;
      this.channelNameAll = checkedCount === this.brListCondtionData.channel.length;
      this.isChannelNameAll = checkedCount > 0 && checkedCount < this.brListCondtionData.channel.length;
    },
    channelNameSaveCheckeds() {
      this.channelNameBox = false;
      this.getList();
    },


    modification() {
      this.$router.push('/Management');
    },

    //添加标签
    pushTagesList(val, valName, name) {
      if (name != '') {
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].type == valName) {
            this.tags.splice(i, 1);
          }
        }
        let json = {
          name: val,
          type: valName,
        }
        this.tags.push(json);
        console.log(this.tags);
      } else {
        for (var i = 0; this.tags.length > i; i++) {
          if (this.tags[i].type == valName) {
            this.tags.splice(i, 1);
          }
        }
      }
    },
    link(scope) {
      console.log(scope.row.pageUrl)
      window.open(scope.row.pageUrl);
    },

    //弹窗显示时的数据
    Seting(scope) {
      console.log(scope)
      console.log(scope.row.uuid)
      this.uuid =scope.row.uuid
      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/selectBaiduPageId', {
        uuid: scope.row.uuid,

      }, {}, res => {
        console.log(res)
        if(res.data.code==1){
          this.baiDuPageId= res.data.data.baiDuPageId
        }

      })

    },
    fail() {
      this.$message({
        showClose: true,
        message: '请输入内容',
        type: 'error'
      });
    },
    cleanContent() {
      console.log(125)
      this.baiDuPageId = "";


    },

    //信息百度流被修改后的数据
    returnSeting(scope) {


      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/setBaiduPage', {
        uuid: this.uuid,
        baiDuPageId: this.baiDuPageId
      }, {}, res => {
        console.log(res)
        if (this.baiDuPageId == "") {
          //this.fail()
        }

      })
    },

    handleClose(tag) {
      console.log(tag)
      this.tags.splice(this.tags.indexOf(tag), 1);
      switch (tag.type) {
        case 'pageType':
          this.pageType = '';
          this.getList();
          break
        case 'channelName':
          this.channelName = '';
          this.getList();
          break


      }
    },
    DeliveryInit() {
      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/brListCondtion', {}, {}, res => {
        console.log(res)
        this.brListCondtionData = res.data.data;

        this.brListCondtionDataPageType =res.data.data.pageType;

      });
    },
    launchSethandleClose(){
          this.launchSet=false;
          this.baiDuPageId='';
    },

    getList() {
      this.loading = true;
      console.log(this.pageTypeChecked)
      let type =[];
      this.pageTypeChecked.map((item,index)=>{
        type.push(item.code);
      });
       let id=[]
      this.channelNameChecked.map((item,index)=>{
          id.push(item.code)
      })

      const json = {
        archiveId: this.archiveId,
        pageTypes: type,
        channelIds: id,
      }
      if (this.channelNameChecked.length == 0) {
        delete  json['channelIds'];
      }
      if (this.pageTypeChecked.length == 0) {
        delete  json['pageTypes']
      }

      this.$requestHttp.put('/api/private/1.0/DeliveryManagment/selectArchiveDeliveryDetail', json, {}, res => {
        console.log(res)
        console.log(this.baiDuPageId)

        if (res.data.code == 1) {
          this.NewList = res.data.data.data;
          this.loading = false;
        }

      });
    },


  }
}
