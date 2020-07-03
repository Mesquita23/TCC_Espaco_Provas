const Test = require('../models/cordinatorModels/test')
const { compare } = require('bcryptjs')


function checkAllFields(body){
    const keys = Object.keys(body)
    for (key of keys) {
        if (body[key] == '') {
            return { error: 'Preencha todos os campos', test: body}
        }
    }
}

/*
async function show(req, res, next){
    const id = req.session.testId
        
    const test = await Test.findOne({where: {id}})

    if(!test) return res.render("testView/test/register", { error: "Usuário não encontrado!"})

    req.test = test

    next()
}
*/

async function post(req, res, next) {
    
    //check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("cordinatorView/tests/create", fillAllFields)
    }
    next()
}

/*
async function update(req,res,next){

    const fillAllFields = checkAllFields(req.body)
    if(fillAllFields){
        return res.render("testView/test/index", fillAllFields)
    }

    const {id, password} = req.body

    console.log(req.body)

    if(!password) return res.render("testView/test/index", {
        test: req.body,
        error: "Coloque sua senha para atualizar seu cadastro"
    })

    const test = await Test.findOne({where: {id}})

    const passed = await compare(password, test.password)

    if(!passed) return res.render("testView/test/index", {
        test: req.body,
        error: "Senha incorreta"
    })

    req.test = test

    next()

}
*/
async function deletethis (req,res,next){

}


module.exports = {
    post
}
