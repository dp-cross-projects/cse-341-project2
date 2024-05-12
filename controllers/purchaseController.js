const mainModel = require('../models/index');
const inventoryController = require('../controllers/inventoryController');
const utilities = require('../utilities/index');
const documentFormat = require('../utilities/document-format');
const collection = 'purchase';

const getAllPurchases = async (req, res) => {
  //#swagger.tags=["Purchase"]
  const data = await mainModel.getAllFromCollection(collection);
  data.toArray().then((document) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(document);
  });
};

const getSinglePurchase = async (req, res) => {
  //#swagger.tags=["Purchase"]
  const id = req.params.id;
  const data = await mainModel.getSingleFromCollection(collection, id);
  data.toArray().then((document) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(document[0]);
  });
};

const createPurchase = async (req, res) => {
  //#swagger.tags=["Purchase"]
  const document = documentFormat.purchaseFormat(req.body);
  document.date = new Date();
  document.itemTotalPrice = utilities.getTotalPrice(document.itemPrice, document.itemTax);
  const updateStock = await inventoryController.updateStock(
    document.itemId,
    document.itemQty,
    true
  );
  if (updateStock.noModify) {
    return;
  }

  const response = await mainModel.createDocumentInCollection(collection, document);
  if (response.acknowledged) {
    res.status(200).json({ [collection + '_id']: response.insertedId });
  } else {
    res
      .status(500)
      .json(response.error || `Some error ocurred while creating data for ${collection}.`);
  }
};

const updatePurchase = async (req, res) => {
  //#swagger.tags=["Purchase"]
  const id = req.params.id;
  const document = documentFormat.purchaseFormat(req.body);
  const response = await mainModel.updateDocumentInCollection(collection, id, document);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || `Some error ocurred while updating data from ${collection}.`);
  }
};

const deletePurchase = async (req, res) => {
  //#swagger.tags=["Purchase"]
  const id = req.params.id;
  const response = await mainModel.deleteDocumentInCollection(collection, id);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || `Some error ocurred while deleting data from ${collection}.`);
  }
};

module.exports = {
  getAllPurchases,
  getSinglePurchase,
  createPurchase,
  updatePurchase,
  deletePurchase
};
