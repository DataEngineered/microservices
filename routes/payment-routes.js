const express = require('express');
const router = express.Router();

const inquiryMiddlewares = require('../middlewares/inquiry-middlewares');
const notificationMiddlewares = require('../middlewares/notification-middlewares');

router.get('/inquiry-test/:va_number/:signature', inquiryMiddlewares.getAmountSignatureByAmount);

// Aktif & Isolir
router.post('/notifications', [
    notificationMiddlewares.inputNotifs,
    notificationMiddlewares.updateStatusCustomer,
    notificationMiddlewares.updateStatusRadius,
    notificationMiddlewares.insertAccounting
]);

// Pra WO
router.post('/notifications', notificationMiddlewares.insertAccounting);

router.post('/test', notificationMiddlewares.insertAccountingTest);

router.post('/input-test', [
    notificationMiddlewares.inputNotifsTest,
    notificationMiddlewares.updateStatusCustomerTest,
    notificationMiddlewares.updateStatusRadiusTest,
    notificationMiddlewares.insertAccountingTest
]);

router.post('/input-test', notificationMiddlewares.insertAccountingTest);


module.exports = router;