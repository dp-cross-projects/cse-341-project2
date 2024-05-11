const mainModel = require("../models/index");
const inventoryController = require("./inventoryController")
const documentFormat = require("../utilities/document-format");
const collection = "transaction";

const getAllTransactions = async (req, res) => {
    //#swagger.tags=["Transaction"]
    const data = await mainModel.getAllFromCollection(collection);
    data.toArray().then((document) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(document);
    });
};

const getSingleTransaction = async (req, res) => {
    //#swagger.tags=["Transaction"]
    const id = req.params.id;
    const data = await mainModel.getSingleFromCollection(collection, id);
    data.toArray().then((document) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(document[0]);
    });
};

const createTransaction = async (req, res) => {
    //#swagger.tags=["Transaction"]
    const body = req.body;
    
    // inventoryController handles stock
    const updateStock = await inventoryController.updateStock(body.itemId, body.itemQty, false);

    // stock management error handling
    if (!updateStock.isStock) {
      res.status(500).json("The entered amount is greater than the available.");
      return
    } else if (updateStock.noModify) {
      res.status(500).json("The item could not be updated.");
    };

    // get Price
    body.itemPrice = updateStock.itemPrice;
    
    // get Tax
    body.itemTax = updateStock.itemTax;

    // get Total Price
    body.itemTotalPrice = updateStock.itemTotalPrice;

    // get Date
    body.date = new Date();

    const document = documentFormat.transactionFormat(body);
    const response = await mainModel.createDocumentInCollection(collection, document);
    if (response.acknowledged) {
        res.status(200).json({[collection + "_id"]:response.insertedId});
      } else {
        res.status(500).json(response.error || `Some error ocurred while creating data for ${collection}.`);
      };
};

const updateTransaction = async (req, res) => {
    //#swagger.tags=["Transaction"]
    const id = req.params.id;
    const document = documentFormat.transactionFormat(req.body);
    const response = await mainModel.updateDocumentInCollection(collection, id, document);
    if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || `Some error ocurred while updating data from ${collection}.`);
      };
};

const deleteTransaction = async (req, res) => {
    //#swagger.tags=["Transaction"]
    const id = req.params.id;
    const response = await mainModel.deleteDocumentInCollection(collection, id);
    if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || `Some error ocurred while deleting data from ${collection}.`);
      };
};

module.exports = {
    getAllTransactions,
    getSingleTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction
};