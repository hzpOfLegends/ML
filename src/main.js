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
      ch:['黄泽平','18','篮球'],
      en:['hazzy','18','basketball']
    }
    this.$ml.default_config("ch",o)
  }
})