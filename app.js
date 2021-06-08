const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());

app.get('/', (req,res) =>{
    res.send('hello world')
})



module.exports = app;