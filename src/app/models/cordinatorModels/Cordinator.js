const db = require('../../../config/db')
const { Query } = require('pg')
const { hash } = require('bcryptjs')

module.exports = { // exportando um objeto
    async findOne(filters) {
        let query = "SELECT * FROM   cordinators"

        Object.keys(filters).map(key => {
            //where | or  | and
            query = `${query}
            ${key}
            `

            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}' `
            })
        })
        const results = await db.query(query)
        return results.rows[0]
    },
    async create(data) {
        try {

            const query = `
            INSERT INTO cordinators (
                name,
                email,
                password)
                VALUES ( $1, $2, $3)
                RETURNING id
            `
            // hash da senha
            const passwordHash = await hash(data.password, 8)
            console.log(passwordHash)

            const values = [
                data.name,
                data.email,
                passwordHash
            ]
            
            const results = await db.query(query, values)
            return results.rows[0].id

        } catch (err) {
            console.error(err)
        }
    },
    async update(id, fields) {
        let query = "UPDATE cordinators SET"

        Object.keys(fields).map((key, index, array) => {
            if ((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                    `
            } else {
                //Último dado
                query = `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}
                `
            }
        })
        await db.query(query)
        return
    },
    async delete(id) {
        try {
            return await db.query('DELETE FROM cordinators where id = $1', [id])
        }
        catch (err) {
            console.error(err)
        }
    }
}
