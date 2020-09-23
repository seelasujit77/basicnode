var express = require('express');
var router = express.Router();
const controller = require('../controller/index');

/* GET states. */
router.get('/telematics/service/dashboard/states', controller.getStates);

router.get('/telematics/service/dashboard/countries', controller.getCountries);

router.get('/telematics/service/dashboard/user/masterData', controller.getmasterData);

router.post('/telematics/service/dashboard/user/account-setup', controller.accountSetUp);

module.exports = router;
