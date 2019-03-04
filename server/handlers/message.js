const model = require('../models/index');
const responseCodes = require('../constants/responseCodes');
const responseMessages = require('../constants/responseMessages');

module.exports = {
    addMessage: async (req) => {
        try {
            const data = req.body;

            const message = { message: data.message };

            const messageExists = await model.messages.getByMessage(data.message);

            if (messageExists) {
                return Promise.reject({
                    status_code: 404,
                    message: responseMessages.DUPLICATE_MESSAGE,
                    code: responseCodes.DUPLICATE_MESSAGE,
                });
            }

            const savedMessage = await model.messages.forge(message).save();

            if (!savedMessage) {
                return Promise.reject({
                    status_code: 404,
                    message: responseMessages.NOT_IMPLEMENTED,
                    code: responseCodes.NOT_IMPLEMENTED,
                });
            }

            return Promise.resolve( message );
        } catch (e) {

            if (e instanceof Object) {
                e.status_code = (e.status_code) ? e.status_code : 400;
            } else {
                e = {
                    status_code: 500,
                    message: `${responseMessages.INTERNAL_SERVER_ERROR} -- (${e.toString()})`,
                    code: responseMessages.INTERNAL_SERVER_ERROR
                }
            }
            return Promise.reject(e)
        }
    },
    deleteMessage: async (req) => {
        try {
            const id = req.body.id;

            const validMessage = await model.messages.getById(id);

            if (!validMessage) {
                return Promise.reject({
                    status_code: 404,
                    message: responseMessages.NOT_FOUND,
                    code: responseCodes.NOT_FOUND,
                });
            }

            const response = await model.messages.deleteMessage(id);

            if (!response) {
                return Promise.reject({
                    status_code: 400,
                    message: "deletion failed",
                    code: "E0009",
                });
            }

            return Promise.resolve({ message: responseMessages.DELETION_SUCCESS })
        } catch (e) {
            if (e instanceof Object) {
                e.status_code = (e.status_code) ? e.status_code : 400;
            } else {
                e = {
                    status_code: 500,
                    message: `${responseMessages.INTERNAL_SERVER_ERROR} -- (${e.toString()})`,
                    code: responseMessages.INTERNAL_SERVER_ERROR
                }
            }
            return Promise.reject(e)
        }
    }
};