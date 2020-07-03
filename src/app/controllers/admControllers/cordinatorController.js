const Cordinator = require('../../models/cordinatorModels/Cordinator')
const { date } = require('../../../lib/utils')

module.exports = {
    registerForm(req, res) {

        return res.render("cordinatorView/cordinator/register")
    },
    async show(req,res){
        const {cordinator} = req

        return res.render('cordinatorView/cordinator/index.njk', {cordinator})
    },
    async post (req, res){
        try{
            

            const cordinatorId = await Cordinator.create(req.body)

            req.session.cordinatorId = cordinatorId

            req.session.studentId = ""
    
            return res.redirect('/cordinators', {
                success:"Conta cadastrada!"
            })

        }catch(err){
            console.error(err)
            return res.render("cordinatorView/cordinator/index", {
                error:"Erro inesperado ocorreu tente novamente!"
            })
        }
    },
    async update(req,res){
        try{
            const { cordinator } = req

            let { name, email, ra, semester } = req.body

            ra = ra.replace(/\D/g, "")

            await Cordinator.update(cordinator.id ,{
                name,
                email,
                ra,
                semester
            })

            return res.render("cordinatorView/cordinator/index",{
                cordinator: req.body,
                success: "A sua conta foi atualizada"
            })

        }catch(err){
            console.error(err)
            return res.render("cordinatorView/cordinator/index", {
                error:"Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res){
        const id = req.session.cordinatorId

        try{
            await Cordinator.delete(id)
            req.session.destroy()
            return res.render("cordinatorView/session/login",{
                success: "A sua conta foi deletada com sucesso"
            })

        }catch(err){
            console.error(err)
            return res.render("cordinatorView/session/index",{
                cordinator: req.body,
                error: "Erro inesperado, não foi possível excluir sua conta."
            })
        }

    }
}

// ECMAScriopt 6 
// const, let 
// template literals "strings"
// spread operators - shorthand { ...objeto } - [ ...array]
// shorthand { a()}
// arrow function () => {}
// 