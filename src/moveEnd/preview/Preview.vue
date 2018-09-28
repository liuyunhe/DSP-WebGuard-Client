<template>
<div class="preview">
  <div class="Box">
    <!-- 手机框 -->
    <div class="Phone" >
      <!-- 屏幕 -->
      <!-- scrolling="no" 去掉滚动条 -->
       <div v-if="isshow == '1'">
          <iframe scrolling="no" name="myiframe"  id="frame"  :src="'http://182.61.33.241:8086/api/private/1.0/page/preview/'+ id " class="show" ref="show" >
          </iframe>
       </div>
    </div>
    <!-- 二维码框 -->
    <div class="Qrcode">
      <!-- 标题 -->
      <div class="title">
        微信扫一扫预览
      </div>
      <!-- 二维码 -->
      <div id="qrcode" class="code">
      </div>
      <!-- 链接 -->
      <div class="http">
        http://182.61.33.241:8086/api/private/1.0/page/preview/<br/><span>{{this.id}}</span>
      </div>
      <!-- 按钮 -->
      <div class="btn" @click="copyhttp">
        复制链接
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import QRCode from "qrcodejs2";
  import $ from 'jquery'
  // import Swiper from "swiper";
  export default {
    data() {
      return {
        id: "",
        isshow:'0',
        head:'',
        qiehuan:''
      };
    },
    beforeRouteLeave(to, from,next){
      $('#app').append(this.qiehuan)
      $('.headBg').append(this.head)
      next()
    },
    mounted() {

      this.head = $('.head')
      this.qiehuan = $('.qiehuan')

      $('.head').remove()
      $('.qiehuan').remove()

      let arr = this.$route.path.split('/')
      this.id = arr.pop()
      console.log(this.id)
      this.qrcode();
      this.change()

      //  setTimeout(() => {
      //   // let six = $("#frame").contents().find(".Text3")
      //   // let six = $(window.frames["myiframe"].document).find(".Text3");
      //     // let six = $(window.frames["myiframe"].document).find(".swiper-container")
      //   let six =  $("#frame",parent.document.body)
      //   // $(window.parent.document).find(":text");
      //   console.log(six)
      //  }, 500);

    },
    methods: {
      copyhttp() {
        console.log("复制链接");
        const input = document.createElement("input");
        document.body.appendChild(input);
        input.setAttribute(
          "value",
          "http://182.61.33.241:8086/api/private/1.0/page/preview/" + this.id
        );
        input.select();
        if (document.execCommand("copy")) {
          document.execCommand("copy");
        }
        document.body.removeChild(input);
        this.$message({
          message: "复制成功！",
          type: "success",
          center: true,
          duration: 1000
        });
      },
      qrcode() {
        let qrcode = new QRCode("qrcode", {
          width: 142,
          height: 138, // 高度
          text:
            "http://182.61.33.241:8086/api/private/1.0/page/preview/" + this.id //
        });
        console.log(qrcode);
      },
      change(){
        this.isshow = '1'
      }
    },
  };
</script>
<style lang="scss" scoped >
  .preview {
    width: 1380px;
    margin: 0 auto;
    height: -webkit-fill-available;
    min-height: 930px;
    position: relative;
    .Box {
      width: 919px;
      height: 870px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // background-color: aqua;
      display: flex;
      // margin-bottom: 300px;
      .Phone {
        width: 737px;
        height: 859px;
        background-color: red;
        background: url("../../assets/imgs/iphoneX.png")no-repeat;
        background-size: 412px  860px;
        // margin-top:140px;
        .show {
          margin: 96px 17px 0px 19px;
          width: 375px;
          height: 667px;
          overflow: hidden;
          overflow-y: scroll;
        }
        .show::-webkit-scrollbar {
          display: none;
        }
      }
      .Qrcode {
        width: 426px;
        height: 379px;
        background-color: white;
        margin: 72px 0 73px 82px;
        border: 1px solid #d6d6d6;
        border-radius: 10px;
        position: relative;
        top: 20%;
        .title {
          width: 135px;
          height: 19px;
          margin: 48px 149px 17px 151px;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          // font-weight: 400;
          color:#1897DE;
          font-weight: 600;
        }
        .code {
          width: 142px;
          height: 138px;
          border: 1px solid #d6d6d6;
          margin: 0 0 10px 142px;
        }
        .http {
          width: 364px;
          height: 34px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color:#BBBBBB;
          line-height: 18px;
          margin: 0 31px 45px 31px;
        }
        .btn{
          width: 80px;
          height: 30px;
          background-color: #1897DE;
          border-radius: 3px;
          text-align: center;
          line-height: 30px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          margin: 0 auto
        }
      }
    }
  }

  // 翻页
  .swiper-container {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .swiper-slide {
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
  }
  img {
    display: block;
  }
  @-webkit-keyframes tipmove {
    0% {
      bottom: 10px;
      opacity: 0;
    }
    50% {
      bottom: 15px;
      opacity: 1;
    }
    100% {
      bottom: 20px;
      opacity: 0;
    }
  }
  .ani {
    position: absolute;
  }
  .txt {
    position: absolute;
  }
  #array {
    position: absolute;
    z-index: 999;
    -webkit-animation: tipmove 1.5s infinite ease-in-out;
  }
  .swiper-pagination .swiper-pagination-bullets{
    display:none !important;
  }
</style>

