// Koa中间件核心处理机制

/**
 * next 函数生成器 - 接受一个next函数生成一个新的next函数
 * 生成器函数是一个比较重要的概念。必须Redux中的actionCreator, Redux中间件的next Creator
 * @param {Function} middleware 中间件
 * @param {Function} next 统一格式的没有参数的async 函数
 * @param {Object} ctx context实例
 */
const nextCreator = function(middleware, next, ctx) {
    // 保证所有的next 函数都是一个没有参数的async函数
    // next 函数
    return async () => {
        // 没有指定中间件中的this
        await middleware(ctx, next)
    }
}

/**
 * 核心洋葱模型
 * @param {Array} middlewares 中间件数组
 * @todo  可不可以仿Redux compose实现 
 */
const compose = function(middlewares) {
    const len = middlewares.length
    // next初始函数是一个没有参数的async 函数
    let next = async () => {
        return Promise.resolve()
    }
    return async (ctx) => {
        // 核心洋葱模型 - 递归从里到外层层的包裹
        // 层层包裹的时候每一层都是一个闭包，都会保持住一个next
        for (let i = len - 1; i >= 0; i--) {
            let currMiddleware = middlewares[i]
            next = nextCreator(currMiddleware, next, ctx)
        }

        // 核心洋葱模型 - 从外到里层层剥开
        // 每调用一次next()方法就剥开一层 - 即我们常说的将执行权交给下一个中间件
        // 剥开第一层由 application.js 中return fn(ctx).then(respond) 中的fn(ctx)剥开，也就是这里这个next()
        // 其他洋葱层在中间件中手动调用next() 剥开
        // 如果不调用next() 则后续中间件都不用执行，直接 原路折返
        await next()
    }
}

//
module.exports = compose