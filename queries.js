const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ash',
    host: 'localhost',
    database: 'ash',
    password: 'ash',
    port: 5432,
});