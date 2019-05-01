<template>
  <div>
  <div class="di main-wrap audio-main" v-loading="audio.waiting">
    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
    <audio ref="audio" class="dn" 
    :src="url" :preload="audio.preload"
    @play="onPlay" 
    @error="onError"
    @waiting="onWaiting"
    @pause="onPause" 
    @timeupdate="onTimeupdate" 
    @loadedmetadata="onLoadedmetadata"
    ></audio>
    <div class="button-main">
      <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
      <el-button v-show="!controlList.noSpeed" type="text" @click="changeSpeed">{{audio.speed | transSpeed}}</el-button>

      <el-tag type="info" class="audio-time">{{ audio.currentTime | formatSecond}}</el-tag>
      <div @mousedown="pausePlay" @mouseup="AstartPlay" style="background:red;height:1px;display:flex;align-items: center">
         <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" v-on:change="changeCurrentTime" class="slider"></el-slider>
      </div>
      
      <el-tag type="info" class="audio-time">{{ audio.maxTime | formatSecond }}</el-tag>

      <el-button v-show="!controlList.noMuted" type="text" @click="startMutedOrNot" class="music-main" size="mini">{{audio.muted | transMutedOrNot}}<span :class="musicLogo"></span></el-button>

      <el-slider v-show="!controlList.noVolume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider"></el-slider>
      
      <a :href="url" download v-show="!controlList.noDownload" target="_blank" class="download">下载</a>
    </div>
  </div>
  </div>
</template>

<script>
  function realFormatSecond(second) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60
      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }
  export default {
    name: 'VueAudio',
    data() {
      return {
        formatIndex:0,
        musicLogo:'fa fa-volume-down change-margin',
        theControlList:'onlyOnePlaying',
        url:  'https://gdmzd.com/audio/tian.mp3',
        // 参考参数数组
        audioss: [
        {
          url: './static/falling-star.mp3',
          controlList: 'onlyOnePlaying'
        },
        {
          url: './static/falling-star.mp3',
          controlList: 'noDownload noMuted onlyOnePlaying'
        }, {
          url: './static/falling-star.mp3',
          controlList: 'noDownload noVolume noMuted onlyOnePlaying'
        }, {
          url: './static/falling-star.mp3',
          controlList: 'noDownload noSpeed onlyOnePlaying'
        }
        ],
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: false,
          muted: false,
          speed: 1,
          waiting: true,
          preload: 'auto'
        },
        sliderTime: 0,
        volume: 100,
        speeds: [1, 1.5, 2],
        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    methods: {
      AstartPlay(){
        this.startPlay();
      },
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if(this.controlList[item] !== undefined){
            this.controlList[item] = true
          }
        })
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        if(this.musicLogo=='fa fa-volume-down change-margin'){
          this.musicLogo='fa fa-volume-off change-margin'
        }else{
          this.musicLogo='fa fa-volume-down change-margin'
        }
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)

        
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
         this.startPlay()
      },
      // 当音频开始播放
      onPlay (res) {
        console.log(res)
        this.audio.playing = true
        this.audio.loading = false
        if(!this.controlList.onlyOnePlaying){
          return 
        }
        let target = res.target
        let audios = document.getElementsByTagName('audio');
        [...audios].forEach((item) => {
          if(item !== target){
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('122323qqq')
        // console.log('timeupdate')
        // console.log(res)
       
        // console.log(this.formatIndex+'()()()(')
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)

      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false
        this.audio.maxTime = parseInt(res.target.duration)
        console.log(this.audio.maxTime)
      }
    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      transMutedOrNot(value) {
        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    created() {
      this.setControlList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap{
  padding: 10px 15px;
}
.slider {
  /*display: inline-block;*/
  width: 200px;
  position: relative;
  /*margin-left: 15px;*/
}
.di {
  display: inline-block;
}
.download {
  color: #409EFF;
}
.dn{
  display: none;
}
.audio-main{
  width:100%;
  height:500px;
  background:#F0F0F0;
  display:flex;
  align-items: center;
  justify-content: center;
}
/*可自定义*/
.button-main{
  width:1000px;
  height:80px;
  background:#fff;
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:0 30px;
  border-radius:5px;

}
.audio-time{
  padding-top:2px;
  background:#409EFF;
  color:#fff;
}
.change-margin{
  margin-left:3px;
}
.music-main{
  width:80px;
  background:#409EFF;
  color:#fff;
  border-radius:5px;
}
</style>