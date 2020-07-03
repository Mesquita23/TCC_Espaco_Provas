const { date } = require('../../../lib/utils')
const Alternative = require('../../models/cordinatorModels/alternative')


module.exports ={

    async create(req, res){
        // recolhendo id da questão dos parametros
        let id_question = req.params.idq
        let id_test = req.params.id
        //recolhendo matérias do banco

        return res.render("cordinatorView/alternatives/create.njk", {id_question, id_test})
    },
    async all(req, res){
        id_question = req.params.idq
        
        let results = await Alternative.all(id_question)
        alternatives = results.rows
    
        return res.render("cordinatorView/tests/index", { alternatives })
    },
    // Criar 
    async post(req,res){
        //Logica de Salvar
        if (req.body.alternative == '') {
            return res.send("Preencha a alternativa")
        }
        
        let { alternative, id_question, id_test} = req.body

        const alternativeobj = {
            alternative,
            id_question
        }

        await Alternative.create(alternativeobj)

        return res.redirect(`cordinator/tests/${id_test}/questions/${id_question}`)

    },
    // criar pagina para editar
    async edit(req, res){
        //recolhendo id_test dos parametros
        let id_question = req.params.idq
        let id_test = req.params.id

        let id_alternative = req.params.ida
        let alternative = await Alternative.find(id_alternative)
        alternative = alternative.rows[0]
        if(!id_alternative) return res.send("não foi encontrado a questão desta alternativa ")

        return res.render(`cordinatorView/alternatives/edit`, {id_question, alternative, id_test })
    },
    //atualizar
    async put(req, res){
        //recolhendo id_test dos parametros

        
        if (req.body.alternative == '') {
            return res.send("Preencha a alternativa")
        }

        let { alternative, id_question , id_test, id } = req.body

        if(!id_question) return res.send("não foi encontrado a questão desta alternativa ")

        const alternativeobj = {
            alternative,
            id_question,
            id
        }
        
        await Alternative.update(alternativeobj)

        return res.redirect(`cordinator/tests/${id_test}/questions/${id_question}`)
    },
    //deletar
    async delete(req, res){
        
        const id_test = req.body.id_test
        const id_question = req.body.id_question
        await Alternative.delete(req.body.id)
        
        return res.redirect(`cordinator/tests/${id_test}/questions/${id_question}`)
    }
} 