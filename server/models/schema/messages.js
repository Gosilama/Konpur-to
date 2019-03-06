const bookshelf = require('../../bookshelf');
const knex = require('../../config/database');
const status = require('../../constants/status');

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
        // return knex('messages').where('id', id).delete();
        return knex('messages').where('id', id).update({status: status.DELETED});
    },
    getAllMessages: function () {
        return this.forge().query({ whereRaw: `status = "valid"`}).fetchAll();
    }
});

module.exports = bookshelf.model('messages', messages);