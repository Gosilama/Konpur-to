const responseHandler = require('../lib/response');
const messageHandler = require('../handlers/message');

module.exports = {
    addMessage: async (req, res) => {
        try {
            const response = await messageHandler.addMessage(req);
            return responseHandler.sendSuccess(req, res, response, 200);
        } catch (e) {
            return responseHandler.sendError(req, res, e);
        }
    },
    deleteMessage: async (req, res) => {
        try {
            const response = await messageHandler.deleteMessage(req);
            return responseHandler.sendSuccess(req, res, response, 200);
        } catch (e) {
            return responseHandler.sendError(req, res, e);
        }
    }
};