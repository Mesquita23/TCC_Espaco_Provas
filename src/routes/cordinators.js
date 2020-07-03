const express = require('express')
const routes = express.Router()

// CONTROLLERS
const MatterController = require('../app/controllers/cordinatorControllers/matterController')
const TestController = require('../app/controllers/cordinatorControllers/testController')
const QuestionController = require('../app/controllers/cordinatorControllers/questionController')
const AlternativeController = require('../app/controllers/cordinatorControllers/alternativeController')
const CordinatorController = require('../app/controllers/admControllers/cordinatorController')
const sessionController = require('../app/controllers/cordinatorControllers/SessionController')

//VALIDATORS
const CordinatorValidator = require('../app/validators/cordinator')
const TestValidator = require('../app/validators/test')
const SessionValidator = require('../app/validators/cordinatorSession')

//MIDLEWARES
const  {isLoggedRedirectToCordinator, OnlyCordinator} = require('../app/midlewares/sessionscordinator')



//// login/logout
routes.get('/cordinators/login', isLoggedRedirectToCordinator, sessionController.loginForm)
routes.post('/cordinators/login', SessionValidator.login, sessionController.login)
routes.post('/cordinators/logout', sessionController.logout)

routes.get('/cordinators/forgot-password', sessionController.forgotForm)
routes.post('/cordinators/forgot-password',SessionValidator.forgot, sessionController.forgot)

//reset password / forgot
routes.get('/cordinators/password-reset', sessionController.resetForm)
routes.post('/cordinators/password-reset', SessionValidator.reset, sessionController.reset)

//// user register delete
routes.get('/cordinators/register', CordinatorController.registerForm)
routes.post('/cordinators/register', CordinatorValidator.post, CordinatorController.post)

routes.get('/cordinators', OnlyCordinator, CordinatorValidator.show, CordinatorController.show)
routes.put('/cordinators', CordinatorValidator.update, CordinatorController.update)
routes.delete('/cordinators/', CordinatorController.delete)



//adm
// routes.get('/adm/cordinators/:id/edit', CordinatorController.edit)
// routes.put('/cordinators', CordinatorController.put)
routes.post('/cordinators', CordinatorController.post)
routes.delete('/cordinators', CordinatorController.delete)

// routes.get('/adm/cordinators', CordinatorController.index)
// routes.get('/adm/cordinators/create', CordinatorController.create )



 // TODAS AS ROTAS DO CORDENADOR
routes.get('/cordinator', OnlyCordinator, function(req, res){
    res.render('./CordinatorView/index')
})

//RELATÓRIOS
routes.get('/cordinator/reports', OnlyCordinator, function(req, res){
    res.render('./CordinatorView/reports/index.njk')
})

// MATÉRIA
routes.get('/cordinator/matters', OnlyCordinator, MatterController.index)
routes.get('/cordinator/matters/create', OnlyCordinator, MatterController.create )
routes.get('/cordinator/matters/:id/edit', OnlyCordinator, MatterController.edit)

routes.post('/matters', MatterController.post)
routes.put('/matters', MatterController.put)
routes.delete('/matters', MatterController.delete)

//PROVA/SIMULADO
routes.get('/cordinator/tests/create', OnlyCordinator, TestController.create)
routes.get('/cordinator/tests', OnlyCordinator, TestController.index)
routes.get('/cordinator/tests/:id', OnlyCordinator, TestController.show)
routes.get('/cordinator/tests/:id/edit', OnlyCordinator,TestController.edit)

routes.post('/tests', TestValidator.post, TestController.post)
routes.put('/tests', TestController.put)
routes.delete('/tests', TestController.delete)

//QUESTÃO
routes.get('/cordinator/tests/:id/questions/create',OnlyCordinator, QuestionController.create)
routes.get('/cordinator/tests/:id/questions/:idq',OnlyCordinator, QuestionController.show)
routes.get('/cordinator/tests/:id/questions/:idq/edit',OnlyCordinator, QuestionController.edit)

routes.post('/questions', QuestionController.post)
routes.put('/questions', QuestionController.put)
routes.delete('/questions', QuestionController.delete)

//ALTERNATIVAS

routes.get('/cordinator/tests/:id/questions/:idq/alternatives/create', OnlyCordinator, AlternativeController.create)
routes.get('/cordinator/tests/:id/questions/:idq/alternatives/:ida/edit', OnlyCordinator, AlternativeController.edit)

routes.post('/alternatives', AlternativeController.post)
routes.put('/alternatives', AlternativeController.put)
routes.delete('/alternatives', AlternativeController.delete)


module.exports = routes