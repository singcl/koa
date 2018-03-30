
/**
 * 自定义response对象，该对象将作为原型对象使用
 * 在Object.create(response) 中作为原型对象生成一个对象实例
 * 所以该对象中的this 始终指向对象实例
 * 查看Application 中的createContext方法就更加命名this.res = res(node原生的res)
 * @this 对象实例
 */
const response = {
    // ES5 getter/setter 定义一个对象属性 注意这是一个属性而不是一个方法
    
    get body() {
        return this._body
    },

    /**
     * 设置返回给客户端的body内容
     * @param {*} data body内容
     */
    set body(data) {
        return this._body = data
    },

    get status() {
        return this.res.statusCode
    },

    /**
     * 设置返回给客户端的stausCode
     * @param {Number} statusCode 状态码
     */
    set status(statusCode) {
        if (typeof statusCode !== 'number') {
            throw new TypeError('statusCode must be a number')
        }
        this.res.statusCode = statusCode
    }
}

module.exports = response
