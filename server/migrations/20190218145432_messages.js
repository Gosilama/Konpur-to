
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('messages', (table) => {
          table.increments('id').primary();
          table.string('message').notNull();
      }),
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('messages'),
    ])
};
