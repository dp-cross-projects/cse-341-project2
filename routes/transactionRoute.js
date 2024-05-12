const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const transactionValidation = require("../utilities/transaction-validation");
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(transactionController.getAllTransactions));

router.get('/:id', utilities.handleErrors(transactionController.getSingleTransaction));

router.post('/', 
transactionValidation.transactionCreationRules(),
transactionValidation.checkTransactionRules,
utilities.handleErrors(transactionController.createTransaction));

router.put('/:id', 
transactionValidation.transactionUpdateRules(),
transactionValidation.checkTransactionRules,
utilities.handleErrors(transactionController.updateTransaction));

router.delete('/:id', utilities.handleErrors(transactionController.deleteTransaction));

module.exports = router;