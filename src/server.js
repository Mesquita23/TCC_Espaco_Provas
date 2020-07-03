const express = require('express')
const routes = require('./routes/index.js')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const session = require('./config/session') 

const server = express()

server.use(session)
server.use((req, res, next)=>{
    res.locals.session = req.session
    next()
})

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method'))
server.use(routes) // é importante o routes ser o ultimo middle 

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function(){
    console.log('server is ruinning on port 5000')
})