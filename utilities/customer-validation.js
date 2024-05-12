//const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

validate.customerCreationRules = () => {
    return [
        body("firstName", "firstName is required")
            .notEmpty(),
            
        body("lastName", "lastName is required")
            .notEmpty(),

        body("email", "Email format error")
            .isEmail()
            .normalizeEmail(),

        body("phone", "Phone number is required")
            .notEmpty(),
        body("phone", "Phone number should be integer")
            .isNumeric()
            .isInt()    
    ];
};

validate.customerUpdateRules = () => {
    return [
        body("firstName", "firstName is required")
            .notEmpty(),
            
        body("lastName", "lastName is required")
            .notEmpty(),

        body("email", "Email format error")
            .isEmail()
            .normalizeEmail(),

        body("phone", "Phone number is required")
            .notEmpty(),
        body("phone", "Phone number should be integer")
            .isNumeric()
            .isInt()    
    ];
};

validate.checkCustomerRules = (req, res, next) => {
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
