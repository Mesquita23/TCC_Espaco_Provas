const db = require('../../../config/db')


module.exports = { // exportando um objeto
    all(filter){

        let query = "",
        filterQuery = ""

        if (filter) {
            filterQuery = ` WHERE matters.semester = '${filter}'`
        }

        query = `SELECT * FROM matters ${filterQuery}`

        return db.query(query)
    },
    create(data){

        const query = `
            INSERT INTO matters (
                name,
                semester,
                id_course
            ) VALUES ($1, $2, $3)
            RETURNING id
        `
        
        const values = [
            data.name,
            data.semester,
            data.course || 1
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  matters where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE matters SET
            name=($1),
            semester=($2)
        WHERE id = $3
        `
        const values = [
            data.name,
            data.semester,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
        return db.query('DELETE FROM matters Where id = $1', [id])
    }

}