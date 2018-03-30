/**
 * 最终的一个引用关系：
 * context 原型对象
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.request.req = req;
    ctx.response.res = res;
    ctx.req = req;
    ctx.res = res;
 */

// context 原型对象
const context = {}

/**
 * 代理设置对象的getter
 * 
 * @param {Object} property request/response 对象实例 
 * @param {String} name     属性名
 */
function delegateGet(property, name) {
    context.__defineGetter__(name, function() {
        return this[property][name]
    })
}

/**
 * 代理设置对象的setter
 * 
 * @param {Object} property request/response 对象实例 
 * @param {String} name     属性名
 */
function delegateSet(property, name) {
    context.__defineSetter__(name, function(val) {
        this[property][name] = val
    })
}

// 新的request 代理属性直接添加在数组中
const requestSet = []
const requestGet = ['query']

// 新的response 代理属性直接添加在数组中
const responseSet = ['body', 'status']
const responseGet = responseSet

requestSet.forEach(item => delegateSet('request', item))
requestGet.forEach(item => delegateGet('request', item))

responseSet.forEach(item => delegateSet('response', item))
responseGet.forEach(item => delegateGet('response', item))

module.exports = context
