import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  // 狀態的預設值
  state: {
    // 代辦事項
    todos: [],
    // 剩餘時間
    // 如果 key值跟變數名稱一樣，不用寫變數
    timeleft,
    // 使用者可以選擇鈴聲
    // 預設鈴聲
    alarm: '直到世界的盡頭.mp3',
    // 目前在倒數的東西(事項，或是休息)
    current: '',
    // 是否在休息中
    isBreak: false,
    bgmusicopen: false,
    bgmusic: 'river_Flows_in_You.mp3'
  },
  // 獲取資料的 function
  getters: {
    alarm (state) {
      return state.alarm
    },
    todos (state) {
      return state.todos
    },
    timeleft (state) {
      return state.timeleft
    },
    current (state) {
      return state.current
    },
    isBreak (state) {
      return state.isBreak
    },
    // 全部時間
    totaltime (state) {
      return state.isBreak ? timeleftBreak : timeleft
    },
    bgmusic (state) {
      return state.bgmusic
    }
  },
  // 修改狀態的 function
  mutations: {
    // 修改 state.alarm
    selectAlarm (state, data) {
      state.alarm = data
    },
    addTodo (state, data) {
      state.todos.push({ name: data, edit: false, model: data })
    },
    dragTodo (state, data) {
      state.todos = data
    },
    delTodo (state, data) {
      state.todos.splice(data, 1)
    },
    editTodo (state, data) {
      // 預設edit =false
      state.todos[data].edit = !state.todos[data].edit
    },
    cancelTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    saveTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    start (state) {
      // 沒有要傳值進來
      // 開始 ，由mutation 來判斷
      // 如果我是休息中的話，要執行休息的5分鐘
      // 如果不是休息中的話，要執行倒數25分鐘
      if (state.isBreak) {
        // 休息中
        state.current = '休息一下，起來走路'
      } else if (!state.isBreak) {
        // (如果不是休息中(isBreak = false)) 且 有事項
        state.current = state.todos[0].name
        // .splice(開始數字, 刪除數量, 新值1, 新值2...)
        state.todos.splice(0, 1)
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (state.todos.length > 0) {
        // 如果倒數完後還有事項，則 isBreak 會打開或關掉
        state.isBreak = !state.isBreak
        // 如果是一項事件做完後，進入到休息中(isBreak = true)，會進去到mutation的 start() 會出現 休息一下
        // 休息完後再檢查 todos有沒有東西，若有東西的話，把isBreak= false
      }
      state.current = ''
      // 判斷是否為休息狀態
      state.timeleft = state.isBreak ? timeleftBreak : timeleft
    }
  },
  // 修改狀態的 function，支援 async
  actions: {
  },
  // 將 Vuex 模組化分割
  modules: {
  },
  plugins: [createPersistedState()]

})
