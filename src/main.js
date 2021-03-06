import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/style.styl'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 根據 icon 的種類引用
import { faCheckCircle, faPencilAlt, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faCog, faPlusCircle, faHome } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'
import RadialProgressBar from 'vue-radial-progress'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueGtag from 'vue-gtag'

library.add(faCheckCircle, faPencilAlt, faTimes, faUndo, faSave, faPlay, faPause, faStepForward, faPlusCircle, faCog, faHome)
// 註冊元件
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('draggable', draggable)
Vue.component('RadialProgressBar', RadialProgressBar)

Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(VueGtag, {
  config: { id: 'UA-168207740-1' }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
