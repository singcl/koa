
/**
 * Koa中间件核心处理机制
 * 中间件compose函数
 * ES7
 * 类REDUX compose 实现
 * @param {Function} middlewares KOA中间件数组
 * @version 0.0.1
 * @since 0.0.1
 * @author singcl 24661881@qq.com
 */
const nextCreators = (middlewares) => middlewares.map((middleware) => (ctx, next) => async () => await middleware(ctx, next))
const compose = (middlewares) => nextCreators(middlewares).reduce((a, b) => (ctx, next) => (a(ctx, b(ctx, next))))

//
module.exports = compose
