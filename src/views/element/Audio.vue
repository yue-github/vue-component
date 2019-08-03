<template>
  <div style="height:100vh;overflow:hidden">
    <div class="buffer-main">
      <img :src="boo_buffer?require('@/assets/buffer.gif'):''" class="buffer" alt />
    </div>
    <div class="img-main">
      <img
        :src="boo_img?require('@/assets/chou.b9e2549d.gif'):require('@/assets/me.png')"
        :class="boo_img?'img-me':'img-me-o'"
        alt
      />
    </div>
    <div v-if="boo">
      <div class="di main-wrap audio-main" v-loading="audio.waiting">
        <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
        <audio
          ref="audio"
          class="dn1"
          :src="url"
          :preload="audio.preload"
          @play="onPlay"
          @error="onError"
          @waiting="onWaiting"
          @pause="onPause"
          @timeupdate="onTimeupdate"
          @durationchange="onLoadedmetadata"
          loop="loop"
        ></audio>
        <div class="button-main">
          <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
          <el-button v-show="!controlList.noSpeed" type="text">{{message}}</el-button>
          <el-tag type="info" class="audio-time">{{ audio.currentTime | formatSecond}}</el-tag>
          <div
            @touchstart="pausePlay"
            @touchend="AstartPlay"
            style="background:red;height:1px;display:flex;align-items: center"
          >
            <el-slider
              v-show="!controlList.noProcess"
              v-model="sliderTime"
              :format-tooltip="formatProcessToolTip"
              @change="changeCurrentTime"
              class="slider"
            ></el-slider>
          </div>
          <el-tag type="info" class="audio-time">{{ audio.maxTime | formatSecond }}</el-tag>

          <el-button
            v-show="!controlList.noMuted"
            type="text"
            @click="startMutedOrNot"
            class="music-main"
            size="mini"
          >
            {{audio.muted | transMutedOrNot}}
            <span :class="musicLogo"></span>
          </el-button>

          <el-slider
            v-show="!controlList.noVolume"
            v-model="volume"
            :format-tooltip="formatVolumeToolTip"
            @change="changeVolume"
            class="slider"
          ></el-slider>

          <a
            :href="url"
            download
            v-show="!controlList.noDownload"
            target="_blank"
            class="download"
          >下载</a>
        </div>
      </div>
    </div>
    <div v-if="!boo">
      <div class="di main-wrap audio-main" v-loading="audio.waiting">
        <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
        <audio
          ref="audio"
          class="dn1"
          :src="url"
          :preload="audio.preload"
          @play="onPlay"
          @error="onError"
          @waiting="onWaiting"
          @pause="onPause"
          @timeupdate="onTimeupdate"
          @durationchange="onLoadedmetadata"
          loop="loop"
        ></audio>
        <div class="button-main">
          <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
          <el-button v-show="!controlList.noSpeed" type="text">{{message}}</el-button>
          <el-tag type="info" class="audio-time">{{ audio.currentTime | formatSecond}}</el-tag>
          <div
            @mousedown="pausePlay"
            @mouseup="AstartPlay"
            style="background:red;height:1px;display:flex;align-items: center"
          >
            <el-slider
              v-show="!controlList.noProcess"
              v-model="sliderTime"
              :format-tooltip="formatProcessToolTip"
              @change="changeCurrentTime"
              class="slider"
            ></el-slider>
          </div>

          <el-tag type="info" class="audio-time">{{ audio.maxTime | formatSecond }}</el-tag>

          <el-button
            v-show="!controlList.noMuted"
            type="text"
            @click="startMutedOrNot"
            class="music-main"
            size="mini"
          >
            {{audio.muted | transMutedOrNot}}
            <span :class="musicLogo"></span>
          </el-button>

          <el-slider
            v-show="!controlList.noVolume"
            v-model="volume"
            :format-tooltip="formatVolumeToolTip"
            @change="changeVolume"
            class="slider"
          ></el-slider>

          <a
            :href="url"
            download
            v-show="!controlList.noDownload"
            target="_blank"
            class="download"
          >下载</a>
        </div>
      </div>
    </div>
    <div class="visit">
      <span>访问量:&nbsp;{{visitData}}</span>
    </div>
    <div class="fire">
      <img :src="fire_boo?require('@/assets/fire.gif'):''" alt class="fire-img" />
    </div>
    <audio :src="pay_music" ref="pay" class="zhifubao"></audio>
  </div>
</template>

