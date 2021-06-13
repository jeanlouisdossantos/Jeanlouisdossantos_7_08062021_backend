const express = require("express");
const bodyparser = require("body-parser");
const Sequelize = require("sequelize");
const env = require("dotenv");
env.config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

async function initdatabaseconnection (){
    console.log(process.env)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
}

initdatabaseconnection()

const app = express();

app.use(bodyparser.json());

app.get('/', (req,res) =>{
    res.send('hello world')
})



module.exports = app;