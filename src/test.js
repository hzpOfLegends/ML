var test = {}
test.install = function (Vue, options) {
    class $test {
        a(val){
            return val
        }
    }
    Vue.component("test", {
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'span'
            },
            path: {
                type: String,
                required: true
            },
            locale: {
                type: String
            },
            places: {
                type: [Array, Object]
            }
        },
        render:function render(h,ref){
            return h('h'+'你好')
            console.log(ref)
        }
    })
    Vue.directive('ml', {
        bind: function (el, binding, vnode) {
            console.log(el, binding, vnode)
        },
        update: function (el, binding, vnode) {
            console.log(el, binding, vnode)
        },
    })
    Vue.prototype.$test = new $test()

}
module.exports = test;