const express = require('express')
const app = express()
const router = require('./router')

app.use('/public/',express.static('./public/'))
app.use('/node_modules/',express.static('./node_modules/'))

// 配置post请求的请求体,必须写在use(router)之前
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.engine('html', require('express-art-template'));

// 使用路由
app.use(router)

app.listen(3000,function(){
    console.log('app server is started')
})