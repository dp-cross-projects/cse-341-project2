const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const transactionValidation = require('../utilities/transaction-validation');
const utilities = require('../utilities/index');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', isAuthenticated, utilities.handleErrors(transactionController.getAllTransactions));

router.get('/:id', isAuthenticated, utilities.handleErrors(transactionController.getSingleTransaction));

router.post(
  '/',
  isAuthenticated,
  transactionValidation.transactionCreationRules(),
  transactionValidation.checkTransactionRules,
  utilities.handleErrors(transactionController.createTransaction)
);

router.put(
  '/:id',
  isAuthenticated,
  transactionValidation.transactionUpdateRules(),
  transactionValidation.checkTransactionRules,
  utilities.handleErrors(transactionController.updateTransaction)
);

router.delete('/:id', isAuthenticated, utilities.handleErrors(transactionController.deleteTransaction));

module.exports = router;
