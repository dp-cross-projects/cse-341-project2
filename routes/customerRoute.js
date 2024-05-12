const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const customerValidation = require('../utilities/customer-validation');
const utilities = require('../utilities/index');

router.get('/', utilities.handleErrors(customerController.getAllCustomers));

router.get('/:id', utilities.handleErrors(customerController.getSingleCustomer));

router.post(
  '/',
  customerValidation.customerCreationRules(),
  customerValidation.checkCustomerRules,
  utilities.handleErrors(customerController.createCustomer)
);

router.put(
  '/:id',
  customerValidation.customerUpdateRules(),
  customerValidation.checkCustomerRules,
  utilities.handleErrors(customerController.updateCustomer)
);

router.delete('/:id', utilities.handleErrors(customerController.deleteCustomer));

module.exports = router;
