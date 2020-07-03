const { date } = require('../../../lib/utils')
const Test = require("../../models/cordinatorModels/test")
const Question = require('../../models/cordinatorModels/question')
const Alternative = require('../../models/cordinatorModels/alternative')
const question = require('../../models/cordinatorModels/question')


module.exports = {
    // cadastro test student 
    async showtests(req, res) {
        let { typetestfilter } = req.query

        let results = await Test.all(typetestfilter)
        tests = results.rows

        return res.render("studentView/tests/alltests.njk", { tests })
    },
    async createtest(req, res) {

        let result = await Test.find(req.params.id)
        let test = result.rows[0]

        let results = await Question.all(req.params.id)
        questions = results.rows

        let alternatives = await Alternative.allofAll()
        alternatives = alternatives.rows
        //console.log(alternatives)

        return res.render("studentView/tests/dotest.njk", { test, questions, alternatives })
    },
    async poststudenttest(req, res) {
        const keys = Object.keys(req.body)

        let questions = await Question.allofall()
        questions = questions.rows


        let alternatives = await Alternative.allofAll()
        alternatives = alternatives.rows
        console.log(alternatives.length)

        for (i = 0; i < calternatives.length; i++) {
            console.log(alternatives[i].id)
        }

        console.log(alternatives[0].id_question)


        for (key of keys) {
            if (req.body[key] == 'questão 1') {
            }
        }
    }
}