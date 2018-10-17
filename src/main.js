import Vue from 'vue'
import App from './App.vue'
import ML from './ml.js'
Vue.use(ML)

// 
new Vue({
  el: '#app',
  render: h => h(App),
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