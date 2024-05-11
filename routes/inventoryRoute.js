const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(inventoryController.getAllItems));

router.get('/:id', utilities.handleErrors(inventoryController.getSingleItem));

router.post('/', utilities.handleErrors(inventoryController.createItem));

router.put('/:id', utilities.handleErrors(inventoryController.updateItem));

router.delete('/:id', utilities.handleErrors(inventoryController.deleteItem));

module.exports = router;