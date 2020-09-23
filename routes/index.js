var express = require('express');
var router = express.Router();
const controller = require('../controller/index');

/* GET home listing. */
router.get('/', controller.baseTest);

module.exports = router;
