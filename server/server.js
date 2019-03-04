const config = require('./config/config');
const responseHandler = require('./lib/response');
const responseCodes = require('./constants/responseCodes');
const responseMessages = require('./constants/responseMessages');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

app.use(helmet({
    frameguard: {
        action: 'sameorigin',
    },
    xssFilter: {
        setOnOldIE: true,
    },
    noSniff: true,
}));

app.use(compression());

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/konpurto', routes);

app.use('/', function(req, res) {
    return responseHandler.sendError(req, res, {
        status_code: 200,
        message: responseMessages.NOT_IMPLEMENTED,
        code: responseCodes.NOT_IMPLEMENTED
    })
});

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`)
});