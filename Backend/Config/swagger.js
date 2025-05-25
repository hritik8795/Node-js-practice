const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger Configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js + PostgreSQL API",
      version: "1.0.0",
      description: "API documentation for Node.js + PostgreSQL project",
    },
    servers: [
      {
        url: "http://localhost:5000", 
      },
    ],
  },

apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
console.log("Swagger Docs Loaded:", swaggerSpec.paths); 

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;