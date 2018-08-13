<template>
  <main class="drop_down">
    <div class="header_title">
      <h2>监控看板</h2>
      <span class="new_time">数据更新至2018-05-31</span>
    </div>
    <div class="main">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane name="first">
          <span slot="label" class="main_list">
            <h3>当前投放项目</h3>
            <h1>{{dashSummaryInfo.deliveryObject.nowProjectCount}}</h1>
            <ul class="data">
              <li>
                <span>本月新增</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.deliveryObject.sameMonthCount}}</p>
              </li>
              <li>
                <span>累计项目</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.deliveryObject.totalProjectCount}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_one ">
              <ul>
                <li v-for="(item,index) in dashProjectDetail" :key='index'>
                  <span>{{item.projectName}}</span>
                </li>
              </ul>
              <label class="label">查看更多</label>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label" class="main_list">
            <h3>实时展现量</h3>
            <h1>{{dashSummaryInfo.showObject.nowCount}}</h1>
            <ul class="data">
              <li>
                <span>较昨日</span>
                <div class="tabs">
                  <div class="green"></div>
                </div>
                <p class="green_title">{{dashSummaryInfo.showObject.compareCount}}</p>
              </li>
              <li>
                <span>昨日展现</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.showObject.yesterCount}}</p>
              </li>
              <li>
                <span>日均展现</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.showObject.dailyMeanCount}}</p>
              </li>
              <li>
                <span>累计展现</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.showObject.totalCount}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_two ">
              <h4>展现量趋势</h4>
              <div class="list_logo ">
                <div class="logo_one"></div>
                <span>PC端</span>
              </div>
              <div class="list_logo">
                <div class="logo_two"></div>
                <span>移动端</span>
              </div>
              <el-radio-group v-model="title_one" size="small">
                <el-radio-button label="今天"></el-radio-button>
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
              <div class="chart"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label" class="main_list">
            <h3>实时点击量</h3>
            <h1>{{dashSummaryInfo.clickNumObject.nowClickCount}}</h1>
            <ul class="data">
              <li>
                <span>较昨日</span>
                <div class="tabs">
                  <div class="red"></div>
                </div>
                <p class="red_title">{{dashSummaryInfo.clickNumObject.compareClickCount}}</p>
              </li>
              <li>
                <span>昨日点击</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.clickNumObject.yesterClickCount}}</p>
              </li>
              <li>
                <span>日均点击</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.clickNumObject.dailyMeanClickCount}}</p>
              </li>
              <li>
                <span>累计点击</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.clickNumObject.totalClickCount}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_two ">
              <h4>点击量趋势</h4>
              <div class="list_logo">
                <div class="logo_one"></div>
                <span>PC端</span>
              </div>
              <div class="list_logo">
                <div class="logo_two"></div>
                <span>移动端</span>
              </div>
              <div class="list_logo">
                <div class="logo_three">
                  <div class="beeline"></div>
                  <div class="circular"></div>
                </div>
                <span>PC点击率</span>
              </div>
              <div class="list_logo">
                <div class="logo_four">
                  <div class="beeline"></div>
                  <div class="circular"></div>
                </div>
                <span>移动点击率</span>
              </div>
              <el-radio-group v-model="title_two" size="small">
                <el-radio-button label="今天"></el-radio-button>
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
              <div class="chart"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label" class="main_list">
            <h3>实时获客量</h3>
            <h1>{{dashSummaryInfo.guestsObject.nowGuestsCount}}</h1>
            <ul class="data">
              <li>
                <span>较昨日</span>
                <div class="tabs">
                  <div class="ellipsis"></div>
                </div>
                <p>{{dashSummaryInfo.guestsObject.compareGuestsCount}}</p>
              </li>
              <li>
                <span>昨日获客</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.guestsObject.yesterGuestsCount}}</p>
              </li>
              <li>
                <span>日均获客</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.guestsObject.dailyMeanGuestsCount}}</p>
              </li>
              <li>
                <span>累计获客</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.guestsObject.totalGuestsCount}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_two ">
              <h4>获客量趋势</h4>
              <div class="list_logo">
                <div class="logo_one"></div>
                <span>PC端</span>
              </div>
              <div class="list_logo">
                <div class="logo_two"></div>
                <span>移动端</span>
              </div>
              <el-radio-group v-model="title_three" size="small">
                <el-radio-button label="今天"></el-radio-button>
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
              <div class="chart"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="fiveth">
          <span slot="label" class="main_list">
            <h3>实时消耗金额</h3>
            <h1>{{dashSummaryInfo.consumObject.nowConsumCount}}</h1>
            <ul class="data">
              <li>
                <span>较昨日</span>
                <div class="tabs">
                  <div class="red"></div>
                </div>
                <p class="red_title">{{dashSummaryInfo.consumObject.compareConsumCount}}</p>
              </li>
              <li>
                <span>昨日消耗</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.consumObject.yesterConsumCount}}</p>
              </li>
              <li>
                <span>日均消耗</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.consumObject.dailyMeanConsumCount}}</p>
              </li>
              <li>
                <span>累计消耗</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.consumObject.totalConsumCount}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_two ">
              <h4>消耗金额趋势</h4>
              <div class="list_logo">
                <div class="logo_one"></div>
                <span>PC端</span>
              </div>
              <div class="list_logo">
                <div class="logo_two"></div>
                <span>移动端</span>
              </div>
              <el-radio-group v-model="title_four" size="small">
                <el-radio-button label="今天"></el-radio-button>
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
              <div class="chart"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="sixth">
          <span slot="label" class="main_list">
            <h3>实时客单价</h3>
            <h1>{{dashSummaryInfo.perCustConsumObject.perCustConsum}}</h1>
            <ul class="data">
              <li>
                <span>较昨日</span>
                <div class="tabs">
                  <div class="green "></div>
                </div>
                <p class="green_title">{{dashSummaryInfo.perCustConsumObject.comparePerCustConsum}}</p>
              </li>
              <li>
                <span>昨日单价</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.perCustConsumObject.yesterPerCustConsum}}</p>
              </li>
              <li>
                <span>日均单价</span>
                <div class="tabs"></div>
                <p>{{dashSummaryInfo.perCustConsumObject.avgClientConsum}}</p>
              </li>
            </ul>
          </span>
          <div class="new_title">
            <div class="list_two ">
              <h4>客单价趋势</h4>
              <el-radio-group v-model="title_five" size="small">
                <el-radio-button label="最近7天"></el-radio-button>
                <el-radio-button label="最近15天"></el-radio-button>
                <el-radio-button label="最近30天"></el-radio-button>
              </el-radio-group>
              <div class="chart"></div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="footer">
        <div class="footer_left">
          <div class="left_top">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-radio-group v-model="radio3" size="small">
              <el-radio-button label="今天"></el-radio-button>
              <el-radio-button label="昨天"></el-radio-button>
              <el-radio-button label="最近7天"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="left_content">
            <chart :options="getDashGroupCHannelInfo" auto-resize></chart>
          </div>
          <label class="label_one">查看更多</label>
        </div>
        <div class="footer_right">
          <div class="left_top">
            <el-select @change="effectiveHandle" v-model="effective.efType" placeholder="请选择" size="small">
              <el-option v-for="item in optionsS" :key="item.value" :disabled="item.disabled" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-radio-group @change="effectiveHandle" v-model="effective.timeType" size="small">
              <el-radio-button label="today">今天</el-radio-button>
              <el-radio-button label="yesterday">昨天</el-radio-button>
              <el-radio-button label="week">最近7天</el-radio-button>
              <!-- <el-radio-button label="最近30天">最近30天</el-radio-button> -->
            </el-radio-group>
          </div>
          <div class="left_content">
            <el-table :data="dashProjEffective" v-loading="ChannelLoading">
              <el-table-column prop="project_name" label="项目名称"></el-table-column>
              <el-table-column prop="city" label="所在城市"></el-table-column>
              <el-table-column prop="ad_show_num" label="展现量"></el-table-column>
              <el-table-column prop="ad_click_num" label="点击量"></el-table-column>
              <el-table-column prop="ad_consum" label="消耗金额"></el-table-column>
              <el-table-column prop="client_num" label="获客量"></el-table-column>
              <el-table-column prop="perCust" label="客单价"></el-table-column>
            </el-table>
          </div>
          <label class="label_one">查看更多</label>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="./Monitoring.js"></script>
<style type="text/scss" lang="scss">
</style>
