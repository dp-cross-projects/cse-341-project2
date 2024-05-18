const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidation = require('../utilities/user-validation');
const utilities = require('../utilities/index');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/',  utilities.handleErrors(userController.getAllUsers));

router.get('/:id', isAuthenticated, utilities.handleErrors(userController.getSingleUser));

// router.post(
//   '/',
//   isAuthenticated,
//   userValidation.userCreationRules(),
//   userValidation.checkUserRules,
//   utilities.handleErrors(userController.createUser)
// );

router.put(
  '/:id',
  isAuthenticated,
  userValidation.userUpdateRules(),
  userValidation.checkUserRules,
  utilities.handleErrors(userController.updateUser)
);

router.delete('/:id', isAuthenticated, utilities.handleErrors(userController.deleteUser));

module.exports = router;
