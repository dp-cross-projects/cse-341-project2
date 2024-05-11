const mainModel = require("../models/index");
const documentFormat = require("../utilities/document-format")
const utilities = require("../utilities/index")
const collection = "inventory"

const getAllItems = async (req, res) => {
    //#swagger.tags=["Inventory"]
    const data = await mainModel.getAllFromCollection(collection);
    data.toArray().then((document) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(document);
    });
}

const getSingleItem = async (req, res) => {
    //#swagger.tags=["Inventory"]
    const id = req.params.id;
    const data = await mainModel.getSingleFromCollection(collection, id);
    data.toArray().then((document) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(document[0]);
    })
}

const createItem = async (req, res) => {
    //#swagger.tags=["Inventory"]
    const body = req.body
    body.itemTotalPrice = utilities.getTotalPrice(body.itemPrice, body.itemTax);

    const document = documentFormat.inventoryFormat(body);
    const response = await mainModel.createDocumentInCollection(collection, document);
    if (response.acknowledged) {
        res.status(200).json({[collection + "_id"]:response.insertedId});
      } else {
        res.status(500).json(response.error || `Some error ocurred while creating data for ${collection}.`);
      };
}

const updateItem = async (req, res) => {
    //#swagger.tags=["Inventory"]
    const id = req.params.id;
    const body = req.body
    body.itemTotalPrice = utilities.getTotalPrice(body.itemPrice, body.itemTax);

    const document = documentFormat.inventoryFormat(body);
    const response = await mainModel.updateDocumentInCollection(collection, id, document);
    if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || `Some error ocurred while updating data from ${collection}.`);
      };
}

const deleteItem = async (req, res) => {
    //#swagger.tags=["Inventory"]
    const id = req.params.id;
    const response = await mainModel.deleteDocumentInCollection(collection, id);
    if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || `Some error ocurred while deleting data from ${collection}.`);
      };
}

const updateStock = async (itemId, itemQty, increase=true) => {
  const updateStock = {};
  let stock;
  updateStock.isStock = true;

  // Get item data
  const data = await mainModel.getSingleFromCollection(collection, itemId);
  let arrayData = await data.toArray();
  let itemData = arrayData[0];

  // get Price from item
  updateStock.itemPrice = itemData.itemPrice;
    
  // get Tax from item
  updateStock.itemTax = itemData.itemTax;

  // get Total Price from item
  updateStock.itemTotalPrice = itemData.itemTotalPrice;

  // True for buy / False for sell
  if (increase){
    stock = itemData.itemQty + itemQty;
  } else {
    stock = itemData.itemQty - itemQty;
  }
  
  // Validates if is stock
  if (stock < 0) {
    updateStock.isStock = false;
    return updateStock;
  } else {
    updateStock.isStock = true;
  };

  itemData.itemQty = stock;
  
  // Updates item stock
  const updateResponse = await mainModel.updateDocumentInCollection(collection, itemId, itemData)
  updateStock.noModify = false;
  
  // Validate response from update
  if (!(updateResponse.modifiedCount > 0)) {
    updateStock.noModify = true;
  };
  
  return updateStock;
}

module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem,
    updateStock
}