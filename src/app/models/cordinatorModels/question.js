const db = require('../../../config/db')
const { age, date } = require('../../../lib/utils')

module.exports = { // exportando um objeto
    allofall(){
        return db.query('SELECT * FROM questions')
    },
    
    all(filter){

        query = `SELECT questions.*, matters.name as matter
        FROM questions
        INNER JOIN matters On questions.id_matter = matters.id
        WHERE questions.id_test = ${filter}`

        return db.query(query)
    },
    
    create(data){

        const query = `
            INSERT INTO questions (
                question,
                punctuation,
                id_test,
                id_matter,
                id_alternativecorrect
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `
        
        const values = [
            data.question,
            data.punctuation,
            data.id_test,
            data.id_matter,
            data.id_alternativecorrect 
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  questions where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE questions SET
            question=($1),
            punctuation=($2),
            id_test=($3),
            id_matter=($4),
            id_alternativecorrect=($5)
        WHERE id = $6
        `
        const values = [
            data.question,
            data.punctuation,
            data.id_test,
            data.id_matter,
            data.id_alternativecorrect,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
    //    queryalternatives = `delete from alternatives where id_question = ${id}`
    //    db.query(queryalternatives)

        return db.query('DELETE FROM questions Where id = $1', [id])
    },
    findMatter(id_matter){

        query = `SELECT matters.name 
        FROM questions
        INNER JOIN matters On questions.id_matter = matters.id
        Where questions.id = ${id_matter}`

        return db.query(query)
    },
    findAlternativeCorrect(idquestion){

        query = `SELECT alternatives.alternative 
        FROM questions
        INNER JOIN alternatives On questions.id_alternativecorrect = alternatives.id
        Where questions.id = ${idquestion}`

        return db.query(query)

    }

}