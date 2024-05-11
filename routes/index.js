const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/inventory', require('./inventoryRoute'));
router.use('/customer', require('./customerRoute'));
router.use('/transaction', require('./transactionRoute'));
router.use('/purchase', require('./purchaseRoute'));
router.use('/user', require('./userRoute'));

module.exports = router;
