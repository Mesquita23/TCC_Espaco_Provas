const db = require('../../../config/db')


module.exports = { // exportando um objeto
    all(filter){

        query = `SELECT * FROM cordinators`

        return db.query(query)
    },
    create(data){

        const query = `
            INSERT INTO cordinator (
                name,
                email,
                password,
                created_at
            ) VALUES ($1, $2)
            RETURNING id
        `
        
        const values = [
            data.name,
            data.email,
            data.password,
            date(Date.now()).iso,
            data.course || 1
        ]

        return db.query(query, values)

    },
    find(id){
        return db.query('SELECT * FROM  cordinators where id = $1', [id])
    },
    update(data){
        const query = `
            UPDATE cordinator SET
            name=($1),
            email=($2),
            password=($4),
            created_at=($4)
        WHERE id = $3
        `
        const values = [
            data.name,
            data.email,
            data.password,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    } /*,
    delete(id){
        return db.query('DELETE FROM cordinator Where id = $1', [id])
    } */
}