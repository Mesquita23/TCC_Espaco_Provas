const express = require('express')
const routes = express.Router()

//inportando rotas
const adm = require('./adm')
const cordinators = require('./cordinators')
const students = require('./students')

//init
routes.get('/', function(req,res){
    res.redirect('/students/login')
})

//Rotas dos administradores 
routes.use('/', adm)
//Rotas dos administradores 
routes.use('/', cordinators)
//Rotas dos estudantes
routes.use('/', students)

// ALias
routes.get('/accounts', function(req,res){
    res.redirect('/students/login')
})



module.exports = routes
