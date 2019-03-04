const router = require('express').Router();
const validate = require('express-validation');
const validator = require('../lib/validator');

const messageController = require('../controllers/message');

router.post('/message', [validate(validator.addMessage)], messageController.addMessage);
router.delete('/message', [validate(validator.deleteMessage)], messageController.deleteMessage);

module.exports = router;