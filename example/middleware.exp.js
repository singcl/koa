const Koa = require('../src/application-es')
const app = new Koa()

const responseData = {}

app.use(async (ctx, next) => {
    responseData.name = 'tom'
    await next()
    ctx.body = responseData
})

app.use(async (ctx, next) => {
    responseData.age = 16
    await next()
})

app.use(async () => {
    responseData.sex = 'male'
})

app.listen(3000, () => {
    console.log('listening on 3000 port form KOA')
})
