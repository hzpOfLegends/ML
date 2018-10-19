<template>
  <div id="app">
    <h1>{{$ml.ML("黄泽平")}}</h1>
    <!-- <h2>{{$test.a("123")}}</h2> -->
    <button @click="set">修改</button>
  </div>
</template>

<script>
import ch from './ch'
import en from  './en'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a:''
    }
  },

  created(){
    
  },
  methods:{
    set(){
      this.$ml.set_language("en")
      // this.$t('mes.as')
      // console.log(this.$ml.ML('黄泽平'))
      console.log(void 0)
    }
  },
  mounted(){
    // this.a =  
    // console.log(2,this.$ml.ML(190))
    // let a = {
    //   ch ,
    //   en
    // }
    // this.$ml.set_language("ch")
    // console.log(this.$ml.verify_library({
    //   ch:{},
    //   en:{},
    //   fh:{},
    //   ch:{}
    // }))
    // this.$ml.prop_value("hzp")
    // this.$ml.ML("你好")
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
