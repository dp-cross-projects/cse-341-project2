const mainModel = require('../models/index');
const documentFormat = require('../utilities/document-format');
const collection = 'customer';

const getAllCustomers = async (req, res) => {
  //#swagger.tags=["Customer"]
  const data = await mainModel.getAllFromCollection(collection);
  data.toArray().then((document) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(document);
  });
};

const getSingleCustomer = async (req, res) => {
  //#swagger.tags=["Customer"]
  const id = req.params.id;
  const data = await mainModel.getSingleFromCollection(collection, id);
  data.toArray().then((document) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(document[0]);
  });
};

const createCustomer = async (req, res) => {
  //#swagger.tags=["Customer"]
  const document = documentFormat.customerFormat(req.body);
  const response = await mainModel.createDocumentInCollection(collection, document);
  if (response.acknowledged) {
    res.status(200).json({ [collection + '_id']: response.insertedId });
  } else {
    res
      .status(500)
      .json(response.error || `Some error ocurred while creating data for ${collection}.`);
  }
};

const updateCustomer = async (req, res) => {
  //#swagger.tags=["Customer"]
  const id = req.params.id;
  const document = documentFormat.customerFormat(req.body);
  const response = await mainModel.updateDocumentInCollection(collection, id, document);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || `Some error ocurred while updating data from ${collection}.`);
  }
};

const deleteCustomer = async (req, res) => {
  //#swagger.tags=["Customer"]
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
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
