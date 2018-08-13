<template>
  <main class="home">
    <div class="main-container">
      <div class="index-container">
        <!--头部数据浮动栏-->
        <!--<draggable class="data-board" v-model="dataBoard" element="div" :options="dragOptions">-->
        <!--<transition-group type="transition" :name="'flip-list'" tag="div" style="width: 100%;display: flex">-->
        <div class="data-board">
          <div class="data-board-zone"
            v-if="dataBoard.deliveryObject">
            <div class="title">当前投放项目（个）</div>
            <div class="data-numb">{{ parseFloat(dataBoard.deliveryObject.nowProjectCount).toLocaleString() }}</div>
            <div class="data-fluctuation">
              <div class="compare">
                <!--<span>较昨日</span><i class="add">{{ "111" }}</i>-->
              </div>
              <div class="item">
                本月新增:
                <span>{{ parseFloat(dataBoard.deliveryObject.sameMonthCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                累计项目:
                <span>{{ parseFloat(dataBoard.deliveryObject.totalProjectCount).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="data-board-zone"
            v-if="dataBoard.showObject">
            <div class="title">实时展现量（次）</div>
            <div class="data-numb">{{ parseFloat(dataBoard.showObject.nowCount).toLocaleString() }}</div>
            <div class="data-fluctuation">
              <div class="compare">
                <span>较昨日</span>
                <i :class="{add:dataBoard.showObject.compareCount - 0 >= 0,
                      decrease:dataBoard.showObject.compareCount - 0 < 0}">
                  {{ parseFloat(dataBoard.showObject.compareCount).toLocaleString() }}%
                </i>
              </div>
              <div class="item">
                昨日展现:
                <span>{{ parseFloat(dataBoard.showObject.yesterCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                日均展现:
                <span>{{ parseFloat(dataBoard.showObject.dailyMeanCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                累计展现:
                <span>{{ parseFloat(dataBoard.showObject.totalCount).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="data-board-zone"
            v-if="dataBoard.clickNumObject">
            <div class="title">实时点击量（次）</div>
            <div class="data-numb">{{ parseFloat(dataBoard.clickNumObject.nowClickCount).toLocaleString() }}</div>
            <div class="data-fluctuation">
              <div class="compare">
                <span>较昨日</span>
                <i :class="{add:dataBoard.clickNumObject.compareClickCount - 0 >= 0,
                      decrease:dataBoard.clickNumObject.compareClickCount - 0 < 0}">
                  {{ parseFloat(dataBoard.clickNumObject.compareClickCount).toLocaleString() }}%
                </i>
              </div>
              <div class="item">
                昨日点击:
                <span>{{ parseFloat(dataBoard.clickNumObject.yesterClickCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                日均点击:
                <span>{{ parseFloat(dataBoard.clickNumObject.dailyMeanClickCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                累计点击:
                <span>{{ parseFloat(dataBoard.clickNumObject.totalClickCount).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="data-board-zone"
            v-if="dataBoard.guestsObject">
            <div class="title">实时获客量（组）</div>
            <div class="data-numb">{{ parseFloat(dataBoard.guestsObject.nowGuestsCount).toLocaleString() }}</div>
            <div class="data-fluctuation">
              <div class="compare">
                <span>较昨日</span>
                <i :class="{add:dataBoard.guestsObject.compareGuestsCount - 0 >= 0,
                      decrease:dataBoard.guestsObject.compareGuestsCount - 0 < 0}">
                  {{ parseFloat(dataBoard.guestsObject.compareGuestsCount).toLocaleString() }}%
                </i>
              </div>
              <div class="item">
                昨日获客:
                <span>{{ parseFloat(dataBoard.guestsObject.yesterGuestsCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                日均获客:
                <span>{{ parseFloat(dataBoard.guestsObject.dailyMeanGuestsCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                累计获客:
                <span>{{ parseFloat(dataBoard.guestsObject.totalGuestsCount).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="data-board-zone"
            v-if="dataBoard.consumObject">
            <div class="title">实时消费金额（元）</div>
            <div class="data-numb">{{ parseFloat(dataBoard.consumObject.nowConsumCount).toLocaleString() }}</div>
            <div class="data-fluctuation">
              <div class="compare">
                <span>较昨日</span>
                <i :class="{add:dataBoard.consumObject.compareConsumCount - 0 >= 0,
                      decrease:dataBoard.consumObject.compareConsumCount - 0 < 0}">
                  {{ parseFloat(dataBoard.consumObject.compareConsumCount).toLocaleString()}}%
                </i>
              </div>
              <div class="item">
                昨日消费:
                <span>{{ parseFloat(dataBoard.consumObject.yesterConsumCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                日均消费:
                <span>{{ parseFloat(dataBoard.consumObject.dailyMeanConsumCount).toLocaleString() }}</span>
              </div>
              <div class="item">
                累计消费:
                <span>{{ parseFloat(dataBoard.consumObject.totalConsumCount).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!--</transition-group>-->
        <!--</draggable>-->
        <!--头部数据浮动栏end-->
        <!--功能tab菜单-->
        <div class="tap-menu">
          <template v-for="(item, index) in tapMenu">
            <div class="tap-zone"
              :key="index">
              <div class="tap-zone-img">
                <img :src="item.src"
                  alt=""
                  height="70">
              </div>
              <div class="tap-zone-message">
                <div class="title">{{ item.title }}</div>
                <div class="context">{{ item.context }}</div>
              </div>
            </div>
          </template>
        </div>
        <!--功能tab菜单-->
      </div>

      <footerA class="mainApp"
               style="position: fixed;bottom:0px;margin-left: 32px;"></footerA>
    </div>

  </main>
</template>

<script>
import footerA from '../components/common/footer.vue'; //底部

export default {
  components: {
    footerA
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true; // 让 A 不缓存，即刷新
    next();
  },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      };
    }
  },
  created() {
    this.homePageCount();
    /*this.$api.requestHomeData('').then((res)=>{
          console.log(res)
          if(res.code == "1"){
            this.dataBoard = res.data
          }
        })*/
  },
  data() {
    return {
      editable: true,
      dataBoard: {
        clickNumObject: {
          nowClickCount: '',
          yesterClickCount: '',
          dailyMeanClickCount: '',
          compareClickCount: '',
          totalClickCount: ''
        },
        showObject: {
          compareCount: '',
          nowCount: '',
          dailyMeanCount: '',
          totalCount: '',
          yesterCount: ''
        },
        consumObject: {
          compareConsumCount: '',
          totalConsumCount: '',
          dailyMeanConsumCount: '',
          nowConsumCount: '',
          yesterConsumCount: ''
        },
        deliveryObject: {
          nowProjectCount: '',
          totalProjectCount: '',
          sameMonthCount: ''
        },
        guestsObject: {
          compareGuestsCount: '',
          nowGuestsCount: '',
          yesterGuestsCount: '',
          totalGuestsCount: '',
          dailyMeanGuestsCount: ''
        }
      },
      tapMenu: [
        {
          title: '项目管理',
          context: '创建项目、策略配置、置业顾问',
          src: require('../assets/homeicon/icon-home-4.png')
        },
        {
          title: '落地页制作',
          context: '模版制作落地页，栏目、效果自定义',
          src: require('../assets/homeicon/icon-home-5.png')
        },
        {
          title: '投放推广',
          context: '创建投放，获取落地页投放链接',
          src: require('../assets/homeicon/icon-home-1.png')
        },
        {
          title: '客户列表',
          context: '获取明细查询，基本信息、通话记录、进度记录',
          src: require('../assets/homeicon/icon-home-3.png')
        },
        {
          title: '页面分析',
          context: '落地页热力图、落地页复盘',
          src: require('../assets/homeicon/icon-home-2.png')
        },
        {
          title: '钉钉通报',
          context: '按天/周查看项目投放情况',
          src: require('../assets/homeicon/icon-home-6.png')
        }
      ]
    };
  },
  methods: {
    homePageCount() {
      this.$api.homePageCount().then(res => {
        this.dataBoard = res;
      });
    }
  }
};
</script>

<style lang="scss"  type="text/scss">
body {
  background: #f9fafb;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.home {
  background: rgba(249, 250, 251, 1);
}
.main-container {
  padding-top: 30px;
  width: 1440px;
  height: 100%;
  margin: 0px auto;
  .index-container {
    padding: 0px 32px;
    .data-board {
      width: 100%;
      height: 235px;
      display: flex;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      padding: 32px 0;
      margin-bottom: 32px;
      .data-board-zone {
        width: 20%;
        padding: 0 60px;
        background: url('../assets/homeicon/line.jpg') center right no-repeat;
        &:last-child {
          background: none;
        }
        .title {
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: #555;
          padding-bottom: 10px;
        }
        .data-numb {
          height: 40px;
          line-height: 40px;
          color: #222;
          font-size: 36px;
          font-weight: bold;
          /*margin-bottom: 10px;*/
        }
        .data-fluctuation {
          .compare {
            margin-bottom: 15px;
            height: 16px;
            span {
              color: #999;
              text-align: center;
              font-size: 12px;
            }
            i.add {
              color: #e7343a;
              font-size: 12px;
              font-style: normal;
              &:before {
                content: '';
                border-width: 5px 5px 7px 5px;
                border-style: solid;
                border-color: transparent transparent #e7343a transparent;
                position: relative;
                top: -11px;
                margin: 5px;
              }
            }
            i.decrease {
              color: #2c9414;
              font-size: 12px;
              font-style: normal;
              &:before {
                content: '';
                border-width: 7px 5px 5px 5px;
                border-style: solid;
                border-color: #2c9414 transparent transparent transparent;
                position: relative;
                top: 11px;
                margin: 5px;
              }
            }
          }
          .item {
            height: 20px;
            line-height: 20px;
            color: #555;
            font-size: 12px;
            span {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .tap-menu {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 80px;
      .tap-zone {
        display: flex;
        width: calc((100% - 40px) / 3);
        height: 150px;
        border-radius: 2px;
        margin-right: 20px;
        margin-bottom: 26px;
        padding: 40px 0;
        background-color: #fff;
        cursor: pointer;
        &:nth-child(3n) {
          margin-right: 0px;
        }
        &:hover {
          transition: box-shadow 0.5s linear;
          box-shadow: 0px 5px 10px 0px rgba(32, 70, 144, 0.1);
        }
        .tap-zone-img {
          width: 180px;
          height: 70px;
          img {
            display: block;
            border: none;
            width: auto;
            margin: 0 auto;
          }
        }
        .tap-zone-message {
          width: calc(100% - 180px);
          height: 70px;
          padding-right: 80px;
          .title {
            height: 30px;
            line-height: 30px;
            color: #555555;
            font-size: 20px;
            text-align: left;
            margin-bottom: 10px;
          }
          .context {
            height: 34px;
            line-height: 17px;
            color: #808080;
            font-size: 12px;
            text-align: left;
            width: 150px;
          }
        }
      }
    }
  }
  .home-footer {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color: #808080;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    .container {
      width: 1280px;
      margin: 0 auto;
      text-align: right;
    }
  }
}
</style>
