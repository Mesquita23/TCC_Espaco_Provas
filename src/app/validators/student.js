const Student = require('../models/studentModels/Student')
const { compare } = require('bcryptjs')


function checkAllFields(body){
    const keys = Object.keys(body)
    for (key of keys) {
        if (body[key] == '') {
            return { error: 'Preencha todos os campos', student: body}
        }
    }
}

async function show(req, res, next){
    const id = req.session.studentId
        
    const student = await Student.findOne({where: {id}})

    if(!student) return res.render("studentView/student/register", { error: "Usuário não encontrado!"})

    req.student = student

    next()
}
async function post(req, res, next) {
    
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("studentView/student/register", fillAllFields)
    }
    //check if student exists [email]
    let { email, password, passwordRepeat } = req.body
  

    const student = await Student.findOne({
        where: { email }
    }) //filtro com formato de objeto

    if (student) return res.render('studentView/student/register', { error: 'Usuário já Cadastrado', student: req.body})
    
    //check if password match
    if (password != passwordRepeat)
        return res.render('studentView/student/register', { error: 'Senhas não combinam', student: req.body})

    next()
}

async function update(req,res,next){

    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("studentView/student/index", fillAllFields)
    }

    const {id, password} = req.body

    if(!password) return res.render("studentView/student/index", {
        student: req.body,
        error: "Coloque sua senha para atualizar seu cadastro"
    })

    const student = await Student.findOne({where: {id}})

    const passed = await compare(password, student.password)

    if(!passed) return res.render("studentView/student/index", {
        student: req.body,
        error: "Senha incorreta"
    })

    req.student = student

    next()

}
async function deletethis (req,res,next){

}

module.exports = {
    post,
    show,
    update,
    deletethis
}
