const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const purchaseValidation = require('../utilities/purchase-validation');
const utilities = require('../utilities/index');

router.get('/', utilities.handleErrors(purchaseController.getAllPurchases));

router.get('/:id', utilities.handleErrors(purchaseController.getSinglePurchase));

router.post(
  '/',
  purchaseValidation.purchaseCreationRules(),
  purchaseValidation.checkPurchaseRules,
  utilities.handleErrors(purchaseController.createPurchase)
);

router.put(
  '/:id',
  purchaseValidation.purchaseUpdateRules(),
  purchaseValidation.checkPurchaseRules,
  utilities.handleErrors(purchaseController.updatePurchase)
);

router.delete('/:id', utilities.handleErrors(purchaseController.deletePurchase));

module.exports = router;
