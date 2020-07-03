const { date } = require('../../../lib/utils')
const Test = require("../../models/cordinatorModels/test")
const Question = require('../../models/cordinatorModels/question')
const { render } = require('nunjucks')


module.exports ={

    create(req, res){
        return res.render("cordinatorView/tests/create.njk")
    },
    async index(req, res){

        let { ativo }  = req.query
        
        let results = await Test.all(ativo)
        tests = results.rows
    
        return res.render("cordinatorView/tests/index", { tests })    

    },
    async show(req, res){
        
        //let { ativo }  = req.query

        //questions
        let results = await Question.all(req.params.id)
        questions = results.rows
        //tests
        let result = await Test.find(req.params.id)
        let test = result.rows[0]
        test.datestart = date(test.datestart).ptBRT
        test.dateend = date(test.dateend).ptBRT
        
        return res.render('cordinatorView/tests/show.njk', {test, questions})
    },
    // criar pagina para criar

    // Criar 
    async post(req,res){
        //Logica de Salvar

        let { name, description, datestart, dateend } = req.body
        
        const typetest = Number(req.body.typetest)
        const status = Number(req.body.status)

        const test = {
            name,
            description,
            datestart,
            dateend,
            typetest,
            status
        }
        let results = await Test.create(test)
        const testNew = results.rows[0]

        return res.redirect('cordinator/tests')

    },
    // criar pagina para editar
    async edit(req, res){

        let results = await Test.find(req.params.id)
        const test = results.rows[0]
        test.datestart = date(test.datestart).isot
        test.dateend = date(test.dateend).isot

        if(!test) return res.send("Prova/Simulado não encontrado")

        return res.render("cordinatorView/tests/edit.njk", {test})
    },
    //atualizar
    async put(req, res){
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Preencha todos os campos")
            }
        }


        let { name, description } = req.body

        const datestart = date(req.body.datestart).isot
        const dateend = date(req.body.dateend).isot
        const typetest = Number(req.body.typetest)
        const status = Number(req.body.status)
        const id = Number(req.body.id)

        const test = {
            id,
            name,
            description,
            datestart,
            dateend,
            typetest,
            status
        }
        
        await Test.update(test)

        return res.redirect(`cordinator/tests/${id}`)
    },
    //deletar
    async delete(req, res){
        try{
            await Test.delete(req.body.id)

            return res.redirect('cordinator/tests')
        }catch(err){
            console.error(err)
            return render('')
        }

    }
} 