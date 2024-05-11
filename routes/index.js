const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/inventory', require('./inventory'));
router.use('/customer', require('./customer'));
router.use('/transaction', require('./transaction'));
router.use('/purchase', require('./purchase'));
router.use('/user', require('./user'));

module.exports = router;
