var ML = {}
ML.install = function (Vue, options) {
  class $ml {
    constructor(_val, _kind = "ch", _obj = {}) {
      this._val = _val
      this._kind = _kind;
      this._obj = _obj;
      this.lock = new Proxy({
        default_lock : false
      },{
        get:function(val){
          return val
        },
        set:function(val){
        }
      }) // 在此操作做个锁是为了保证 用户必须仙设定 默认配置 （初始化）
    }
    // 默认语言配置 （初始化）
    default_config(_kind = "ch", _obj) {
      let _language_kinds = this.verify_library(_obj)
      let _verify_language = this.verify_language(_kind, _language_kinds)
      _verify_language.then((val) => {
        this.lock = true
        return Promise.resolve()
      })
    }
    // 传值
    ML(_val) {
      this._val = _val
      if (this.lock) {
          return this.search_language(this._val,this._kind,this._obj)
          // console.log(this.search_language(this._val,this._kind,this._obj))
          // console.log(1, _val)
          // console.log(2, this._kind)
          // console.log(3, this._obj)
          
        
      } else {
        new Error('请先初始化')
      }
    }
    // 搜索语言库 找出对应 值
    search_language(_val,_kind,_obj){
        for(let item in _obj[_kind]){
          if(_obj[_kind][item] == _val){
            return(_obj[_kind][item])
          }
        }
    }
    // 切换语言
    cut_language(_val,_kind,_obj){
      for(let item in _obj[this._kind]){
        if(_obj[this._kind][item] == _val){
          return _obj[_kind][item]
        }
      }
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
        for (let key of _language_kinds) {
          if (key === _kind) {
            this._kind = _kind
            return Promise.resolve(_kind)
          } else {
            return Promise.reject('语言类型要与你的语言库的key相匹配')
          }
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
  Vue.prototype.$ml = new $ml()

}
module.exports = ML;