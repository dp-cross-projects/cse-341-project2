const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(userController.getAllUsers));

router.get('/:id', utilities.handleErrors(userController.getSingleUser));

router.post('/', utilities.handleErrors(userController.createUser));

router.put('/:id', utilities.handleErrors(userController.updateUser));

router.delete('/:id', utilities.handleErrors(userController.deleteUser));

module.exports = router;