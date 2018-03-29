// 主线一 封装node http Server: 从hello world说起

// 创建一个原生的server app
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello world!')
})

server.listen(3000, () => {
    console.log('listening on 3000 port')
})