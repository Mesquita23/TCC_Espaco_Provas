const db = require('../../../config/db')
const { date } = require('../../../lib/utils')

module.exports = { // exportando um objeto

    studenttests(filter){
        let query = "",
        filterQuery = ""

        if (filter) {
            filterQuery = ` WHERE tests.typetest = '${filter}'`
        }

        query = `SELECT * FROM tests ${filterQuery}`

        return db.query(query)
    },
    all(filter){
        let query = "",
        filterQuery = ""

        if (filter) {
            filterQuery = ` WHERE tests.status = '${filter}'`
        }

        query = `SELECT * FROM tests ${filterQuery}`

        return db.query(query)
    },
    create(data){

        const query = `
            INSERT INTO tests (
                name,
                description,
                datestart,
                dateend,
                typeTest,
                status,
                created_at,
                id_course
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        
        const values = [
            data.name,
            data.description,
            date(data.datestart).isot,
            date(data.dateend).isot,
            data.typetest,
            data.status,
            date(Date.now()).isot,
            data.course || 1
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  tests where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE tests SET
            name=($1),
            description=($2),
            datestart=($3),
            dateend=($4),
            typetest=($5),
            status=($6)
        WHERE id = $7
        `
        const values = [
            data.name,
            data.description,
            data.datestart,
            data.dateend,
            data.typetest,
            data.status,
            data.id
        ]
        return db.query(query, values)
    },
    delete(id){
        return db.query('DELETE FROM tests Where id = $1', [id])
    }

}