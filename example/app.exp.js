const Koa = require('../src/application')
const app = new Koa()

// 从实现中，我们知道了this.context是我们的中间件中上下文ctx对象的原型。
// 因此在实际开发中，我们可以将一些常用的方法挂载到this.context上面，这样，在中间件ctx中，我们也可以方便的使用这些方法了.
// 这个概念就叫做ctx的扩展，一个例子是阿里的egg.js框架已经把这个扩展机制作为一部分，融入到了框架开发中。
// 下面就展示一个例子，我们写一个echoData的方法作为扩展，传入errno, data, errmsg，能够给客户端返回结构化的消息结果

app.context.echoData = function(errno = 0, data = null, errmsg = '') {
    this.res.setHeader('Content-Type', 'application/json;charset=utf-8')
    this.body = { errno, data, errmsg }
}

app.use((ctx) => {
    const data = {
        name: 'tom',
        age: 16,
        sex: 'male'
    }
    // 这里使用扩展，方便的返回utf-8格式编码，带有errno和errmsg的消息体
    ctx.echoData(0, data, 'success')
    // ctx.body = 'hello ' + ctx.query.name
    return Promise.resolve()
})

app.listen(3000, () => {
    console.log('listening on 3000 port form KOA')
})
