const util = require('util');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const pool = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    timezone: process.env.DATABASE_TIMEZONE,
});

pool.query = util.promisify(pool.query);

module.exports = pool;
