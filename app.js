const express = require("express");
const bodyparser = require("body-parser");
const Sequelize = require("sequelize");
const env = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");

env.config();

/**
 *
 * description de notre API pour sawagger
 */
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Groupomanai API",
      version: "1.0.0",
      description: "Documentation de notre api groupomania",
      contact: {
        name: "Jean Louis DOS SANTOS",
        url: "un jour viendra",
        email: "test@test.com   ",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./api-method-docs.js", "./router/userrouter.js", "./router/postrouter.js"],
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

async function initdatabaseconnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initdatabaseconnection();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyparser.json());

/**
 * route pour la doc
 */

const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

const userrouter = require("./router/userrouter");
const postrouter = require("./router/postrouter.js");

app.use("/user", userrouter);
app.use("/post", postrouter);

module.exports = app;
