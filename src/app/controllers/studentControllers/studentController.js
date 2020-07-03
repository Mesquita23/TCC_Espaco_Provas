const Student = require('../../models/studentModels/Student')
const { date } = require('../../../lib/utils')

module.exports = {
    registerForm(req, res) {

        return res.render("studentView/student/register")
    },
    async show(req,res){
        const {student} = req

        return res.render('studentView/student/index.njk', {student})
    },
    async post (req, res){
        try{

            const studentId = await Student.create(req.body)

            req.session.studentId = studentId
    
            return res.redirect('/students')

        }catch(err){
            console.error(err)
            return res.render("studentView/student/index", {
                error:"Erro inesperado ocorreu tente novamente!"
            })
        }
    },
    async update(req,res){
        try{
            console.log(req)
            const { student } = req

            

            let { name, email, ra, semester } = req.body

            ra = ra.replace(/\D/g, "")

            await Student.update(student.id ,{
                name,
                email,
                ra,
                semester
            })

            return res.render("studentView/student/index",{
                student: req.body,
                success: "A sua conta foi atualizada"
            })

        }catch(err){
            console.error(err)
            return res.render("studentView/student/index", {
                error:"Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res){
        const id = req.session.studentId
        console.log(id)

        try{
            await Student.delete(id)
            req.session.destroy()
            return res.render("studentView/session/login",{
                success: "A sua conta foi deletada com sucesso"
            })

        }catch(err){
            console.error(err)
            return res.render("studentView/session/index",{
                student: req.body,
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