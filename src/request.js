const url = require('url')

/**
 * 自定义request对象，该对象将作为原型对象使用
 * 在Object.create(request) 中作为原型对象生成一个对象实例
 * 所以该对象中的this 始终指向对象实例
 * @this 对象实例
 */
const request = {
    // ES5 getter/setter 定义一个对象属性 注意这是一个属性而不是一个方法
    get query() {
        return url.parse(this.req.url, true).query
    }
}

module.exports = request
