<template>
  <section id="mainBox">
    <div class="column">
      <div class="panel 1">
        <h2>流量变化</h2>
        <div id="flowChange" style="height: 100%"></div>
        <div class="panelFooter"></div>
      </div>
      <div id='panelLong' class="panel 2">
        <h2>流量统计</h2>
        <div id="typesChart" style="height: 100%"></div>
        <div class="panelFooter"></div>
      </div>
    </div>
    <div class="column">
      <h1 class="no">监控流量</h1>
      <div class="video">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"/>
      </div>
      <input name="file" type="file" accept="image/jpg,image/png,video/mp4" @change="update" class="uploadB"/>
      <button class="downloadB" @click='download' name="download">click here download</button>
    </div>
    <div class="column">
      <div class="panel 3">
        <h2>改装车辆</h2>
        <div id="modified" style="height: 100%"></div>
        <div class="panelFooter"></div>
      </div>
      <div class="panel 4">
        <h2>脱把骑行</h2>
        <div id="offHandle" style="height: 100%"></div>
        <div class="panelFooter"></div>
      </div>
      <div class="panel 4">
        <h2>未戴头盔</h2>
        <div id="noHelmet" style="height: 100%"></div>
        <div class="panelFooter"></div>
      </div>
    </div>
  </section>
</template>

