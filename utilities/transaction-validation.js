const { body, validationResult } = require("express-validator")
const validate = {}

validate.transactionCreationRules = () => {
    return [
        body("sellerId", "userId is required")
            .notEmpty(),

        body("customerId", "userId is required")
            .notEmpty(),
            
        body("itemId", "lastName is required")
            .notEmpty(),

        body("itemQty", "itemQty is required")
            .notEmpty(),
        body("itemQty", "itemQty should be a number")
            .isNumeric()
            .isInt(),
    ];
};

validate.transactionUpdateRules = () => {
    return [
        body("sellerId", "userId is required")
            .notEmpty(),

        body("customerId", "userId is required")
            .notEmpty(),
            
        body("itemId", "lastName is required")
            .notEmpty(),

        body("itemQty", "itemQty is required")
            .notEmpty(),
        body("itemQty", "itemQty should be a number")
            .isNumeric()
            .isInt(),
    ];
};

validate.checkTransactionRules = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    };
    const errorList = [];
    errors.array().map((err) => errorList.push({ [err.param]: err.msg }));
    return res.status(422).json({
    errors: errorList,
  });
};


module.exports = validate;
