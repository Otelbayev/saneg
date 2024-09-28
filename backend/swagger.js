const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify OpenAPI version
    info: {
      title: "SANEG backend apis",
      version: "1.0.0",
      description: "api",
    },
    servers: [
      {
        url: "http://localhost:4000", // Replace with your server's URL
      },
    ],
  },
  // Make sure this path is correct and points to files with your Swagger annotations
  apis: ["./routes/*.js"], // Path to the route files with Swagger annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
