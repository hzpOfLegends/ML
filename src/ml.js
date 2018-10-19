var ML = {}
ML.install = function (Vue, options) {
  let a = new Vue({data:{body:"123"}})
  class $ml {
    constructor(_val, _kind = "ch", _obj = {}) {
      this._val = _val
      this._kind = _kind
      this._obj = _obj 
      this.lock = false // 在此操作做个锁是为了保证 用户必须仙设定 默认配置 （初始化）
      this.test = {}
    }
    // 默认语言配置 （初始化）
    default_config(_kind = "ch", _obj) {
      let _language_kinds = this.verify_library(_obj)
      this.verify_language(_kind, _language_kinds)
      // _verify_language.then((val) => {
      //   this.lock = true
      //   return Promise.resolve()
      // })
      this.test = new Proxy({a:1},{
        get:function(val){
          return val
        },
        set:function(val){
          a.body = val
        }
      })
    }
    // 传值
    ML(_val) {
      this._val = _val
      // return this.search_language(this._val,this._kind,this._obj)
      console.log(a)
      return a.body
    }
    // 搜索语言库 找出对应 值
    search_language(_val,_kind,_obj){
      // 此处_obj["ch"] 必须用户输入中文 然后根据 _type 来修改  --待修改
      for(let item in _obj["ch"]){
        if(_obj["ch"][item] == _val){
          return this._obj[this._kind][item]
        }
      }
    }
    // 切换语言
    cut_language(_val,_kind,_obj){
      a.$set(a,'body',3)
      console.log(1,a)
      this.ML()
      // for(let item in _obj[this._kind]){
      //   if(_obj[this._kind][item] == _val){
      //     return _obj[_kind][item]
      //   }
      // }
    }
    set_language(_kind) {
      // console.log(11,this.search_language(this._val,_kind,this._obj))
      this._val = this.cut_language(this._val,_kind,this._obj)
      this._kind = _kind
      this.ML(this._val)
    }
    // 验证用户传入的语言与他传入的语言库 是否配对
    verify_language(_kind, _language_kinds) {
      if (_kind && _language_kinds) {
        typeof _kind === "string" ? _kind : String(_kind)
          if (_language_kinds.has(_kind)) {
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
    prop_value(value) {
      this.set_language().then(val => {

      })
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