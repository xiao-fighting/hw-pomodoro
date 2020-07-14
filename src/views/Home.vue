<template>
  <div id="home">
    <h2>{{currentText}}</h2>
    <template>
      <div>
        <radial-progress-bar :diameter="200" :completed-steps="completedSteps" :start-color="startColor" :stop-color="stopColor" :total-steps="totalSteps" :stoke-width="30" :inner-stoke-width="20">
          <!-- <img v-for="pimage in pimages" :src="pimage" width="10px"> -->
          <!-- <img :src="data.pimages" width="10px"> -->
          <img :src="'./img/nocolor.png'" id="tomotoimg" >
          <!-- <p>Total steps: {{ totalSteps }}</p> -->
          <!-- <p>Completed steps: {{ completedSteps}}</p> -->
        </radial-progress-bar>
      </div>
    </template>

    <h3>{{timetext}}</h3>
    <div>
      <b-btn variant="info" v-if="status !==1" @click=start>
        <font-awesome-icon :icon="['fas','play']" ></font-awesome-icon>
      </b-btn>
      <b-btn variant="danger" v-if="status ==1" @click="pause">
        <font-awesome-icon :icon="['fas','pause']"></font-awesome-icon>
      </b-btn>
      <b-btn variant="warning" v-if="current.length > 0 ||todos.length > 0" @click="finish(true)">
        <!-- @click="finish(true) 不會撥音樂 -->
        <font-awesome-icon :icon="['fas','step-forward']"></font-awesome-icon>
      </b-btn>
      <b-btn variant="light" class="text-primary bgmusic" size="lg" v-if="bgmusicopen" @click="bgmusicplay(false)">
        <img :src="'./img/music.png'" width="30px">
      </b-btn>
      <b-btn variant="light" class="text-primary bgmusic" size="lg" v-else @click="bgmusicplay(true)">
        <img :src="'./img/mute.png'" width="30px">
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 0 =停止,
      // 1 = 播放
      // 2 =暫停,
      status: 0,
      // 因為clearInterval 會把setInterval變數也一起清掉，所以先在此設定一個變數
      timer: 0,
      startColor: 'rgb(255,66,66)',
      stopColor: 'rgb(255,211,0)',
      bgmusicopen: false,
      audio01: new Audio()
    }
  },
  computed: {
    currentText () {
      // 目前的文字
      // this.current.length > 0表示有東西正在倒數
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有事項'
    },
    timetext () {
      // 剩餘時間文字
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} 分 ${s} 秒`
    },
    alarm () {
      return this.$store.getters.alarm
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    },
    isBreak () {
      return this.$store.getters.todos
    },
    // 讓totalSteps 等於全部的時間
    totalSteps () {
      return this.$store.getters.totaltime
    },
    // 讓全部的時間 減 剩餘時間 就是已完成的時間
    completedSteps () {
      return this.totalSteps - this.timeleft
    },
    bgmusic () {
      return this.$store.getters.bgmusic
    }
  },
  methods: {
    start () {
      // 當狀態不是停止的時候，會顯示撥放鍵，按下按鈕，觸發開始事件
      // 所以要判斷兩種狀態 停止 或暫停
      // 判斷 現在的狀態是 暫停的話
      // 暫停後繼續
      if (this.status === 2) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= 0) {
            // finish(skip==false)
            this.finish(false)
          }
        }, 1000)
      } else {
        // 開始新倒數，狀態是停止 status =0時
        // 如果有事項
        if (this.todos.length > 0) {
          // 把會動到的狀態交給 vuex 的mutation 去管理，呼叫mutation
          this.status = 1
          this.timer = setInterval(() => {
            this.$store.commit('countdown')
            if (this.timeleft <= 0) {
              // finish(skip=false)
              this.finish(false)
            }
          }, 1000)
          this.$store.commit('start')
        }
      }
    },
    finish (skip) {
      // 是否是跳過skip == ture(結束倒數)
      // 或是 倒數完 就是結束
      //  跳過 skip==ture 就是跳過； skip==false 就是一般的結束
      // 這兩種的結果是一樣的
      clearInterval(this.timer)
      // 狀態為 停止
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        // 如果不是跳過，要撥放鈴聲
      //  當鈴聲響起時，背景音樂要暫停
        this.audio01.pause()
        this.bgmusicopen = false
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
        // 下列程式碼沒有成功，但是 alert()則成功
        // Uncaught TypeError: Cannot read property 'play' of undefined
        // audio.onended = function () {
        //   setTimeout(() => {
        //     this.audio.play()
        //   }, 100)
        // }
      }

      if (this.todos.length > 0) {
        this.start()
      } else {
        setTimeout(() => {
          alert('恭喜~ 事情做完了~')
        }, 100)
      }
    },
    pause () {
      clearInterval(this.timer)
      this.status = 2
    },
    bgmusicplay (play) {
      if (this.bgmusicopen === false) {
        this.bgmusicopen = true
        this.audio01.loop = true
        this.audio01.play()
      } else {
        this.bgmusicopen = false
        this.audio01.pause()
      }
    }

  },
  mounted () {
    this.audio01.src = './alarms/' + this.bgmusic
  }

}
</script>
