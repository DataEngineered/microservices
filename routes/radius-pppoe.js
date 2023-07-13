const express = require('express');
const router = express.Router();

const radiusPPPOE = require('../middlewares/radius-pppoe-middleware');

router.post('/add-pppoe', radiusPPPOE.createNewPPPoEAccount);
router.patch('/isolir-cust', radiusPPPOE.customerPPPOEIsolir);

module.exports = router;