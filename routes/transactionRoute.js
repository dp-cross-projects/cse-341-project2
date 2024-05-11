const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(transactionController.getAllTransactions));

router.get('/:id', utilities.handleErrors(transactionController.getSingleTransaction));

router.post('/', utilities.handleErrors(transactionController.createTransaction));

router.put('/:id', utilities.handleErrors(transactionController.updateTransaction));

router.delete('/:id', utilities.handleErrors(transactionController.deleteTransaction));

module.exports = router;