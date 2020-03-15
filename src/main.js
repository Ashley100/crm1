import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter'
import messagePlugin from "@/utils/message.plugin"
import './registerServiceWorker'
import "materialize-css/dist/js/materialize.min.js"

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'





Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.config.productionTip = false

Vue.filter('date', dateFilter)



// FireBase initialize
firebase.initializeApp({
  apiKey: "AIzaSyC7_3GrSeLW1wHWriKOXm1QHOdfSmwzNgI",
  authDomain: "px-crm.firebaseapp.com",
  databaseURL: "https://px-crm.firebaseio.com",
  projectId: "px-crm",
  storageBucket: "px-crm.appspot.com",
  messagingSenderId: "7169362932",
  appId: "1:7169362932:web:635dc711ad8a61083607a1",
  measurementId: "G-M73H33M4M7"
})



let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

