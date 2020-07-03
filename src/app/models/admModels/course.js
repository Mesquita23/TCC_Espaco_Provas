const db = require('../../../config/db')


module.exports = { // exportando um objeto
    all(filter){

        query = `SELECT courses.*, cordinators.name as cordinator FROM courses
        INNER JOIN cordinators ON courses.id_cordinator = cordinators.id
        `

        return db.query(query)
    },
    create(data){

        const query = `
            INSERT INTO courses (
                name,
                id_cordinator
            ) VALUES ($1, $2)
            RETURNING id
        `
        
        const values = [
            data.name,
            data.id_cordinator
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  courses where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE courses SET
            name=($1),
            id_cordinator=($2)
        WHERE id = $3
        `
        const values = [
            data.name,
            data.id_cordinator,
            data.id_course
        ]
        
        return db.query(query, values)
    },
    delete(id){
        return db.query('DELETE FROM courses Where id = $1', [id])
    }

}