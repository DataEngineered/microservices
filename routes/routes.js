const express = require('express');
const router = express.Router();

const inquiryMiddlewares = require('../middlewares/inquiry-middlewares');
const notificationMiddlewares = require('../middlewares/notification-middlewares');
const radiusPPPOE = require('../middlewares/radius-pppoe-middleware');

router.get('/inquiry/:va_number/:signature', inquiryMiddlewares.getAmountSignatureByAmount);

// Aktif & Isolir
router.post('/notification', [
    notificationMiddlewares.inputNotifs,
    notificationMiddlewares.updateStatusCustomer,
    notificationMiddlewares.updateStatusRadius,
    notificationMiddlewares.insertAccounting
]);

// Pra WO
router.post('/notification', notificationMiddlewares.insertAccounting);

router.post('/add-pppoe', radiusPPPOE.createNewPPPoEAccount);

router.post('/test', notificationMiddlewares.insertAccountingTest);

router.post('/input-test', [
    notificationMiddlewares.inputNotifsTest,
    notificationMiddlewares.updateStatusCustomerTest,
    notificationMiddlewares.updateStatusRadiusTest,
    notificationMiddlewares.insertAccountingTest
]);

router.post('/input-test', notificationMiddlewares.insertAccountingTest);


module.exports = router;