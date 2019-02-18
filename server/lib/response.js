const status = require('../constants/status');

module.exports = {
    sendSuccess : (req, res, data, status_code, message) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        return res.status(status_code).json({
            status: status.SUCCESS,
            data: data,
            message: message
        });
    },
    sendError : (req, res, error) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        error.status_code = error.status_code ? error.status_code : 500;
        if (req.method === "OPTIONS") {
            return res.status(error.status_code).end();
        }

        return res.status(error.status_code).json({
            status: status.ERROR,
            message: error.message,
            code: error.code,
            error: error
        });
    }
};