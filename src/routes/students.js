const express = require('express')
const routes = express.Router()

//CONTROLLERS
const StudentController = require('../app/controllers/studentControllers/studentController')
const StudenttestController = require('../app/controllers/studentControllers/studenttestController')
const sessionController = require('../app/controllers/studentControllers/SessionController')

//VALIDATORS
const StudentValidator = require('../app/validators/student')
const SessionValidator = require('../app/validators/studentSession')

//MIDLEWARES
const  {isLoggedRedirectToStudents, OnlyStudents} = require('../app/midlewares/sessionstudent')

// TODAS AS ROTAS DOS ESTUDANTES

//// login/logout
routes.get('/students/login', isLoggedRedirectToStudents, sessionController.loginForm)
routes.post('/students/login', SessionValidator.login, sessionController.login)
routes.post('/students/logout', sessionController.logout)

routes.get('/students/forgot-password', sessionController.forgotForm)
routes.post('/students/forgot-password',SessionValidator.forgot, sessionController.forgot)

//reset password / forgot
routes.get('/students/password-reset', sessionController.resetForm)
routes.post('/students/password-reset', SessionValidator.reset, sessionController.reset)

//// user register delete
routes.get('/students/register', StudentController.registerForm)
routes.post('/students/register', StudentValidator.post, StudentController.post)

routes.get('/students', OnlyStudents, StudentValidator.show, StudentController.show)
routes.put('/students', StudentValidator.update, StudentController.update)
routes.delete('/students/', StudentController.delete)

//Achievements
routes.get('/students/achievements', function(req,res){
    res.render('./studentView/Achievements/index.njk')
})

//Relatórios
routes.get('/students/reports', function(req,res){
    res.render('./studentView/reports/index')
})

//mostrar prova
routes.get('/students/tests/', OnlyStudents, StudenttestController.showtests)
routes.get('/students/tests/:id', OnlyStudents, StudenttestController.createtest)

//cadastrar prova
routes.post('/studentstests', OnlyStudents, StudenttestController.poststudenttest)


routes.get('', function(req,res){
    res.render('./studentView/layout')
})


module.exports = routes