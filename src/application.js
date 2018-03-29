// 主线一 封装node http Server: 从hello world说起
const http = require('http')

/* // 创建一个原生的server app

const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello world!')
})

server.listen(3000, () => {
    console.log('listening on 3000 port')
})
 */

// Application Class private method name
const callback = Symbol('callback')

/**
 * KOA app class
 * @class Application
 */
class Application {
    constructor() {
        this.callbackFunc;
    }

    /**
     * 类私有方法
     * 闭包返回http.createServer()的 callback参数
     * @returns {Function} http.createServer()的 callback参数
     * @memberof Application
     */
    [callback]() {
        return (req, res) => {
            this.callbackFunc(req, res)
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
