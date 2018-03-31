
/**
 * Koa中间件核心处理机制
 * 一个nextCreatorsArr数组包装函数，对middlewares中的每一个中间件包装一下
 * ES7
 * 类REDUX compose 实现
 * @param {Function} middlewares KOA中间件数组
 * @returns {Array} 返回一个nextCreatorsArr数组 数组成员为nextCreator
 * @version 0.0.1
 * @since 0.0.1
 * @author singcl 24661881@qq.com
 */
const nextCreatorsWrapper = (middlewares) => middlewares.map((middleware) => (ctx, next) => async () => await middleware(ctx, next))

/**
 * Koa中间件核心处理机制
 * 中间件compose函数
 * ES7
 * 类REDUX compose 实现
 * @param {Function} middlewares KOA中间件数组
 * @returns {Function} 返回一个最终聚合后的nextCreator，执行nextCreator(ctx, next) 返回一个新的next
 * @version 0.0.1
 * @since 0.0.1
 * @author singcl 24661881@qq.com
 */
const compose = (middlewares) => nextCreatorsWrapper(middlewares).reduce((a, b) => (ctx, next) => (a(ctx, b(ctx, next))))

// If you like, You kan combine these a function. HOHO!
// const composeA = (middlewares) => middlewares.map((middleware) => (ctx, next) => async () => await middleware(ctx, next)).reduce((a, b) => (ctx, next) => (a(ctx, b(ctx, next))))
// module.exports = composeA

//
module.exports = compose
