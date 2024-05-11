const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(customerController.getAllCustomers));

router.get('/:id', utilities.handleErrors(customerController.getSingleCustomer));

router.post('/', utilities.handleErrors(customerController.createCustomer));

router.put('/:id', utilities.handleErrors(customerController.updateCustomer));

router.delete('/:id', utilities.handleErrors(customerController.deleteCustomer));

module.exports = router;