const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const customerValidation = require('../utilities/customer-validation');
const utilities = require('../utilities/index');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', isAuthenticated, utilities.handleErrors(customerController.getAllCustomers));

router.get('/:id', isAuthenticated, utilities.handleErrors(customerController.getSingleCustomer));

router.post(
  '/',
  isAuthenticated, 
  customerValidation.customerCreationRules(),
  customerValidation.checkCustomerRules,
  utilities.handleErrors(customerController.createCustomer)
);

router.put(
  '/:id',
  isAuthenticated, 
  customerValidation.customerUpdateRules(),
  customerValidation.checkCustomerRules,
  utilities.handleErrors(customerController.updateCustomer)
);

router.delete('/:id',isAuthenticated,  utilities.handleErrors(customerController.deleteCustomer));

module.exports = router;
