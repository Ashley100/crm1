import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter'
import messagePlugin from "@/utils/message.plugin"
import './registerServiceWorker'
import "materialize-css/dist/js/materialize.min.js"





Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
