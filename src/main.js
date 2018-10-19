import Vue from 'vue'
import App from './App.vue'
import ML from './ml.js'
Vue.use(ML)
// import test from './test.js'
// Vue.use(test)
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  created(){
    let o = {
      ch:{
        name:"黄泽平",
        age : 18 ,
        height : 190
      },
      en:{
        name:"hazzy",
        age : 18 ,
        height : 190
      }
    }
    this.$ml.default_config("ch",o)
  }
})