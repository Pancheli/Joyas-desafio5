const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Hellen2012',
    database: 'joyas',
    allowExitOnIdle: true
})

exports.runQuery = async (statement, params=[]) => {
    try {
        const {rows} = await pool.query(statement, params);
        return rows
    }
    catch(err) {
        throw err.message
    }
}