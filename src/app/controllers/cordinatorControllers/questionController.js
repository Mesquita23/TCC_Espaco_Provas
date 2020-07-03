const { date } = require('../../../lib/utils')
const Test = require("../../models/cordinatorModels/test")
const Question = require('../../models/cordinatorModels/question')
const Matter = require('../../models/cordinatorModels/matter')
const Alternative = require('../../models/cordinatorModels/alternative')


module.exports ={

    async create(req, res){
        
        // recolhendo id dos parametros
        let id_test = req.params.id
        //recolhendo matérias do banco
        let matters = await Matter.all()
        matters = matters.rows
        //recolhendo alternativas da matéria 

        return res.render("cordinatorView/questions/create.njk", {id_test, matters})
    },

    async show(req, res){
        //recolhendo id_test do parametro
        let id_test = req.params.id
        //recolhendo id_question do parametro
        let questionid = req.params.idq
        //recolhendo questão do banco
        let question = await Question.find(questionid)
        question = question.rows[0]
        //recolhendo matérias do banco
        let matter = await Question.findMatter(questionid)
        matter = matter.rows[0]
        //recolhendo a alternativa correta da questão
        let alternativecorrect = await Question.findAlternativeCorrect(questionid)
        alternativecorrect = alternativecorrect.rows[0]
        
        // recolhendo as alternativas desta questão
        let alternatives = await Alternative.all(questionid)
        alternatives = alternatives.rows

   

        return res.render('cordinatorView/questions/show.njk', {question, alternatives, alternativecorrect, matter, id_test})
    },
    async all(req, res){

        let { ativo }  = req.query
        
        let results = await Test.all(ativo)
        questions = results.rows
    
        return res.render("cordinatorView/tests/index", { questions })    

    },
    // Criar 
    async post(req,res){
        //Logica de Salvar
        if (req.body.alternative == '') {
            return res.send("Preencha a alternativa")
        }
        
        let { question, id_test, id_matter , id_alternativecorrect} = req.body
        const punctuation = Number(req.body.punctuation)

        const questionobj = {
            question,
            punctuation,
            id_alternativecorrect,
            id_test,
            id_matter
        }

        let results = await Question.create(questionobj)

        return res.redirect(`cordinator/tests/${id_test}`)

    },
    // criar pagina para editar
    async edit(req, res){
        //recolhendo id_test dos parametros
        let id_test = req.params.id
        //recolhendo questão do banco
        let results = await Question.find(req.params.idq)
        const question = results.rows[0]
        //recolhendo matérias do banco
        let matters = await Matter.all()
        matters = matters.rows
        //recolhendo a alternativa correta do banco
        let alternatives = await Alternative.all(question.id)
        alternatives = alternatives.rows
        //recolhendo alternativa correta
        let alternativecorrect = await Question.findAlternativeCorrect(question.id)
        id_alternativecorrect = alternativecorrect.rows[0]
        if(id_alternativecorrect === undefined){id_alternativecorrect = '' }

        if(!question) return res.send("Prova/Simulado não encontrado")

        return res.render("cordinatorView/questions/edit.njk", {id_test, question, matters , alternatives, id_alternativecorrect})
    },
    //atualizar
    async put(req, res){
        if (req.body.question == '') {
            return res.send("Preencha a questão")
        }

        let { id, question, id_test, id_matter, id_alternativecorrect } = req.body
        
        const punctuation = Number(req.body.punctuation)


        const questionobj = {
            id,
            question,
            punctuation,
            id_alternativecorrect,
            id_test,
            id_matter
        }        
        
        await Question.update(questionobj)

        return res.redirect(`cordinator/tests/${id_test}/questions/${id}`)
    },
    //deletar
    async delete(req, res){

        const id_test = req.body.id_test
        const objeto = await Question.delete(req.body.id)

        

        return res.redirect(`cordinator/tests/${id_test}`)
    }
} 