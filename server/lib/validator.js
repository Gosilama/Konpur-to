const Joi = require('joi');

module.exports = {
    addMessage: {
        body: {
            message: Joi.string().required(),
        }
    },
    deleteMessage: {
        query: {
            id: Joi.number().integer().required(),
        }
    }
};