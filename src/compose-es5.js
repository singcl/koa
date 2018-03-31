
/**
 * Koa中间件核心处理机制
 * 中间件compose函数
 * ES5
 * @param {Function} middlewares KOA中间件数组
 * @version 0.0.1
 * @since 0.0.1
 * @author singcl 24661881@qq.com
 */
const compose = function(middlewares) {

    // 对Koa中间件进行一层包装 返回一个nextCreator数组, 这样做的好处是方便下一步统一聚合REDUCE
    const nextCreators = middlewares.map(function(middleware) {
        // 返回一个 nextCreator
        return function(ctx, next) {
            return async function() {
                await middleware(ctx, next)
            }
        }   
    })

    // 所有的nextCreator 统一聚合 最终生成一个nextCreator
    // 类REDUX compose 实现
    return nextCreators.reduce(function(a, b) {
        return function(ctx, next) {
            return a(ctx, b(ctx, next))
        }
    })
}

//
module.exports = compose