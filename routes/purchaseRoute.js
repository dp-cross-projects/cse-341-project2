const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const purchaseValidation = require('../utilities/purchase-validation');
const utilities = require('../utilities/index');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', utilities.handleErrors(purchaseController.getAllPurchases));

router.get('/:id', utilities.handleErrors(purchaseController.getSinglePurchase));

router.post(
  '/',
  isAuthenticated,
  purchaseValidation.purchaseCreationRules(),
  purchaseValidation.checkPurchaseRules,
  utilities.handleErrors(purchaseController.createPurchase)
);

router.put(
  '/:id',
  isAuthenticated,
  purchaseValidation.purchaseUpdateRules(),
  purchaseValidation.checkPurchaseRules,
  utilities.handleErrors(purchaseController.updatePurchase)
);

router.delete('/:id', isAuthenticated, utilities.handleErrors(purchaseController.deletePurchase));

module.exports = router;