<script>
import echarts from 'echarts'
// import https from '../api/https'
import axios from "axios"
export default {
  name: "BigBox",
  data() {
    return {
      allDataX:[0,1, 2, 3, 4, 5],
      flowChangeDataP:[3, 2, 3, 4, 5, 2],
      flowChangeDataE:[4,1,5,5,6,7],
      modifiedData:[3,6,6,8,2,4],
      noHelmetData:[6,8,9,3,8,3],
      fileName:'',
      filePath:'',
      playerOptions: { // 视频常用设置
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false,
        loop: false,
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值
        fluid: true, // 当true时，Video.js player将拥有流体大小
        sources: [{
          type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "http://domhttp.kksmg.com/2021/11/24/h264_720p_600k_31072-yangputv-20211124195700-2220-191719-600k_mp4.mp4" // url地址
        }],
        poster: "https://sm.ms/image/Fn5yQ6ogxkaujs7",
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  // 全屏按钮
        }
      }
    };
  },
  filters: {
    percent(val) {
      return Number.parseInt(val) + '%';
    }
  },
  methods: {
    // downloadImg() {
    //   this.$downloadFileAxios("http://124.70.131.56:5003/download", {'videopath':'runs/detect/exp','videoname':'vid_1.jpg'})
    //       .then(res=>{
    //         console.log(res)//res就是url地址，直接赋给src即可
    //       })
    // },
    // exportData () {
    //   const form = this.getSearchForm() // 要发送到后台的数据
    //   axios({ // 用axios发送post请求
    //     method: 'post',
    //     url: '/user/12345', // 请求地址
    //     data: form, // 参数
    //     responseType: 'blob' // 表明返回服务器返回的数据类型
    //   })
    //       .then((res) => { // 处理返回的文件流
    //         const content = res
    //         const blob = new Blob([content])
    //         const fileName = '测试表格123.xls'
    //         if ('download' in document.createElement('a')) { // 非IE下载
    //           const elink = document.createElement('a')
    //           elink.download = fileName
    //           elink.style.display = 'none'
    //           elink.href = URL.createObjectURL(blob)
    //           document.body.appendChild(elink)
    //           elink.click()
    //           URL.revokeObjectURL(elink.href) // 释放URL 对象
    //           document.body.removeChild(elink)
    //         } else { // IE10+下载
    //           navigator.msSaveBlob(blob, fileName)
    //         }
    //       })
    // },
    download() {   // 下载视频
      /* eslint-disable no-undef */
      let param = {"videopath":"runs/detect/exp4","videoname":'2.mp4'}
      let config = {
        headers: {'Content-Type': 'multipart/raw'},
        responseType: 'blob'
      }
      // 添加请求头
      axios.post('http://124.70.131.56:5003/download', param, config)
          .then(res => {
              try {
                let url = window.URL.createObjectURL(res);
                let eleLink = document.createElement('a');
                eleLink.href = url;
                eleLink.download = this.fileName;
                document.body.appendChild(eleLink);
                eleLink.click();
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error('download function error!', error);
              }
          })
    },
    update(e) {   // 上传照片
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData()  // 创建form对象
      this.fileName = file.name   //  存接下来要下载的文件名
      param.append('file', file)  // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
      }
      // 添加请求头
      axios.post('http://124.70.131.56:5003/upload', param, config)
          .then(res => {
            const dict = res.data['dict']
            console.log(dict)
            this.allDataX = Object.keys(dict)
            console.log(Object.keys(dict).length+"that is length\n")
            for(let i = 0; i < Object.keys(dict).length; i++) {
              this.allDataX[i] = this.allDataX[i]/50
            }
            let newFCPY = []
            let newFCEY = []
            let newMY = []
            let newHY = []
            for(let key in dict) {
              let dict_deep = dict[key]
              newFCPY.push((parseInt(dict_deep['person'])?parseInt(dict_deep['person']):0))
              console.log(" newfcpy\n")
              newFCEY.push((parseInt(dict_deep['eCycle'])?parseInt(dict_deep['eCycle']):0))
              newMY.push((parseInt(dict_deep['umb1'])?parseInt(dict_deep['umb1']):0)+(parseInt(dict_deep['umb2'])?parseInt(dict_deep['umb2']):0)+(parseInt(dict_deep['umb3'])?parseInt(dict_deep['umb3']):0))
              newHY.push((parseInt(dict_deep['eCycle'])?parseInt(dict_deep['eCycle']):0)-(parseInt(dict_deep['helmet'])?parseInt(dict_deep['helmet']):0))
              // for(let key_deep in dict_deep) {
              //   console.log(key_deep+': '+dict_deep[key_deep]+'\n')
              // }
            }
            this.flowChangeDataP = newFCPY
            this.flowChangeDataE = newFCEY
            this.modifiedData = newMY
            this.noHelmetData = newHY
            console.log('second: '+this.allDataX+'\n'+this.flowChangeDataP+' and '+this.flowChangeDataE)
            this.flowChangeChart()
            this.modifiedChart()
            this.noHelmetChart()
            this.typesChart()
          })

    },
    flowChangeChart(){
      let myChart = echarts.init(document.getElementById('flowChange'))
      let option = {
        grid: {
          top: '20px'
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.allDataX,
          // axisLine: {
          //   show: true
          // }
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        legend: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          },
          left: '10%',
          top: 0,
          show: true,
          data: ['人流量', '电动车流量']
        },
        series: [
          {
            name: '人流量',
            data: this.flowChangeDataP,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,  color: 'rgba(220,42,150,1)'  // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255,0)' //   0% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: '电动车流量',
            data: this.flowChangeDataE,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,  color: 'rgb(241,197,112)'  // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255,0)' //   0% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    modifiedChart() {
      let myChart = this.$echarts.init(document.getElementById('modified'))
      let option = {
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          top: '10px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.allDataX
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        series: [
          {
            data: this.modifiedData,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,  color: 'rgba(42,11,220,1)'  // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255,0)' //   0% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    offHandleChart() {
      let myChart = this.$echarts.init(document.getElementById('offHandle'))
      let option = {
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          top: '10px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.allDataX
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        series: [
          {
            data: [1, 9, 5, 8, 5, 3, 2],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,  color: 'rgba(42,11,220,1)'  // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255,0)' //   0% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    noHelmetChart() {
      let myChart = this.$echarts.init(document.getElementById('noHelmet'))
      let option = {
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          top: '10px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.allDataX
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.2)'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        series: [
          {
            data: this.noHelmetData,
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,  color: 'rgba(42,11,220,1)'  // 100% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,255,255,0)' //   0% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    typesChart() {
      let myChart = this.$echarts.init(document.getElementById('typesChart'))
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          // icon: 'triangle',
          itemWidth: 16,
          itemHeight: 16,

          left: 'center',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 66, name: '未戴头盔' },
              { value: 18, name: '非法改装' },
              { value: 20, name: '脱把骑行' },
            ]
          }
        ]
      };
      myChart.setOption(option)
    },
  },
  mounted() {
    this.flowChangeChart()
    this.modifiedChart()
    this.offHandleChart()
    this.noHelmetChart()
    this.typesChart()
  }
}
</script>

<style scoped>
#mainBox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  padding: 0.125rem 0.125rem 0;
  margin: 0 auto;
}
.column {
  flex: 3;
}
.column:nth-child(2) {
  margin: 0 0.125rem 0.1875rem;
  flex: 5;
}
.panel {
  position: relative;
  height: 3.4rem;
  border: 1px solid rgba(25, 286, 139, 0.27);
  background: url("../assets/line(1).png") rgba(255, 255, 255, 0.16);
  padding: 0 0.188rem 0.5rem;
  margin-bottom: 0.188rem;
}
#panelLong {
  height: 7.5rem;
}
.panel h2 {
  margin-top: 0.1rem;
  height: 0.6rem;
  color: white;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.28rem;
  font-weight: 600;
  letter-spacing: 4px;
}
.panel:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panel:after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: '';
}
.panelFooter {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10px;
  margin: 0;
}
.panelFooter:after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.panelFooter:before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: '';
}
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
  height: 1rem;
  margin: 0;
  letter-spacing: 4px;
}
#flowChange {
  height: 100%;
}
.video {
  border: ridge 3px rgb(69, 32, 203);
  position: absolute;
  width: 11.2rem;
  top: 3.4rem;
  left: 7rem;
}
.uploadB {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.06);
  width: 11.3rem;
  top: 12rem;
  left: 7rem;
}
.downloadB {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
  width: 3rem;
  top: 12rem;
  right: 7rem;
}
/*.video-player {*/
/*  position: absolute;*/
/*  top: 0;*/
/*  left: 0;*/
/*  height: 8rem;*/
/*  width: 5rem;*/
/*}*/
</style>
