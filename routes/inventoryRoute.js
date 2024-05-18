const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const inventoryValidation = require('../utilities/inventory-validation');
const utilities = require('../utilities/index');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', utilities.handleErrors(inventoryController.getAllItems));

router.get('/:id', utilities.handleErrors(inventoryController.getSingleItem));

router.post(
  '/',
  isAuthenticated,
  inventoryValidation.inventoryCreationRules(),
  inventoryValidation.checkInventoryRules,
  utilities.handleErrors(inventoryController.createItem)
);

router.put(
  '/:id',
  isAuthenticated,
  inventoryValidation.inventoryUpdateRules(),
  inventoryValidation.checkInventoryRules,
  utilities.handleErrors(inventoryController.updateItem)
);

router.delete('/:id', isAuthenticated, utilities.handleErrors(inventoryController.deleteItem));

module.exports = router;
