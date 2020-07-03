const Cordinator = require('../../models/cordinatorModels/Cordinator')

const {hash} = require('bcryptjs')
const crypto = require('crypto') // modulo do node
const mailer = require('../../../lib/mailer')

module.exports = {

    loginForm(req, res){
        return res.render("cordinatorView/session/login")
    },
    async login(req,res){
        req.session.cordinatorId = req.cordinator.id

        return res.redirect("/cordinators")
    },
    logout(req, res){
        req.session.destroy()

        return res.redirect("/cordinators/login")
    },
    forgotForm(req, res){
        return res.render("cordinatorView/session/forgot-password")
    },
    async forgot(req,res){
        const cordinator = req.cordinator

        try{
        // criar token para este usuário
        const token = crypto.randomBytes(20).toString("hex")
        // criar uma expiração
        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await Cordinator.update(cordinator.id, {
            reset_token: token,
            reset_token_expires: now
        })
        // enviar um email com um link de recuperasão de senha 
        await mailer.sendMail({
            to: cordinator.email,
            from: 'no-reply@launchstore.com.br',
            subject: 'Recuperação de senha',
            html: `<h2>Não se preocupe</h2> <p>clique no link abaixo para recuperar sua senha </p>
            <p>
                <a href="http://localhost:3000/cordinators/password-reset?token=${token}" target="_blank">RECUPERAR SENHA<a/>
                    
            </p>`
        })
        // avisar o usuário que enviamos o email
        return res.render("cordinatorView/session/forgot-password", {
            success: "Email de recuperação enviado!"
        })

        }
        catch(err){
            return res.render("cordinatorView/session/forgot-password", {
                error: "Não foi possível enviar email de recuperação"
            })
        }
       
    },
    resetForm(req, res){
        return res.render("cordinatorView/session/password-reset", {token: req.query.token} )
    },
    async reset(req,res){
        const cordinator = req.cordinator
        const { password, token } = req.body

        try {
            //cria um novo hash de senha
           const newPassword = await hash(password, 8)

            //atualiza o usuário
            await Cordinator.update(cordinator.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })
            //avisa o usuário que ele tem uma nova senha
            return res.render("cordinatorView/session/login", {
                cordinator:req.body,
                success: "Senha atualizada! Faça o seu login"
            })

        }catch(err){
            console.error(err)
            return res.render("cordinatorView/session/forgot-password", {
                cordinator: req.body,
                token: token,
                error: "Erro inesperado, tente novamente"
            })
        }
    }
}
