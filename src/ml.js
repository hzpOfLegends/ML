var ML = {}
ML.install = function (Vue, options) {
  // vue 实例
  let V = new Vue({data:{_kind:"",_message:[],_library:{}}})
  class $ml {
    constructor(_val, _kind = "ch", _obj = {}) {
      this._val = _val
      this._kind = _kind
      this._obj = _obj 
      this.lock = false // 在此操作做个锁是为了保证 用户必须仙设定 默认配置 （初始化）
      this.change = false // 此处用于初始值 和 修改值的判断
    }
    // 默认语言配置 （初始化）
    default_config(_kind = "ch", _obj) {
      let _language_library = this.verify_library(_obj)
      if(_language_library){
        this._obj = _obj
        if(this.verify_language(_kind, _language_library)){
          this._kind = _kind
          V.$set(V.$data,'_library',this._obj)
        }
      }
    }
    // 传值
    ML(_val) {
      this._val = _val
      if(this.change){
        return  V.$data._message
      }else{
        
        // console.log(this._obj[this._kind][this.search_language(this._val,this._kind,this._obj)] )
        let returnVal = this._obj[this._kind][this.search_language(this._val,this._kind,this._obj)] 
        if(this.prevent_n_update(V.$data._message,returnVal)){
          V.$data._message.push(returnVal)
          let _message_length = V.$data._message.length
          return V.$data._message[_message_length-1]
        }
      }
    }
    // 防止组件呈现函数中可能有无限的更新循环
    prevent_n_update(val,substance){
      if(val.length>0){
        for(let i = 0 ; i<val.length ; i++ ){
          if(val[i] === substance){
            return false
          }else{
            return true
          }
        }
      }else{
        return true
      }
    }
    // 搜索语言库 找出对应 值
    search_language(_val,_kind,_obj){
      for(let i = 0 ; i < _obj[_kind].length ; i++){
        if(_obj[_kind][i] === _val){
          return i
        }
      }
      // for(let item in _obj[_kind]){
      //   if(_obj[_kind][item] == _val){
      //     let keyValue = new Map()
      //     let o = {}
      //     keyValue.set(item,_obj[_kind][item])
      //     o = {keyValue,item}
      //     return o
      //   }
      // }
    }
    // 切换语言
    cut_language(_val,_kind,_obj){
      for(let item in _obj[this._kind]){
        if(_obj[this._kind][item] == _val){
          this.change = true 
          V.$set(V,'_message',_obj[_kind][item])
        }
      }
    }
    // 用户设置语言种类
    set_language(_kind) {
      // console.log(11,this.search_language(this._val,_kind,this._obj))
      this._val = this.cut_language(this._val,_kind,this._obj)
      this._kind = _kind
      this.change = true 
      this.ML(this._val)
    }
    // 验证用户传入的语言与他传入的语言库 是否配对
    verify_language(_kind, _language_library) {
      if (_kind && _language_library) {
        typeof _kind === "string" ? _kind : String(_kind)
          if (_language_library.has(_kind)) {
            this._kind = _kind
            return _kind
          } else {
            return new Error ('语言类型要与你的语言库的key相匹配')
          }
      } else {
        new Error('verify_language is error')
      }
    }
    // 验证用户传入的语言库 是否规范
    verify_library(_obj) {
      typeof _obj === "object" ? _obj : ''
      let _obj_key = []
      let _obj_assign = Object.assign({}, _obj)
      let _obj_set;
      if (_obj_assign) {
        for (let key in _obj_assign) {
          _obj_key.push(key)
          if (typeof _obj_assign[key] !== "object") {
            return new Error('语言库中的key的value 必须是对象')
          }

        }
        // this._obj = new Map()
        for (let i = 0; i < _obj_key.length; i++) {
          this._obj[_obj_key[i]] = _obj[_obj_key[i]]
        }
        return new Set(_obj_key)
        // 此处用set集合是为了 防止用户重复写入 语言库的 key ， 如果重复写key则 自动删除
      } else {
        new Error('请传入语言库')
      }
    }
  }
  
  Vue.directive('ml',{
    bind:function(el, binding, vnode){
      console.log(el,binding,vnode)
    },
    update:function(el, binding, vnode){
      console.log(el,binding,vnode)
    },
  })
  Vue.prototype.$ml = new $ml()
  // Vue.prototype.$m
  // Object.defineProperty(Vue.prototype,'$t',{
  //   get:function get(val){
  //     return function(val){
  //       a.$set(a,'body',this.$ml.test.a)
  //       console.log()

  //     }
  //   }
  // })
}
module.exports = ML;