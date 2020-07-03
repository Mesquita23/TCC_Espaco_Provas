const Cordinator = require('../models/cordinatorModels/Cordinator')
const { compare } = require('bcryptjs')

async function login(req, res, next){
    const { email, password} = req.body
        
    const cordinator = await Cordinator.findOne({where: {email}})

    if(!cordinator) return res.render("cordinatorView/session/login", { cordinator: req.body, error: "Usuário não cadastrado!"})

    const passed = await compare(password, cordinator.password)

    if(!passed) return res.render("cordinatorView/session/login", {
        cordinator: req.body,
        error: "Senha incorreta"
    })

    req.cordinator = cordinator

    next()
}

async function forgot(req, res, next){

    const {email} = req.body

    try {
        let cordinator = await Cordinator.findOne({where: {email}})

        if(!cordinator) return res.render("cordinatorView/session/forgot-password", { cordinator: req.body, error: "Email não cadastrado!"})

        req.cordinator = cordinator
        next()

    }catch(err){
        console.error(err)
    }
}

async function reset(req, res, next){
    
    // procurar o usuário 
    const { email, password, passwordRepeat, token} = req.body
    
        
    const cordinator = await Cordinator.findOne({where: {email}})
    if(!cordinator) return res.render("cordinatorView/session/password-reset", { 
        cordinator: req.body, 
        error: "Usuário não cadastrado!",
        token,
    })
            
    //ver se a senha bate
    if (password != passwordRepeat)
    return res.render('cordinatorView/session/password-reset', { 
        error: 'Senhas não combinam', 
        cordinator: req.body,
        token
    })

    //verificar se o token bate
    if(token != cordinator.reset_token) return res.render('cordinatorView/session/password-reset', { 
        cordinator: req.body,
        token,
        error: 'Token inválido! Solicite uma nova recuperação de senha.'
    })

    //verificar se o token não expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if (now > cordinator.reset_token_expires - 1)return res.render('cordinatorView/session/password-reset', { 
        cordinator: req.body,
        token,
        error: 'Token expirado! Por favor, solicite uma nova recuperação de senha.'
    })

    req.cordinator = cordinator 

    next()
}

module.exports = {
    login,
    forgot,
    reset
}
