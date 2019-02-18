const config = require('../config/config');

const dbConfig = {
    client: 'mysql',
    connection: config.database.mysql.connection,
    pool: config.database.mysql.pool,
};

const knex = require('knex')(dbConfig);
module.exports = knex;