const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Inventory Management Api",
        description: "An API to manage the buy and sell process from inventory"
    },
    host: "localhost:8080",
    schemes: ["https", "http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);