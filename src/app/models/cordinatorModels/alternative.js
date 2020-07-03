const db = require('../../../config/db')
const { age, date } = require('../../../lib/utils')

module.exports = { // exportando um objeto
    allofAll(){
        return db.query('SELECT * FROM alternatives')
    },
    allAlternativesbyTest(){
        query = `SELECT alternatives.id, alternatives.alternative
        FROM test
        INNER JOIN alternatives On test.id = alternatives.id_question
        WHERE alternatives.id_question = ${id_test}`

        return db.query(query)
    },

    allAlternativesbyQuestion(){
        query = `SELECT alternatives.id, alternatives.alternative
        FROM questions
        INNER JOIN alternatives On questions.id = alternatives.id_question
        WHERE alternatives.id_question = ${id_test}`

        return db.query(query)
    },
    all(filter){

        query = `SELECT alternatives.id, alternatives.alternative
        FROM alternatives
        WHERE alternatives.id_question = ${filter}`

        return db.query(query)
    },
    
    create(data){

        const query = `
            INSERT INTO alternatives (
                alternative,
                id_question
            ) VALUES ($1, $2)
            RETURNING id
        `
        
        const values = [
            data.alternative,
            data.id_question
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  alternatives where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE alternatives SET
            alternative=($1),
            id_question=($2)
        WHERE id = $3
        `
        const values = [
            data.alternative,
            data.id_question,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
        return db.query('DELETE FROM alternatives Where id = $1', [id])
    }
}