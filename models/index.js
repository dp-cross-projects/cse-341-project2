const mongodb = require("../config/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllFromCollection = async (collection) => {
    const result = await mongodb.getDatabase().db().collection(collection).find();
    return result;
};

const getSingleFromCollection = async (collection, id) => {
    const dataId = new ObjectId (id);
    const result = await mongodb.getDatabase().db().collection(collection).find({_id: dataId});
    return result;
};

const createDocumentInCollection = async (collection, data) => {
    const response = await mongodb.getDatabase().db().collection(collection).insertOne(data);
    return response;
};

const updateDocumentInCollection = async (collection, id, data) => {
    const dataId = new ObjectId (id);
    const response = await mongodb.getDatabase().db().collection(collection).replaceOne({_id: dataId}, data);
    return response;
};

const deleteDocumentInCollection = async (collection, id) => {
    const dataId = new ObjectId (id);
    const response = await mongodb.getDatabase().db().collection(collection).deleteOne({_id: dataId});
    return response;
}


module.exports = {
    getAllFromCollection,
    getSingleFromCollection,
    createDocumentInCollection,
    updateDocumentInCollection,
    deleteDocumentInCollection
}