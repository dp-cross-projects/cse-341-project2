const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require("../utilities/user-validation");
const utilities = require("../utilities/index");

router.get('/', utilities.handleErrors(userController.getAllUsers));

router.get('/:id', utilities.handleErrors(userController.getSingleUser));

router.post('/', 
userValidation.userCreationRules(),
userValidation.checkUserRules,
utilities.handleErrors(userController.createUser));

router.put('/:id', 
userValidation.userUpdateRules(),
userValidation.checkUserRules,
utilities.handleErrors(userController.updateUser));

router.delete('/:id', utilities.handleErrors(userController.deleteUser));

module.exports = router;