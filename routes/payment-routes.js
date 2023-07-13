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

module.exports = router;