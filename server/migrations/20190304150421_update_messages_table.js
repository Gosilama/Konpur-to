
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('messages', (table) => {
            table.enum('status', ['valid', 'deleted']);
            table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
            table.timestamp('updated_at', true).defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        })
    ])
};

exports.down = function(knex, Promise) {
  
};
