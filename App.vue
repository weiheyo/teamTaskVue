<template>
  <div id="app">
   <Header @online="FullScreen"></Header>
    <el-button CLASS="fulls" @click="FullScreen">全屏</el-button>
   <BigBox></BigBox>
  </div>
</template>

<script>

import Header from "./views/Header";
import BigBox from "./views/BigBox";

export default {
  name: 'app',
  components: {BigBox, Header},
  methods: {
    fullSc() {
      setTimeout(function (){
        this.FullScreen()
      },1000)
    },
    // 判断各种浏览器，找到正确的方法
    FullScreen() {
      let el = document.documentElement;
      let rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen;
      // Element.requestFullscreen() 此方法用于发出异步请求使元素进入全屏模式。
      // 调用此API并不能保证元素一定能够进入全屏模式。如果元素被允许进入全屏幕模式，
      // document对象会收到一个fullscreenchange事件，通知调用者当前元素已经进入全屏模式。
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      }
    }
  },
}
</script>

<style>
  #app {
    top: 0;
    left: 0;
    padding: 0;
    border: 0;
    margin: 0;
  }
  body {
    overflow: hidden;
    background: url("./assets/bg.jpg");
    background-size: 26rem;
    padding: 0;
    border: 0;
    margin: 0;
  }
  h1 {
    color: white;
    font-size: 0.48rem;
    text-align: center;
    line-height: 1rem;
  }
  /* 约束屏幕尺寸 */
  @media screen and (max-width: 1024px) {
    html {
      font-size: 42px !important;
    }
  }
  @media screen and (min-width: 1920px) {
    html {
      font-size: 80px !important;
    }
  }
  .fulls {
    top: 0.35rem;
    position: absolute;
    color: white;
    font-size: 0.24rem;
    right: 2rem;
    overflow: hidden;
    background-color: rgba(0,0,0,0);
  }
</style>
