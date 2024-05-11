const documentFormat = {};

/*  **********************************
*  Customer format
* ********************************* */
documentFormat.customerFormat = (body) => {
    return {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone
    }
};

/*  **********************************
*  Inventory format
* ********************************* */
documentFormat.inventoryFormat = (body) => {
    return {
        itemName: body.itemName,
        itemMake: body.itemMake,
        itemModel: body.itemModel,
        itemQty: body.itemQty,
        itemPrice: body.itemPrice,
        itemTax: body.itemTax,
        itemTotalPrice: body.itemTotalPrice // from inventoryController
    }
};

/*  **********************************
*  User format
* ********************************* */
documentFormat.userFormat = (body) => {
    return {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        position: body.position,
        userName: body.userName,
        password: body.password
    }
};

/*  **********************************
*  Transaction format
* ********************************* */
documentFormat.transactionFormat = (body) => {
    return {
        sellerId: body.sellerId,
        customerId: body.customerId,
        itemId: body.itemId,
        itemQty: body.itemQty,
        itemPrice: body.itemPrice, //from inventoryController
        itemTax: body.itemTax, //from inventoryController
        itemTotalPrice: body.itemTotalPrice, //from inventoryController
        date: body.date //from inventoryController
    }
};

/*  **********************************
*  Purchase format
* ********************************* */
documentFormat.purchaseFormat = (body) => {
    return {
        userId: body.userId,
        itemId: body.itemId,
        itemQty: body.itemQty,
        itemPrice: body.itemPrice, //from inventoryController
        itemTax: body.itemTax, //from inventoryController
        itemTotalPrice: body.itemTotalPrice, //from inventoryController
        date: body.date //from inventoryController
    }
};

module.exports = documentFormat;