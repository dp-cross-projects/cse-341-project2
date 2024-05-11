const express = require('express');
const router = express.Router();

const purchaseController = require('../controllers/purchase');

router.get('/', purchaseController.getAllPurchases);

router.get('/:id', purchaseController.getSinglePurchase);

router.post('/', purchaseController.createPurchase);

router.put('/:id', purchaseController.updatePurchase);

router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;