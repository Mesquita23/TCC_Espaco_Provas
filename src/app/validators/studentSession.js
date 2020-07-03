const Student = require('../models/studentModels/Student')
const { compare } = require('bcryptjs')

async function login(req, res, next){
    const { email, password} = req.body
        
    const student = await Student.findOne({where: {email}})

    if(!student) return res.render("studentView/session/login", { student: req.body, error: "Usuário não cadastrado!"})

    const passed = await compare(password, student.password)

    if(!passed) return res.render("studentView/session/login", {
        student: req.body,
        error: "Senha incorreta"
    })

    req.student = student

    next()
}

async function forgot(req, res, next){

    const {email} = req.body

    try {
        let student = await Student.findOne({where: {email}})

        if(!student) return res.render("studentView/session/forgot-password", { student: req.body, error: "Email não cadastrado!"})

        req.student = student
        next()

    }catch(err){
        console.error(err)
    }
}

async function reset(req, res, next){
    
    // procurar o usuário 
    const { email, password, passwordRepeat, token} = req.body
    
        
    const student = await Student.findOne({where: {email}})
    if(!student) return res.render("studentView/session/password-reset", { 
        student: req.body, 
        error: "Usuário não cadastrado!",
        token,
    })
            
    //ver se a senha bate
    if (password != passwordRepeat)
    return res.render('studentView/session/password-reset', { 
        error: 'Senhas não combinam', 
        student: req.body,
        token
    })

    //verificar se o token bate
    if(token != student.reset_token) return res.render('studentView/session/password-reset', { 
        student: req.body,
        token,
        error: 'Token inválido! Solicite uma nova recuperação de senha.'
    })

    //verificar se o token não expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if (now > student.reset_token_expires - 1)return res.render('studentView/session/password-reset', { 
        student: req.body,
        token,
        error: 'Token expirado! Por favor, solicite uma nova recuperação de senha.'
    })

    req.student = student 

    next()
}

module.exports = {
    login,
    forgot,
    reset
}