<script>
function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0";
  }
}
export default {
  name: "VueAudio",
  data() {
    return {
      cancelLoading:0,
      fullscreenLoading:false,
      message: "岳",
      boo_buffer: true,
      pay_music: "https://coral3.com/audio/pay.mp3",
      fire_boo: true,
      visitData: "加载中...",
      boo_img: true,
      boo: true,
      formatIndex: 0,
      musicLogo: "fa fa-volume-down change-margin",
      theControlList: "onlyOnePlaying",
      url: "https://coral3.com/audio/love_is_sad.mp3",
      // 参考参数数组
      audioss: [
        {
          url: "",
          controlList: "onlyOnePlaying"
        },
        {
          url: "",
          controlList: "noDownload noMuted onlyOnePlaying"
        },
        {
          url: "",
          controlList: "noDownload noVolume noMuted onlyOnePlaying"
        },
        {
          url: "",
          controlList: "noDownload noSpeed onlyOnePlaying"
        }
      ],
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1,
        waiting: true,
        preload: "auto"
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
    };
  },
  methods: {
    
    changeImgBoo() {
      this.boo_img = !this.boo_img;
    },
    AstartPlay() {
    
      // this.cancelLoading=0;
      this.boo_img = false;
      this.startPlay();
    },
    setControlList() {
      let controlList = this.theControlList.split(" ");
      controlList.forEach(item => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },
    // 改变加速
    changeSpeed() {
      let index = this.speeds.indexOf(this.audio.speed) + 1;
      this.audio.speed = this.speeds[index % this.speeds.length];
      this.$refs.audio.playbackRate = this.audio.speed;
    },
    startMutedOrNot() {
      if (this.musicLogo == "fa fa-volume-down change-margin") {
        this.musicLogo = "fa fa-volume-off change-margin";
      } else {
        this.musicLogo = "fa fa-volume-down change-margin";
      }
      this.$refs.audio.muted = !this.$refs.audio.muted;
      this.audio.muted = this.$refs.audio.muted;
    },
    // 音量条toolTip
    formatVolumeToolTip(index) {
      return "音量条: " + index;
    },
    // 进度条toolTip
    formatProcessToolTip(index) {

      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
    // 音量改变
    changeVolume(index = 0) {
      this.$refs.audio.volume = index / 100;
      this.volume = index;
    },
    // 播放跳转
    changeCurrentTime(index) {
      this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    startPlayOrPause() {
      this.changeImgBoo();
      return this.audio.playing ? this.pausePlay() : this.startPlay();
    },
  
    // 开始播放
    startPlay() {
      this.$refs.audio.play();
    },
    // 暂停
    pausePlay() {
      this.$refs.audio.pause();
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    // 当发生错误, 就出现loading状态
    onError() {
      this.audio.waiting = true;
    },
    // 当音频开始等待
    onWaiting(res) {
      this.audio.waiting=true;
      this.$refs.audio.play();
    },
    // 当音频开始播放
    onPlay(res) {
      this.audio.playing = true;
      this.audio.waiting=false;
      if (!this.controlList.onlyOnePlaying) {
        return;
      }
      let target = res.target;
      let audios = document.getElementsByClassName("dn1");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.waiting=false;
      if(this.loading) this.loading.close();
      this.audio.currentTime = res.target.currentTime;
      let currentTime=parseInt(this.audio.currentTime);
      if(currentTime>=this.audio.maxTime&&(this.saveCurrentTime+2)<this.audio.maxTime){
          this.$refs.audio.currentTime=this.saveCurrentTime;
          this.$refs.audio.play();
      }else{
        this.saveCurrentTime=this.audio.currentTime;
      }
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
        this.audio.waiting=false;
        let duration=this.$refs.audio.duration;
        this.audio.maxTime = parseInt(duration);
    }
  },
  filters: {
    formatSecond(second) {
      second = second ? second : 0;
      return realFormatSecond(second);
    },
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    transMutedOrNot(value) {
      return value ? "放音" : "静音";
    },
    transSpeed(value) {
      return "快进: x" + value;
    }
  },
  created() {
      this.setControlList();
  },
  mounted() {
    // 获取title
    this.$axios.post("https://coral3.com/yes/public/api/getTitle", {
          name: "吴同岳"
        })
        .then(res => {
          const data=res.data;
          document.title=data.title;
          this.url=data.url;
        });
    // document.getElementsByClassName('dn1')[0].play();
    this.$refs.pay.addEventListener(
      "ended",
      res => {
        this.changeVolume(100);
      },
      false
    );
    if (window.screen.availWidth > 768) {
      this.boo = false;
    } else {
      this.boo = true;
    }
    // 实时通讯
    this.ws = new WebSocket("ws:129.28.195.187:2333?user_id=1");
    this.ws.onopen = res => {
      this.ws.send("add visit");
      console.log("连接成功");
    };
    this.ws.onerror = () => {
      this.$axios
        .post("https://coral3.com/yes/public/api/testEnter", {
          name: "吴同岳"
        })
        .then(res => {
          console.log(res);
          this.visitData = res.data[0].visit_count;
        });
      console.log("连接失败");
    };
    this.ws.onmessage = res => {
      this.changeVolume(30);
      this.$refs.pay.play();
      // 画图gif停止
      this.fire_boo = true;
      setTimeout(res => {
        this.fire_boo = false;
      }, 5000);
      if (res.data[0] == "[" && res.data[1] == "{") {
        this.visitData = JSON.parse(res.data)[0].visit_count;
        console.log(this.visitData);
      } else {
        this.$axios
          .post("https://coral3.com/yes/public/api/testEnter", {
            name: "吴同岳"
          })
          .then(res => {
            console.log(res);
            this.visitData = res.data[0].visit_count;
          });
      }
    };
    this.ws.onclose = res => {
      console.log("连接断开");
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap {
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
  color: #409eff;
}
.dn1 {
  display: none;
}
.audio-main {
  width: 100%;
  /*height:500px;*/
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*可自定义*/
.button-main {
  width: 1000px;
  /*height:80px;*/
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-radius: 5px;
}
.audio-time {
  padding-top: 2px;
  background: #409eff;
  color: #fff;
}
.change-margin {
  margin-left: 3px;
}
.music-main {
  width: 80px;
  background: #409eff;
  color: #fff;
  border-radius: 5px;
}
.img-main {
  width: 100%;
  height: 233px;
  background: #fff;
  display: flex;
  justify-content: center;
}
.img-me {
  width: 300px;
  /* opacity:0.1; */
}
.img-me-o {
  width: 300px;
  opacity: 0.1;
}
.visit {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  color: #409eff;
}
.fire {
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px;
}
.fire-img {
  height: 200px;
}
.buffer-main {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 233px;
  overflow: hidden;
}
.buffer {
  width: 300px;
}
 
</style>