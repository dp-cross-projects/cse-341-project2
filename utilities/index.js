const Util = {};

/* ****************************************
* Get total price
**************************************** */
Util.getTotalPrice = (price, tax) => {
    let totalPrice = price * (tax + 1);
    totalPrice = new Intl.NumberFormat('en-US', {
        maximumFractionDigits:2
    }).format(totalPrice);
    return parseFloat(totalPrice);
};


/* ****************************************
* Middleware For Handling Errors
**************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


module.exports = Util;