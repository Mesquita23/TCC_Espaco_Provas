const Cordinator = require('../models/cordinatorModels/Cordinator')
const { compare } = require('bcryptjs')


function checkAllFields(body){
    const keys = Object.keys(body)
    for (key of keys) {
        if (body[key] == '') {
            return { error: 'Preencha todos os campos', cordinator: body}
        }
    }
}

async function show(req, res, next){
    const id = req.session.cordinatorId
        
    const cordinator = await Cordinator.findOne({where: {id}})

    if(!cordinator) return res.render("cordinatorView/cordinator/register", { error: "Usuário não encontrado!"})

    req.cordinator = cordinator

    next()
}
async function post(req, res, next) {
    
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("cordinatorView/cordinator/register", fillAllFields)
    }
    //check if cordinator exists [email]
    let { email, password, passwordRepeat } = req.body
  

    const cordinator = await Cordinator.findOne({
        where: { email }
    }) //filtro com formato de objeto

    if (cordinator) return res.render('cordinatorView/cordinator/register', { error: 'Usuário já Cadastrado', cordinator: req.body})
    
    //check if password match
    if (password != passwordRepeat)
        return res.render('cordinatorView/cordinator/register', { error: 'Senhas não combinam', cordinator: req.body})

    next()
}

async function update(req,res,next){

    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("cordinatorView/cordinator/index", fillAllFields)
    }

    const {id, password} = req.body

    if(!password) return res.render("cordinatorView/cordinator/index", {
        cordinator: req.body,
        error: "Coloque sua senha para atualizar seu cadastro"
    })

    const cordinator = await Cordinator.findOne({where: {id}})

    const passed = await compare(password, cordinator.password)

    if(!passed) return res.render("cordinatorView/cordinator/index", {
        cordinator: req.body,
        error: "Senha incorreta"
    })

    req.cordinator = cordinator

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
