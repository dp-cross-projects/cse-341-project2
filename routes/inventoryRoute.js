const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const inventoryValidation = require('../utilities/inventory-validation');
const utilities = require('../utilities/index');

router.get('/', utilities.handleErrors(inventoryController.getAllItems));

router.get('/:id', utilities.handleErrors(inventoryController.getSingleItem));

router.post(
  '/',
  inventoryValidation.inventoryCreationRules(),
  inventoryValidation.checkInventoryRules,
  utilities.handleErrors(inventoryController.createItem)
);

router.put(
  '/:id',
  inventoryValidation.inventoryUpdateRules(),
  inventoryValidation.checkInventoryRules,
  utilities.handleErrors(inventoryController.updateItem)
);

router.delete('/:id', utilities.handleErrors(inventoryController.deleteItem));

module.exports = router;
