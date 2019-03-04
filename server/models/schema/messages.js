const bookshelf = require('../../bookshelf');
let knex = require('../../config/database');

const messages = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'messages',
}, {
    getById: function (id) {
        const condition = { id };
        return this.forge().query({ where: condition }).fetch();
    },
    getByMessage: function (message) {
        const condition = { message };
        return this.forge().query({ where: condition }).fetch();
    },
    deleteMessage: function (id) {
        return knex('messages').where('id', id).delete();
    }
});

module.exports = bookshelf.model('messages', messages);