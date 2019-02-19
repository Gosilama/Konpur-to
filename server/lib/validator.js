const Joi = require('joi');

module.exports = {
    addMessage: {
        body: {
            message: Joi.string().required(),
        }
    },
    deleteMessage: {
        body: {
            id: Joi.number().integer().required(),
        }
    }
};