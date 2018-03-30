const Koa = require('../src/application')
const app = new Koa()

app.use((ctx) => {
    ctx.body = 'hello ' + ctx.query.name
    return Promise.resolve()
})

app.listen(3000, () => {
    console.log('listening on 3000 port form KOA')
})
