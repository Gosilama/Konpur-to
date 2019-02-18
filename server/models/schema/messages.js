const bookshelf = require('../../bookshelf');

const messages = bookshelf.Model.extend({
    idAttribute: 'id',
    tableName: 'messages',
}, {
    getById: function (id) {
        const condition = { id };
        return this.forge().query({ where: condition }).fetch();
    }
});

module.exports = bookshelf.model('messages', messages);