const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ash',
    host: '18.219.4.207',
    database: 'ash',
    password: 'ash',
    port: 5432,
});

const getMonsters = (req, res) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};

const getMonsterById = (req, res) => {
    const name = req.params.name;

    pool.query('SELECT * FROM monsters WHERE name = $1', [name], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};

const createMonster = (req, res) => {
    const name = req.body.name;

    pool.query('INSERT INTO monsters (name) VALUES $1', [name], (err, results) => {
        if (err) {
            throw err
        }
        res.status(201).send(`Monster added with name: ${results.name}`)
    })
};

const deleteMonster = (req, res) => {
    const name = req.params.name;

    pool.query('DELETE FROM monsters WHERE name = $1', [name], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send(`Monster deleted with ID: ${name}`)
    })
};


module.exports = {
    getMonsters,
    getMonsterById,
    createMonster,
    deleteMonster
};