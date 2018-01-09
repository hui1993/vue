// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import AV from 'leancloud-storage'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { App }
})

var APP_ID = 'gMqHbvjC00aY1zkrKJHCNeeh-gzGzoHsz'
var APP_KEY = 'bt4pjKj4p3zrsb5EhlozOTU6'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

