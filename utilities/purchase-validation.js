const { body, validationResult } = require('express-validator');
const validate = {};

validate.purchaseCreationRules = () => {
  return [
    body('userId', 'userId is required').notEmpty(),

    body('itemId', 'lastName is required').notEmpty(),

    body('itemQty', 'itemQty is required').notEmpty(),
    body('itemQty', 'itemQty should be a number').isNumeric().isInt(),

    body('itemPrice', 'itemPrice is required').notEmpty(),
    body('itemPrice', 'itemPrice should be a number').isNumeric().isFloat(),

    body('itemTax', 'itemTax is required').notEmpty(),
    body('itemTax', 'itemTax should be a number').isNumeric().isFloat()
  ];
};

validate.purchaseUpdateRules = () => {
  return [
    body('userId', 'userId is required').notEmpty(),

    body('itemId', 'lastName is required').notEmpty(),

    body('itemQty', 'itemQty is required').notEmpty(),
    body('itemQty', 'itemQty should be a number').isNumeric().isInt(),

    body('itemPrice', 'itemPrice is required').notEmpty(),
    body('itemPrice', 'itemPrice should be a number').isNumeric().isFloat(),

    body('itemTax', 'itemTax is required').notEmpty(),
    body('itemTax', 'itemTax should be a number').isNumeric().isFloat()
  ];
};

validate.checkPurchaseRules = (req, res, next) => {
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
