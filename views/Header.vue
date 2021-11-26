<template>
  <header>
    <h1>云视界服务平台</h1>
    <el-image src="../assets/"></el-image>
    <div class="showTime"></div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
  let t = null;
  let week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期天',]
  t = setTimeout(time, 1000);//開始运行
  function time() {
  clearTimeout(t);//清除定时器
  let dt = new Date();
  let mt = dt.getMonth() + 1;
  let day = dt.getDate();
  let wday = dt.getDay();
  let h = dt.getHours();//获取时
  let m = dt.getMinutes();//获取分
  let s = dt.getSeconds();//获取秒
  document.querySelector(".showTime").innerHTML = mt + "月 " + day + "日 " + week[wday] + ' ' + h + "时" + m + "分" + s + "秒";
  t = setTimeout(time, 1000); //设定定时器，循环运行
}

</script>

<style scoped>
  header {
    background: url("../assets/head_bg.png") center no-repeat;
    height: 1.2rem;
    border: 0;
    padding: 0 0 0.5rem 0;
    margin: 0;
    top: 0;
  }
  h1 {
    position: absolute;
    left: 10.62rem;
    top: 0.2rem;
    border: 0;
    padding: 0;
    margin: 0;
    font-weight: 1400;
    font-size: 30px;
    color: #0e62bb;
  }
  .showTime {
    top: 0.2rem;
    position: absolute;
    color: white;
    font-size: 0.24rem;
    line-height: 0.96rem;
    left: 0.375rem;
    overflow: hidden;
  }
</style>
