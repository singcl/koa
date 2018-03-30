const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context-hoc')

// Application Class private method name
const callback = Symbol('callback')
const createContext = Symbol('createContext')
const responseBody = Symbol('responseBody')

/**
 * KOA app class
 * @class Application
 */
class Application {
    constructor() {
        this.callbackFunc
        this.context = context
        this.request = request
        this.response = response
    }

    /**
     * 类私有方法
     * 针对每个请求，都要创建ctx对象实例
     * @param {Object} req      原生的node req对象实例 
     * @param {Object} res      原生的node res对象实例
     * @memberof Application
     * @return ctx
     */
    [createContext](req, res) {
        // 针对每个请求，都要创建ctx对象实例
        const ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.request.req = req
        ctx.response.res = res
        ctx.req = req
        ctx.res = res
        return ctx
    }

    /**
     * 类私有方法
     * 返回客户端的内容
     * @param {Object} ctx ctx实例
     * @memberof Application
     */
    [responseBody](ctx) {
        const content = ctx.body
        if (typeof content === 'string') {
            ctx.res.end(content)
        } else if (typeof content === 'object') {
            ctx.res.end(JSON.stringify(content))
        }
    }

    /**
     * 类私有方法
     * 闭包返回http.createServer()的 callback参数
     * @returns {Function} http.createServer()的 callback参数
     * @memberof Application
     */
    [callback]() {
        return (req, res) => {
            const ctx = this[createContext](req, res)
            const respond = () => this[responseBody](ctx)
            // 这就要求this.callbackFunc(ctx)的返回值是一个thenable对象
            // Promise/Async 函数都是thenable对象
            this.callbackFunc(ctx).then(respond)
        }
    }

    // 原型方法listen 启动http server
    listen(...args) {
        const server = http.createServer(this[callback]())
        server.listen(...args)
    }

    /**
     * 挂载中间件， 中间件的雏形
     * @param {Function} fn 中间件的雏形
     * @memberof Application
     */
    use(fn) {
        this.callbackFunc = fn
    }
}

//
module.exports = Application
