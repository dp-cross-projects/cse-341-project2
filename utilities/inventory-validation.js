const { body, validationResult } = require("express-validator")
const validate = {}

validate.inventoryCreationRules = () => {
    return [
        body("itemName", "itemName is required")
            .notEmpty(),
            
        body("itemMake", "itemMake is required")
            .notEmpty(),

        body("itemModel", "itemModel is required")
            .notEmpty(),

        body("itemQty", "itemQty is required")
            .notEmpty(),
        body("itemQty", "itemQty should be a number")
            .isNumeric()
            .isInt(),

        body("itemPrice", "itemPrice is required")
            .notEmpty(),
        body("itemPrice", "itemPrice should be a number")
            .isNumeric()
            .isFloat(),

        body("itemTax", "itemTax is required")
            .notEmpty(),
        body("itemTax", "itemTax should be a number")
            .isNumeric()
            .isFloat(),
    ];
};

validate.inventoryUpdateRules = () => {
    return [
        body("itemName", "itemName is required")
            .notEmpty(),
            
        body("itemMake", "itemMake is required")
            .notEmpty(),

        body("itemModel", "itemModel is required")
            .notEmpty(),

        body("itemQty", "itemQty is required")
            .notEmpty(),
        body("itemQty", "itemQty should be a number")
            .isNumeric()
            .isInt(),

        body("itemPrice", "itemPrice is required")
            .notEmpty(),
        body("itemPrice", "itemPrice should be a number")
            .isNumeric()
            .isFloat(),

        body("itemTax", "itemTax is required")
            .notEmpty(),
        body("itemTax", "itemTax should be a number")
            .isNumeric()
            .isFloat(),
    ];
};

validate.checkInventoryRules = (req, res, next) => {
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
