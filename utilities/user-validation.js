const { body, validationResult } = require('express-validator');
const validate = {};

validate.userCreationRules = () => {
  return [
    body('githubId', 'githubId is required').notEmpty(),

    body('username', 'username is required').notEmpty(),

    body('displayName', 'displayName is required').notEmpty()
  ];
};

validate.userUpdateRules = () => {
  return [
    body('githubId', 'githubId is required').notEmpty(),

    body('username', 'username is required').notEmpty(),

    body('displayName', 'displayName is required').notEmpty()
  ];
};

validate.checkUserRules = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorList = [];
  errors.array().map((err) => errorList.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: errorList
  });
};

module.exports = validate;
