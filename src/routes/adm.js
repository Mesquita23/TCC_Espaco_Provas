const express = require('express')
const routes = express.Router()

const CourseController = require('../app/controllers/admControllers/courseController')


// rotas do administrador
routes.get('/adm/courses', CourseController.index)
routes.get('/adm/courses/create', CourseController.create )
routes.get('/adm/courses/:id/edit', CourseController.edit)

routes.post('/courses', CourseController.post)
routes.put('/courses', CourseController.put)
routes.delete('/courses', CourseController.delete)

module.exports = routes